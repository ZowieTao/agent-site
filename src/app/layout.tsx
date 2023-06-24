import { ReactNode } from "react"

import "~/style/main.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
