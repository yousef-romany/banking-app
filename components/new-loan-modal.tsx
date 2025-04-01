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
import { Slider } from "@/components/ui/slider"

interface NewLoanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewLoanModal({ open, onOpenChange }: NewLoanModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loanAmount, setLoanAmount] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(36)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Here you would typically update the loans list
    }, 1500)
  }

  // Calculate estimated monthly payment (simplified)
  const interestRate = 0.0599 // 5.99%
  const monthlyInterest = interestRate / 12
  const monthlyPayment = (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -loanTerm))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>طلب قرض جديد</DialogTitle>
          <DialogDescription>أدخل تفاصيل القرض الذي ترغب في الحصول عليه.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loanType">نوع القرض</Label>
              <Select defaultValue="personal">
                <SelectTrigger id="loanType">
                  <SelectValue placeholder="اختر نوع القرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">قرض شخصي</SelectItem>
                  <SelectItem value="auto">قرض سيارة</SelectItem>
                  <SelectItem value="home">قرض منزل</SelectItem>
                  <SelectItem value="education">قرض تعليمي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="loanAmount">مبلغ القرض</Label>
                <span className="text-sm font-medium">${loanAmount.toLocaleString()}</span>
              </div>
              <Slider
                id="loanAmount"
                min={1000}
                max={50000}
                step={500}
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="loanTerm">مدة القرض (بالشهور)</Label>
                <span className="text-sm font-medium">{loanTerm} شهر</span>
              </div>
              <Slider
                id="loanTerm"
                min={12}
                max={60}
                step={12}
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>12 شهر</span>
                <span>60 شهر</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">الغرض من القرض</Label>
              <Input id="purpose" placeholder="مثال: تجديد المنزل، التعليم، إلخ." />
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="font-medium mb-2">ملخص القرض</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">مبلغ القرض:</span>
                  <span className="text-sm font-medium">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">مدة القرض:</span>
                  <span className="text-sm font-medium">{loanTerm} شهر</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">معدل الفائدة:</span>
                  <span className="text-sm font-medium">5.99%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">القسط الشهري التقديري:</span>
                  <span className="text-sm font-medium">${monthlyPayment.toFixed(2)}</span>
                </div>
              </div>
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
                "تقديم الطلب"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

