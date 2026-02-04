import { useState } from "react"
import { Header } from '../components/Header/Header'
import { Hero } from "../components/Hero/Hero"
import { CookieBanner } from "../components/CookieBanner/CookieBanner"
import { Features } from "../components/Features/Features"
import { siteData } from "../data/siteData"
import { Container } from "../components/layout/Container"

const COOKIE_KEY = "cookiesAccepted";

export default function App() {
  const [showCookies, setShowCookies] = useState(() => {
    const accepted = localStorage.getItem(COOKIE_KEY) === "true";
    return !accepted;
  });

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setShowCookies(false);
  };

  const closeCookies = () => {
    setShowCookies(false);
  };

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
        <Container>
          <Features items={siteData.features} />
        </Container>
      </main>

      {showCookies && (
        <CookieBanner onAccept={acceptCookies} onClose={closeCookies} />
      )}
    </>
  )
}
