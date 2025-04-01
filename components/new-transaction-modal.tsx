"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface NewTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTransactionModal({ open, onOpenChange }: NewTransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [transactionType, setTransactionType] = useState("deposit")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Here you would typically update the transactions list
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إنشاء معاملة جديدة</DialogTitle>
          <DialogDescription>أدخل تفاصيل المعاملة المالية الجديدة.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>نوع المعاملة</Label>
              <RadioGroup
                defaultValue="deposit"
                value={transactionType}
                onValueChange={setTransactionType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="deposit" id="deposit" />
                  <Label htmlFor="deposit">إيداع</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="withdrawal" id="withdrawal" />
                  <Label htmlFor="withdrawal">سحب</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">تحويل</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">الحساب</Label>
              <Select defaultValue="checking">
                <SelectTrigger id="account">
                  <SelectValue placeholder="اختر الحساب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">الحساب الجاري (****1234)</SelectItem>
                  <SelectItem value="savings">حساب التوفير (****5678)</SelectItem>
                  <SelectItem value="investment">حساب الاستثمار (****9012)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {transactionType === "transfer" && (
              <div className="space-y-2">
                <Label htmlFor="toAccount">الحساب المستلم</Label>
                <Select defaultValue="">
                  <SelectTrigger id="toAccount">
                    <SelectValue placeholder="اختر الحساب المستلم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">الحساب الجاري (****1234)</SelectItem>
                    <SelectItem value="savings">حساب التوفير (****5678)</SelectItem>
                    <SelectItem value="investment">حساب الاستثمار (****9012)</SelectItem>
                    <SelectItem value="external">حساب خارجي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input id="amount" type="number" placeholder="0.00" className="pr-7" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">الفئة</Label>
              <Select defaultValue={transactionType === "deposit" ? "income" : "expense"}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {transactionType === "deposit" && (
                    <>
                      <SelectItem value="income">دخل</SelectItem>
                      <SelectItem value="salary">راتب</SelectItem>
                      <SelectItem value="investment">عائد استثمار</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </>
                  )}
                  {transactionType === "withdrawal" && (
                    <>
                      <SelectItem value="expense">مصروفات</SelectItem>
                      <SelectItem value="food">طعام وبقالة</SelectItem>
                      <SelectItem value="housing">سكن</SelectItem>
                      <SelectItem value="transportation">مواصلات</SelectItem>
                      <SelectItem value="utilities">مرافق</SelectItem>
                      <SelectItem value="entertainment">ترفيه</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </>
                  )}
                  {transactionType === "transfer" && (
                    <>
                      <SelectItem value="transfer">تحويل</SelectItem>
                      <SelectItem value="savings">ادخار</SelectItem>
                      <SelectItem value="investment">استثمار</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Input id="description" placeholder="أدخل وصفاً للمعاملة" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                "إنشاء المعاملة"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

