import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Safa & Ayaan — Wedding Invitation",
    description: "With gratitude to Allah, Safa and Ayaan invite you to celebrate their Nikah and Walima.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      title: "Safa & Ayaan — Wedding Invitation",
      description: "Join us as we begin our forever, with gratitude to Allah.",
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Safa and Ayaan wedding invitation" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Safa & Ayaan — Wedding Invitation",
      description: "Join us as we begin our forever, with gratitude to Allah.",
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f8f2e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/hero-watercolor-v2.png" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
