import { SiteHeader, MotionProvider } from "../components/interactions";
import { Footer } from "../components/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://tejasjsolanki.vercel.app"),
  title: { default: "Tejas J Solanki — Developer & maker", template: "%s — Tejas J Solanki" },
  description: "Developer based in Rajkot, India. Building useful experiences across web, Android, and connected systems.",
  openGraph: {
    title: "Tejas J Solanki — Developer & maker",
    description: "A curious mind. A practical approach. Explore my projects, process, and the things I’m learning.",
    type: "website",
    locale: "en_IN",
    siteName: "Tejas J Solanki",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#faf9f6" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
