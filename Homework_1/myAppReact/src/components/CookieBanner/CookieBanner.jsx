import { useEffect } from "react"
import styles from "./CookieBanner.module.css"

export function CookieBanner({onAccept, onClose}) {
    useEffect(() => {
      console.log("[CookieBanner] mounted")
      return () => {
        console.log("[CookieBanner] unmounted")
      }
    }, [])

    useEffect(() => {
      console.log("[CookieBanner] updated (render)")
    })


    return (
        <div className={styles.banner} role="dialog" aria-label="Cookie banner">
            <p className={styles.text}>
                We use cookies for analytics to improve the site experience.
            </p>

            <div className={styles.action}>
                <button className={styles.btnPrimary} type="button" onClick={onAccept}>
                    Accept
                </button>
                <button className={styles.btnGhost} type="button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}