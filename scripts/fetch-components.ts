import { writeFileSync } from "fs"
import { join } from "path"
import "dotenv/config"

interface MetaJson {
  slug: string
  name: string
  category: string
  description?: string
  tags?: string[]
  version: string
  featured?: boolean
  createdAt: string
  previewUrl?: string
}

interface GitHubTreeItem {
  path: string
  type: string
  url: string
}

interface GitHubContent {
  content: string
  encoding: string
}

interface GitHubTree {
  tree: GitHubTreeItem[]
}

const CONFIG = {
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || "mishlyui",
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || "components",
  OUTPUT_PATH: join(process.cwd(), "src", "config", "components.ts"),
} as const

class GitHubAPIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
  ) {
    super(`GitHub API request failed: ${status} ${statusText}`)
    this.name = "GitHubAPIError"
  }
}

class ComponentFetchError extends Error {
  constructor(
    message: string,
    public cause?: unknown,
  ) {
    super(message)
    this.name = "ComponentFetchError"
  }
}

async function fetchGitHubAPI<T>(endpoint: string): Promise<T> {
  const url = `https://api.github.com/repos/${CONFIG.GITHUB_REPO_OWNER}/${CONFIG.GITHUB_REPO_NAME}${endpoint}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    throw new GitHubAPIError(response.status, response.statusText)
  }

  return response.json()
}

async function fetchFileContent(path: string): Promise<string> {
  try {
    const data = await fetchGitHubAPI<GitHubContent>(`/contents/${path}`)
    return Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf-8")
  } catch (error) {
    throw new ComponentFetchError(`Failed to fetch file: ${path}`, error)
  }
}

async function findMetaJsonFiles(): Promise<string[]> {
  try {
    const tree = await fetchGitHubAPI<GitHubTree>("/git/trees/main?recursive=1")
    return tree.tree
      .filter((item) => item.type === "blob" && item.path.endsWith("/meta.json"))
      .map((item) => item.path)
  } catch (error) {
    throw new ComponentFetchError("Failed to fetch repository tree", error)
  }
}

async function fetchComponents(): Promise<MetaJson[]> {
  const metaFiles = await findMetaJsonFiles()
  const components: MetaJson[] = []
  const errors: Array<{ file: string; error: unknown }> = []

  for (const filePath of metaFiles) {
    try {
      const content = await fetchFileContent(filePath)
      const meta: MetaJson = JSON.parse(content)
      components.push(meta)
    } catch (error) {
      errors.push({ file: filePath, error })
    }
  }

  if (errors.length > 0) {
    console.warn(`Warning: Failed to fetch ${errors.length} component(s)`)
    errors.forEach(({ file, error }) => {
      console.warn(`  - ${file}: ${error instanceof Error ? error.message : String(error)}`)
    })
  }

  return components
}

function generateTypeScriptConfig(components: MetaJson[]): string {
  const componentItems = components.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description,
    tags: c.tags,
    version: c.version,
    featured: c.featured,
    createdAt: c.createdAt,
    preview: c.previewUrl,
  }))

  return `export interface ComponentItem {
  slug: string
  name: string
  category: string
  description?: string
  tags?: string[]
  version: string
  featured?: boolean
  createdAt: string
  preview?: string
}

export const componentListConfig = {
  hrefPattern: "/components/{slug}",
} as const

export const componentsConfig: ComponentItem[] = ${JSON.stringify(componentItems, null, 2)}
`
}

async function main(): Promise<void> {
  try {
    if (!CONFIG.GITHUB_TOKEN) {
      throw new ComponentFetchError("GITHUB_TOKEN environment variable is required")
    }

    console.log("Fetching components from GitHub...")

    const components = await fetchComponents()

    if (components.length === 0) {
      console.warn("Warning: No components found")
      return
    }

    const configContent = generateTypeScriptConfig(components)
    writeFileSync(CONFIG.OUTPUT_PATH, configContent, "utf-8")

    console.log(`Successfully generated components.ts with ${components.length} component(s)`)
  } catch (error) {
    if (error instanceof ComponentFetchError || error instanceof GitHubAPIError) {
      console.error(`Error: ${error.message}`)
      if (error.cause) {
        console.error("Caused by:", error.cause)
      }
    } else {
      console.error("Unexpected error:", error)
    }
    process.exit(1)
  }
}

main()
