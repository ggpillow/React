import screen1 from "../assets/screens/screen-1.jpg"
import screen2 from "../assets/screens/screen-2.jpg"
import screen3 from "../assets/screens/screen-3.jpg"
import screen4 from "../assets/screens/screen-4.jpg"
import screen5 from "../assets/screens/screen-5.jpg"
import screen6 from "../assets/screens/screen-6.jpg"
import screen7 from "../assets/screens/screen-7.jpg"

export const siteData = {

    //HEADER
    brand: "Adventurer",
    logoSrc: "/logo.svg",
    logoAlt: "Колымский приключенец",
    links: [
        { href: "#location", label: "Location" },
        { href: "#journey", label: "Journey" },
        { href: "#schedule", label: "Schedule" },
        {href: "#availability", label: "Availability" },
    ],
    headerCta: {
        href: "#login",
        label: "Login",
        ariaLabel: "Open login",
    },

    //HERO
    hero: {
        screens: [
            { src: screen1, alt: "Screen 1"},
            { src: screen2, alt: "Screen 2"},
            { src: screen3, alt: "Screen 3"},
            { src: screen4, alt: "Screen 4"},
            { src: screen5, alt: "Screen 5"},
            { src: screen6, alt: "Screen 6"},
            { src: screen7, alt: "Screen 7"},
        ],
        title: "Kolyma adventurer",
        subtitle: "Explore the  north. Choose your adventurer and plan your route",
        primaryCta: { href: "#adventureApp", label: "Скачать приложение" },
        secondaryCta: { href: "#gallery", label: "Browse" },
    },

    //FEATURES
    features: [
        { id: "routes", title: "Routes", text: "Build and save your travel routes.", icon: "routes" },
        { id: "spots", title: "Spots", text: "Best locations and viewpoints.", icon: "spots" },
        { id: "offline", title: "Offline mode", text: "Use maps without internet.", icon: "offline" },
        { id: "weather", title: "Weather", text: "Plan trips with forecast data.", icon: "weather" },
    ],

}