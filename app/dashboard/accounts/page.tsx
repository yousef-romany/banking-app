"use client"

import { useState } from "react"
import { CreditCard, PiggyBank, ArrowRightLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewAccountModal } from "@/components/new-account-modal"

export default function AccountsPage() {
  const [showNewAccountModal, setShowNewAccountModal] = useState(false)
  const accounts = [
    {
      id: "1",
      name: "الحساب الجاري",
      number: "****1234",
      balance: 12345.67,
      type: "checking",
      currency: "USD",
      lastActivity: "2025-04-01",
    },
    {
      id: "2",
      name: "حساب التوفير",
      number: "****5678",
      balance: 45678.9,
      type: "savings",
      currency: "USD",
      lastActivity: "2025-03-28",
      interestRate: 2.5,
    },
    {
      id: "3",
      name: "حساب الاستثمار",
      number: "****9012",
      balance: 78901.23,
      type: "investment",
      currency: "USD",
      lastActivity: "2025-03-25",
      returnRate: 7.2,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">الحسابات</h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button onClick={() => setShowNewAccountModal(true)}>
            <Plus className="ml-2 h-4 w-4" />
            فتح حساب جديد
          </Button>
          <Button>
            <ArrowRightLeft className="ml-2 h-4 w-4" />
            تحويل بين الحسابات
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">جميع الحسابات</TabsTrigger>
          <TabsTrigger value="checking">الحسابات الجارية</TabsTrigger>
          <TabsTrigger value="savings">حسابات التوفير</TabsTrigger>
          <TabsTrigger value="investment">حسابات الاستثمار</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">{account.name}</CardTitle>
                  {account.type === "checking" && <CreditCard className="h-5 w-5 text-muted-foreground" />}
                  {account.type === "savings" && <PiggyBank className="h-5 w-5 text-muted-foreground" />}
                  {account.type === "investment" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground"
                    >
                      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                      <line x1="2" x2="22" y1="20" y2="20" />
                    </svg>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">رقم الحساب</div>
                  <div className="font-medium">{account.number}</div>

                  <div className="mt-3 text-sm text-muted-foreground">الرصيد</div>
                  <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>

                  {account.type === "savings" && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">معدل الفائدة</span>
                        <span className="text-sm font-medium">{account.interestRate}%</span>
                      </div>
                    </div>
                  )}

                  {account.type === "investment" && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">معدل العائد</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          +{account.returnRate}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">أداء المحفظة</span>
                          <span className="text-xs font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-muted-foreground">
                    آخر نشاط: {new Date(account.lastActivity).toLocaleDateString("ar-EG")}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    تفاصيل الحساب
                  </Button>
                  <Button size="sm">إدارة</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>إجمالي الأصول</CardTitle>
              <CardDescription>نظرة عامة على جميع حساباتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">إجمالي الأصول</span>
                    <span className="text-2xl font-bold">
                      ${accounts.reduce((sum, account) => sum + account.balance, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">عدد الحسابات</span>
                    <span className="text-2xl font-bold">{accounts.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {account.type === "checking" && <CreditCard className="ml-2 h-4 w-4 text-muted-foreground" />}
                        {account.type === "savings" && <PiggyBank className="ml-2 h-4 w-4 text-muted-foreground" />}
                        {account.type === "investment" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2 h-4 w-4 text-muted-foreground"
                          >
                            <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                            <line x1="2" x2="22" y1="20" y2="20" />
                          </svg>
                        )}
                        <span className="text-sm font-medium">{account.name}</span>
                      </div>
                      <span className="text-sm font-medium">${account.balance.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checking" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts
              .filter((account) => account.type === "checking")
              .map((account) => (
                <Card key={account.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{account.name}</CardTitle>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">رقم الحساب</div>
                    <div className="font-medium">{account.number}</div>

                    <div className="mt-3 text-sm text-muted-foreground">الرصيد</div>
                    <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      آخر نشاط: {new Date(account.lastActivity).toLocaleDateString("ar-EG")}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      تفاصيل الحساب
                    </Button>
                    <Button size="sm">إدارة</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts
              .filter((account) => account.type === "savings")
              .map((account) => (
                <Card key={account.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{account.name}</CardTitle>
                    <PiggyBank className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">رقم الحساب</div>
                    <div className="font-medium">{account.number}</div>

                    <div className="mt-3 text-sm text-muted-foreground">الرصيد</div>
                    <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">معدل الفائدة</span>
                        <span className="text-sm font-medium">{account.interestRate}%</span>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      آخر نشاط: {new Date(account.lastActivity).toLocaleDateString("ar-EG")}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      تفاصيل الحساب
                    </Button>
                    <Button size="sm">إدارة</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="investment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts
              .filter((account) => account.type === "investment")
              .map((account) => (
                <Card key={account.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{account.name}</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground"
                    >
                      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                      <line x1="2" x2="22" y1="20" y2="20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">رقم الحساب</div>
                    <div className="font-medium">{account.number}</div>

                    <div className="mt-3 text-sm text-muted-foreground">الرصيد</div>
                    <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">معدل العائد</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          +{account.returnRate}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">أداء المحفظة</span>
                          <span className="text-xs font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      آخر نشاط: {new Date(account.lastActivity).toLocaleDateString("ar-EG")}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      تفاصيل الحساب
                    </Button>
                    <Button size="sm">إدارة</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <NewAccountModal open={showNewAccountModal} onOpenChange={setShowNewAccountModal} />
    </div>
  )
}

