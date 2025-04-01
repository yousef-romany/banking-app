"use client"

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Download, Search, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewTransactionModal } from "@/components/new-transaction-modal"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false)

  const transactions = [
    {
      id: "1",
      description: "إيداع",
      amount: 1200.0,
      date: "2025-04-01",
      type: "deposit",
      category: "إيداع",
      account: "الحساب الجاري",
    },
    {
      id: "2",
      description: "متجر البقالة",
      amount: 85.32,
      date: "2025-03-30",
      type: "withdrawal",
      category: "طعام وبقالة",
      account: "الحساب الجاري",
    },
    {
      id: "3",
      description: "الراتب الشهري",
      amount: 3500.0,
      date: "2025-03-28",
      type: "deposit",
      category: "دخل",
      account: "الحساب الجاري",
    },
    {
      id: "4",
      description: "مطعم",
      amount: 65.0,
      date: "2025-03-27",
      type: "withdrawal",
      category: "مطاعم",
      account: "الحساب الجاري",
    },
    {
      id: "5",
      description: "تسوق عبر الإنترنت",
      amount: 120.5,
      date: "2025-03-25",
      type: "withdrawal",
      category: "تسوق",
      account: "الحساب الجاري",
    },
    {
      id: "6",
      description: "فاتورة الكهرباء",
      amount: 95.4,
      date: "2025-03-22",
      type: "withdrawal",
      category: "مرافق",
      account: "الحساب الجاري",
    },
    {
      id: "7",
      description: "تحويل إلى حساب التوفير",
      amount: 500.0,
      date: "2025-03-20",
      type: "transfer",
      category: "تحويل",
      account: "الحساب الجاري",
    },
    {
      id: "8",
      description: "تحويل من الحساب الجاري",
      amount: 500.0,
      date: "2025-03-20",
      type: "deposit",
      category: "تحويل",
      account: "حساب التوفير",
    },
    {
      id: "9",
      description: "فائدة شهرية",
      amount: 12.5,
      date: "2025-03-15",
      type: "deposit",
      category: "فائدة",
      account: "حساب التوفير",
    },
    {
      id: "10",
      description: "اشتراك خدمة بث",
      amount: 14.99,
      date: "2025-03-10",
      type: "withdrawal",
      category: "ترفيه",
      account: "الحساب الجاري",
    },
  ]

  // Filter transactions based on search term, date, and type
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.account.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    // Simple date filtering for demo purposes
    let matchesDate = true
    const transactionDate = new Date(transaction.date)
    const today = new Date()

    if (dateFilter === "today") {
      matchesDate = transactionDate.toDateString() === today.toDateString()
    } else if (dateFilter === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(today.getDate() - 7)
      matchesDate = transactionDate >= weekAgo
    } else if (dateFilter === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(today.getMonth() - 1)
      matchesDate = transactionDate >= monthAgo
    }

    return matchesSearch && matchesType && matchesDate
  })

  // Calculate totals
  const totalDeposits = filteredTransactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = filteredTransactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">المعاملات</h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button onClick={() => setShowNewTransactionModal(true)}>
            <Plus className="ml-2 h-4 w-4" />
            معاملة جديدة
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">جميع المعاملات</TabsTrigger>
          <TabsTrigger value="deposits">الإيداعات</TabsTrigger>
          <TabsTrigger value="withdrawals">المسحوبات</TabsTrigger>
          <TabsTrigger value="transfers">التحويلات</TabsTrigger>
        </TabsList>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-x-reverse sm:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المعاملات..."
                className="pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-x-reverse sm:space-y-0">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفترات</SelectItem>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="week">آخر 7 أيام</SelectItem>
                <SelectItem value="month">آخر 30 يوم</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="نوع المعاملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="deposit">إيداع</SelectItem>
                <SelectItem value="withdrawal">سحب</SelectItem>
                <SelectItem value="transfer">تحويل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيداعات</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">+${totalDeposits.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">في الفترة المحددة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المسحوبات</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">-${totalWithdrawals.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">في الفترة المحددة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">صافي التدفق النقدي</CardTitle>
              <div
                className={`h-4 w-4 ${
                  totalDeposits - totalWithdrawals >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {totalDeposits - totalWithdrawals >= 0 ? "+" : "-"}
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  totalDeposits - totalWithdrawals >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {totalDeposits - totalWithdrawals >= 0 ? "+" : "-"}$
                {Math.abs(totalDeposits - totalWithdrawals).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">في الفترة المحددة</p>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>جميع المعاملات</CardTitle>
              <CardDescription>عرض تفاصيل جميع المعاملات المالية.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            transaction.type === "deposit"
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                              : transaction.type === "withdrawal"
                                ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          }`}
                        >
                          {transaction.type === "deposit" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : transaction.type === "withdrawal" ? (
                            <ArrowUpRight className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 rotate-90" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex text-xs text-muted-foreground">
                            <span>{new Date(transaction.date).toLocaleDateString("ar-EG")}</span>
                            <span className="mx-1">•</span>
                            <span>{transaction.category}</span>
                            <span className="mx-1">•</span>
                            <span>{transaction.account}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          transaction.type === "deposit"
                            ? "text-green-600 dark:text-green-400"
                            : transaction.type === "withdrawal"
                              ? "text-red-600 dark:text-red-400"
                              : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">لا توجد معاملات تطابق معايير البحث</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposits">
          <Card>
            <CardHeader>
              <CardTitle>الإيداعات</CardTitle>
              <CardDescription>عرض تفاصيل جميع معاملات الإيداع.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.filter((t) => t.type === "deposit").length > 0 ? (
                  filteredTransactions
                    .filter((t) => t.type === "deposit")
                    .map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                            <ArrowDownLeft className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex text-xs text-muted-foreground">
                              <span>{new Date(transaction.date).toLocaleDateString("ar-EG")}</span>
                              <span className="mx-1">•</span>
                              <span>{transaction.category}</span>
                              <span className="mx-1">•</span>
                              <span>{transaction.account}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                          +${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">لا توجد إيداعات تطابق معايير البحث</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals">
          <Card>
            <CardHeader>
              <CardTitle>المسحوبات</CardTitle>
              <CardDescription>عرض تفاصيل جميع معاملات السحب.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.filter((t) => t.type === "withdrawal").length > 0 ? (
                  filteredTransactions
                    .filter((t) => t.type === "withdrawal")
                    .map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400">
                            <ArrowUpRight className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex text-xs text-muted-foreground">
                              <span>{new Date(transaction.date).toLocaleDateString("ar-EG")}</span>
                              <span className="mx-1">•</span>
                              <span>{transaction.category}</span>
                              <span className="mx-1">•</span>
                              <span>{transaction.account}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-red-600 dark:text-red-400">
                          -${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">لا توجد مسحوبات تطابق معايير البحث</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers">
          <Card>
            <CardHeader>
              <CardTitle>التحويلات</CardTitle>
              <CardDescription>عرض تفاصيل جميع معاملات التحويل بين الحسابات.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.filter((t) => t.type === "transfer").length > 0 ? (
                  filteredTransactions
                    .filter((t) => t.type === "transfer")
                    .map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                            <ArrowUpRight className="h-5 w-5 rotate-90" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex text-xs text-muted-foreground">
                              <span>{new Date(transaction.date).toLocaleDateString("ar-EG")}</span>
                              <span className="mx-1">•</span>
                              <span>{transaction.category}</span>
                              <span className="mx-1">•</span>
                              <span>{transaction.account}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          -${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">لا توجد تحويلات تطابق معايير البحث</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NewTransactionModal open={showNewTransactionModal} onOpenChange={setShowNewTransactionModal} />
    </div>
  )
}

