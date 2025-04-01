"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, DollarSign, Home, LogOut, Menu, PiggyBank, Settings, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "الرئيسية",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "الحسابات",
      path: "/dashboard/accounts",
      icon: CreditCard,
    },
    {
      name: "المعاملات",
      path: "/dashboard/transactions",
      icon: BarChart3,
    },
    {
      name: "الإيداع",
      path: "/dashboard/deposit",
      icon: PiggyBank,
    },
    {
      name: "السحب",
      path: "/dashboard/withdraw",
      icon: DollarSign,
    },
    {
      name: "القروض",
      path: "/dashboard/loans",
      icon: CreditCard,
    },
    {
      name: "الإعدادات",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b px-2 py-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 font-bold"
                      onClick={() => setOpen(false)}
                    >
                      <span>نكس بنك</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">إغلاق</span>
                    </Button>
                  </div>
                  <nav className="flex-1 overflow-auto py-4">
                    <div className="flex flex-col gap-1 px-2">
                      {routes.map((route) => (
                        <Link
                          key={route.path}
                          href={route.path}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                            pathname === route.path
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <route.icon className="h-4 w-4" />
                          {route.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                  <div className="border-t p-4">
                    <Link
                      href="/"
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      تسجيل الخروج
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <span>نكس بنك</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/dashboard/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">الملف الشخصي</span>
              </Link>
            </Button> */}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[240px] flex-col border-l bg-muted/40 md:flex">
          <nav className="flex-1 overflow-auto py-6">
            <div className="flex flex-col gap-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    pathname === route.path
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                </Link>
              ))}
            </div>
          </nav>
          <div className="border-t p-4">
            <Link
              href="/"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Link>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

