import { Header, Hero, ComponentList } from "@/components"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ComponentList />
      </main>
    </>
  )
}
