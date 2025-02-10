import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toolbar } from "@/app/components/toolbar"
import Link from "next/link"
import { Github } from "lucide-react"
import type React from "react"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Steel Feedback",
  description: "Feedback and roadmap for Steel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#121212] text-white`}>
        <nav className="flex items-center justify-between p-4 bg-[#1C1C1C] border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded"></div>
            <Link href="/" className="font-mono text-white text-lg">
              steel.feedback
            </Link>
          </div>
          <Link
            href="https://github.com/steel-dev/feedback"
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Github Repo</span>
          </Link>
        </nav>
        <Toolbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

