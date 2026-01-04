import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

const title = "Mohamed Ali Msadek — AI Engineer";
const description =
  "AI Engineer focused on LLMs, RAG, agentic AI, and MLOps. Building resilient, production-ready AI systems.";
const url = "https://your-domain.com";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Ali Msadek"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/me.jpg"],
    creator: "@yourhandle"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Ali Msadek",
              jobTitle: "AI Engineer",
              url,
              email: "Mohamed-Ali.Msadek@eurecom.fr",
              sameAs: [
                "https://www.linkedin.com/in/mohamed-ali-msadek/",
                "https://github.com/dalimsadek"
              ]
            })
          }}
        />
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
