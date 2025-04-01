"use client"

import { useState } from "react"
import { CreditCard, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoanApplicationForm } from "@/components/loan-application-form"
import { LoanHistory } from "@/components/loan-history"
import { NewLoanModal } from "@/components/new-loan-modal"

export default function LoansPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [showNewLoanModal, setShowNewLoanModal] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">القروض</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowNewLoanModal(true)}>
            <Plus className="ml-2 h-4 w-4" />
            طلب قرض
          </Button>
        </div>
      </div>
      <Tabs defaultValue="active" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">القروض النشطة</TabsTrigger>
          <TabsTrigger value="history">سجل القروض</TabsTrigger>
          <TabsTrigger value="apply">طلب قرض</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">قرض شخصي</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,000.00</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">معدل الفائدة</p>
                  <p className="text-xs font-medium">5.99%</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">المدة</p>
                  <p className="text-xs font-medium">36 شهر</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">القسط الشهري</p>
                  <p className="text-xs font-medium">$152.11</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">الدفعة القادمة</p>
                  <p className="text-xs font-medium">١٥ مايو ٢٠٢٥</p>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">التقدم</p>
                  <p className="text-xs font-medium">35% مدفوع</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  سداد الدفعة
                </Button>
              </CardFooter>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>جدول السداد</CardTitle>
                <CardDescription>عرض دفعات القرض القادمة.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">١٥ مايو ٢٠٢٥</p>
                      <p className="text-sm text-muted-foreground">قرض شخصي</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$152.11</p>
                      <p className="text-sm text-muted-foreground">الدفعة #13 من 36</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">١٥ يونيو ٢٠٢٥</p>
                      <p className="text-sm text-muted-foreground">قرض شخصي</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$152.11</p>
                      <p className="text-sm text-muted-foreground">الدفعة #14 من 36</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">١٥ يوليو ٢٠٢٥</p>
                      <p className="text-sm text-muted-foreground">قرض شخصي</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$152.11</p>
                      <p className="text-sm text-muted-foreground">الدفعة #15 من 36</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>سجل القروض</CardTitle>
              <CardDescription>عرض القروض السابقة وسجل المدفوعات.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoanHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="apply">
          <Card>
            <CardHeader>
              <CardTitle>طلب قرض</CardTitle>
              <CardDescription>املأ النموذج أدناه للتقدم بطلب قرض جديد.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoanApplicationForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NewLoanModal open={showNewLoanModal} onOpenChange={setShowNewLoanModal} />
    </div>
  )
}

