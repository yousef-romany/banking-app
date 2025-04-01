"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, PiggyBank } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DepositPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">الإيداع</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>إجراء إيداع</CardTitle>
            <CardDescription>إضافة أموال إلى حسابك من حساب مصرفي أو بطاقة.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account">الإيداع إلى</Label>
                <Select defaultValue="checking">
                  <SelectTrigger id="account">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">الحساب الجاري (****1234)</SelectItem>
                    <SelectItem value="savings">حساب التوفير (****5678)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">طريقة الإيداع</Label>
                <Select defaultValue="bank">
                  <SelectTrigger id="method">
                    <SelectValue placeholder="اختر الطريقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">تحويل بنكي</SelectItem>
                    <SelectItem value="card">بطاقة الخصم</SelectItem>
                    <SelectItem value="check">إيداع شيك عبر الجوال</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pr-7"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">الوصف (اختياري)</Label>
                <Input id="description" placeholder="مثال: إيداع راتب" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <PiggyBank className="ml-2 h-4 w-4" />
                    إيداع الأموال
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>معلومات الإيداع</CardTitle>
            <CardDescription>تعرف على طرق الإيداع وأوقات المعالجة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">التحويل البنكي</h3>
              <p className="text-sm text-muted-foreground">
                تستغرق التحويلات البنكية عادة من 1 إلى 3 أيام عمل للمعالجة.
              </p>
            </div>
            <div>
              <h3 className="font-medium">بطاقة الخصم</h3>
              <p className="text-sm text-muted-foreground">تتم معالجة إيداعات بطاقة الخصم على الفور.</p>
            </div>
            <div>
              <h3 className="font-medium">إيداع شيك عبر الجوال</h3>
              <p className="text-sm text-muted-foreground">قد تستغرق إيداعات الشيكات من 1 إلى 5 أيام عمل للمقاصة.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

