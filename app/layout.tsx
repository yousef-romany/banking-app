import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

const cairo = Cairo({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "نكس بنك - نظام مصرفي حديث",
  description: "تطبيق مصرفي حديث مبني باستخدام Next.js و Tailwind CSS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'