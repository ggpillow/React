import styles from "./Hero.module.css"
import { Container } from "../layout/Container"
import { Button } from "../ui/Button"

export function Hero({ title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className={styles.hero} aria-label="Hero section">
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.actions}>
            <Button href={primaryCta.href} variant="primary" ariaLabel={primaryCta.label}>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost" ariaLabel={secondaryCta.label}>
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
