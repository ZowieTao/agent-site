import { Metadata } from "next"
import { ReactNode } from "react"

import "~/style/main.css"

export const metadata: Metadata = {
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
