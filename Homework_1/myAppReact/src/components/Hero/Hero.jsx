import { useState } from "react";
import styles from "./Hero.module.css";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function Hero({ title, subtitle, primaryCta, screens = [] }) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const openGooglePlay = () => {
    window.open("https://play.google.com/", "_blank", "noopener,noreferrer");
  };

  const hasScreens = screens.length > 0;
  const activeScreen = hasScreens ? screens[activeScreenIndex] : null;

  const prev = () => {
    setActiveScreenIndex((prevIndex) =>
      prevIndex === 0 ? screens.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setActiveScreenIndex((prevIndex) =>
      prevIndex === screens.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className={styles.hero} aria-label="Hero section">
      {hasScreens && (
        <div className={styles.fullBleed} aria-label="App preview slider">
          <div className={styles.preview}>
            <img
              className={styles.previewImg}
              src={activeScreen.src}
              alt={activeScreen.alt}
              loading="lazy"
            />

            <Container>
              <div className={styles.top}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>

                <div className={styles.actions}>
                  <Button
                    variant="primary"
                    ariaLabel={primaryCta.label}
                    onClick={openGooglePlay}
                  >
                    {primaryCta.label}
                  </Button>
                </div>
              </div>
            </Container>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Previous screen"
            >
              ‹
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Next screen"
            >
              ›
            </button>

            <div className={styles.dots}>
              {screens.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${
                    i === activeScreenIndex ? styles.dotActive : ""
                  }`}
                  onClick={() => setActiveScreenIndex(i)}
                  aria-label={`Open screen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
