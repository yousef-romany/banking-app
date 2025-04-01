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

interface NewAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewAccountModal({ open, onOpenChange }: NewAccountModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Here you would typically update the accounts list
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>فتح حساب جديد</DialogTitle>
          <DialogDescription>أدخل المعلومات المطلوبة لفتح حساب جديد.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountType">نوع الحساب</Label>
              <Select defaultValue="checking">
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="اختر نوع الحساب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">حساب جاري</SelectItem>
                  <SelectItem value="savings">حساب توفير</SelectItem>
                  <SelectItem value="investment">حساب استثماري</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">اسم الحساب</Label>
              <Input id="accountName" placeholder="مثال: حساب التوفير الرئيسي" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialDeposit">الإيداع الأولي</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input id="initialDeposit" type="number" placeholder="0.00" className="pr-7" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">العملة</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">دولار أمريكي (USD)</SelectItem>
                  <SelectItem value="eur">يورو (EUR)</SelectItem>
                  <SelectItem value="sar">ريال سعودي (SAR)</SelectItem>
                  <SelectItem value="aed">درهم إماراتي (AED)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Show additional fields based on account type */}
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
                "فتح الحساب"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

