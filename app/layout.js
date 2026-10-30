import { SiteHeader, MotionProvider, ThemeProvider } from "../components/interactions";
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
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#111312" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          <MotionProvider>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
