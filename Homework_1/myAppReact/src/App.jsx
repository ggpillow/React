import { Header } from './components/Header/Header'
import { Hero } from "./components/Hero/Hero"
import { siteData } from "./data/siteData"

export default function App() {
  return (
    <>
      <Header
        brand={siteData.brand}
        logoSrc={siteData.logoSrc}
        logoAlt={siteData.logoAlt}
        links={siteData.links}
        cta={siteData.headerCta}
      />

      <main id="main">
        <Hero {...siteData.hero} />
      </main>
    </>
  )
}
