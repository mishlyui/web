import { ReactNode } from "react"
import { PageLoader } from "@/components/ui/page-loader"

interface UseLoadingOptions {
  showText?: boolean
  text?: string
}

export const useLoading = (isLoading: boolean, content: ReactNode, options?: UseLoadingOptions) => {
  if (isLoading) {
    return <PageLoader showText={options?.showText} text={options?.text} />
  }
  return content
}
