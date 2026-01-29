import styles from "./Header.module.css"
import  { Container } from "../layout/Container"
import { Button } from "../ui/Button"

export function Header({brand, logoSrc, logoAlt= "Logo", links, cta}) {
    return (
        <header className={styles.header}>
            <a className={styles.skipLink} href="#main">
                Перейти к содержимому
            </a>
            
            <Container>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <a href="#top" className={styles.brand} aria-label={`${brand}: на верх страницы`}>
                            {logoSrc ? (
                                <img className={styles.logo} src={logoSrc} alt={logoAlt} /> 
                            ) : (
                                <span className={styles.brandText}>{brand}</span>
                            )}
                        </a>
                        <nav className={styles.nav} arial-label="Основная навигация">
                            <ul className={styles.list}>
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <a className={styles.link} href={l.href}>
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <Button href={cta.href} variant="secondary" arialabel={cta.ariaLabel ?? cta.label}>
                        {cta.label}
                    </Button>  
                </div>
            </Container>
        </header>

    )
}