import type React from "react"
import Header from "./header"
import Footer from "./footer"
import './layout.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="main">
      <Header />
      <div className="body">
        {children}
      </div>
      <Footer />
    </div>
  )
}
