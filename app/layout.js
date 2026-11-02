import { ThemeProvider, SiteHeader } from "../components/interactions";
import { Footer } from "../components/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://tejasjsolanki.vercel.app"),
  title: {
    default: "Tejas J Solanki — Full-Stack Developer & Android Builder",
    template: "%s — Tejas J Solanki",
  },
  description:
    "Portfolio of Tejas J Solanki. Full-Stack Developer & IT undergraduate at Atmiya University, Rajkot. Building offline-first Android apps, modern web platforms, and backend services.",
  keywords: [
    "Tejas J Solanki",
    "Tejas Solanki",
    "Android Developer",
    "Full-Stack Developer",
    "Next.js",
    "Kotlin",
    "Jetpack Compose",
    "Python",
    "FastAPI",
    "Flask",
    "Atmiya University",
    "Rajkot",
  ],
  authors: [{ name: "Tejas J Solanki", url: "https://tejasjsolanki.vercel.app" }],
  creator: "Tejas J Solanki",
  openGraph: {
    title: "Tejas J Solanki — Full-Stack Developer & Android Builder",
    description:
      "Full-stack and Android development projects, architectural studies, and technical foundations. Based in Rajkot, India.",
    type: "website",
    locale: "en_IN",
    siteName: "Tejas J Solanki Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas J Solanki — Full-Stack Developer & Android Builder",
    description: "Personal developer portfolio and technical project showcases.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/img/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/img/logo.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#080b11" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/img/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="site-shell main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
