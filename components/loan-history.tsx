export function LoanHistory() {
  const loans = [
    {
      id: "1",
      type: "قرض شخصي",
      amount: 10000.0,
      startDate: "2022-01-15",
      endDate: "2024-01-15",
      status: "مسدد",
      interestRate: "5.99%",
    },
    {
      id: "2",
      type: "قرض سيارة",
      amount: 25000.0,
      startDate: "2020-06-10",
      endDate: "2025-06-10",
      status: "مسدد",
      interestRate: "4.25%",
    },
  ]

  return (
    <div className="space-y-4">
      {loans.map((loan) => (
        <div key={loan.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{loan.type}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(loan.startDate).toLocaleDateString("ar-EG")} -{" "}
                {new Date(loan.endDate).toLocaleDateString("ar-EG")}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">${loan.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{loan.interestRate} فائدة</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm">الحالة</p>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
              {loan.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

