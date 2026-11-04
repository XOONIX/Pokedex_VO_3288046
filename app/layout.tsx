import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pokédex — Field Guide",
  description: "Explore Pokémon, discover their types, and find your next favorite.",
}

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
