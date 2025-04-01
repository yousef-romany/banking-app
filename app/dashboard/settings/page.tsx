"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Key, Loader2, Mail, Moon, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">الإعدادات</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>الملف الشخصي</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>الإشعارات</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>المظهر</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>الملف الشخصي</CardTitle>
              <CardDescription>قم بتحديث معلومات ملفك الشخصي هنا.</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <Button type="button" variant="outline" size="sm">
                        تغيير الصورة
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input id="firstName" defaultValue="محمد" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">اسم العائلة</Label>
                    <Input id="lastName" defaultValue="أحمد" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue="m.ahmed@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" type="tel" defaultValue="+966 50 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input id="address" defaultValue="شارع الملك فهد، الرياض" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input id="city" defaultValue="الرياض" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">الرمز البريدي</Label>
                    <Input id="postalCode" defaultValue="12345" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">الدولة</Label>
                  <Select defaultValue="sa">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                      <SelectItem value="ae">الإمارات العربية المتحدة</SelectItem>
                      <SelectItem value="kw">الكويت</SelectItem>
                      <SelectItem value="bh">البحرين</SelectItem>
                      <SelectItem value="qa">قطر</SelectItem>
                      <SelectItem value="om">عمان</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    "حفظ التغييرات"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>تغيير كلمة المرور</CardTitle>
                <CardDescription>قم بتحديث كلمة المرور الخاصة بك لتعزيز أمان حسابك.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>تغيير كلمة المرور</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المصادقة الثنائية</CardTitle>
                <CardDescription>قم بتفعيل المصادقة الثنائية لتعزيز أمان حسابك.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm font-medium">المصادقة الثنائية</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm font-medium">تأكيد البريد الإلكتروني</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm font-medium">إشعارات تسجيل الدخول</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">إعدادات الأمان المتقدمة</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>اختر كيفية تلقي الإشعارات من التطبيق.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">إشعارات الحساب</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">تنبيهات الإيداع</div>
                      <div className="text-xs text-muted-foreground">تلقي إشعار عند إيداع الأموال في حسابك</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">تنبيهات السحب</div>
                      <div className="text-xs text-muted-foreground">تلقي إشعار عند سحب الأموال من حسابك</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">تنبيهات الرصيد المنخفض</div>
                      <div className="text-xs text-muted-foreground">تلقي إشعار عندما ينخفض رصيدك عن حد معين</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">تنبيهات القروض</div>
                      <div className="text-xs text-muted-foreground">تلقي إشعار بشأن مواعيد سداد القروض</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">طرق الإشعار</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>البريد الإلكتروني</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الإشعارات" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الإشعارات</SelectItem>
                          <SelectItem value="important">الإشعارات المهمة فقط</SelectItem>
                          <SelectItem value="none">لا شيء</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>الرسائل النصية</Label>
                      <Select defaultValue="important">
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الإشعارات" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الإشعارات</SelectItem>
                          <SelectItem value="important">الإشعارات المهمة فقط</SelectItem>
                          <SelectItem value="none">لا شيء</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">تواتر الإشعارات</h3>
                <RadioGroup defaultValue="realtime">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="realtime" id="realtime" />
                    <Label htmlFor="realtime">في الوقت الفعلي</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">ملخص يومي</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">ملخص أسبوعي</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>حفظ التغييرات</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>المظهر</CardTitle>
              <CardDescription>تخصيص مظهر التطبيق حسب تفضيلاتك.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">السمة</h3>
                <RadioGroup defaultValue="system">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">فاتح</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">داكن</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">النظام</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">اللغة</h3>
                <Select defaultValue="ar">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">الإنجليزية</SelectItem>
                    <SelectItem value="fr">الفرنسية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">إعدادات أخرى</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">تأثيرات الحركة</div>
                    <div className="text-xs text-muted-foreground">تفعيل تأثيرات الحركة في التطبيق</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">عرض الأرصدة</div>
                    <div className="text-xs text-muted-foreground">عرض أرصدة الحسابات في الصفحة الرئيسية</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>حفظ التغييرات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

