import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

export function TransactionList() {
  const transactions = [
    {
      id: "1",
      description: "إيداع",
      amount: 1200.0,
      date: "2025-04-01",
      type: "deposit",
    },
    {
      id: "2",
      description: "متجر البقالة",
      amount: 85.32,
      date: "2025-03-30",
      type: "withdrawal",
    },
    {
      id: "3",
      description: "الراتب الشهري",
      amount: 3500.0,
      date: "2025-03-28",
      type: "deposit",
    },
    {
      id: "4",
      description: "مطعم",
      amount: 65.0,
      date: "2025-03-27",
      type: "withdrawal",
    },
    {
      id: "5",
      description: "تسوق عبر الإنترنت",
      amount: 120.5,
      date: "2025-03-25",
      type: "withdrawal",
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                transaction.type === "deposit"
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                  : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
              }`}
            >
              {transaction.type === "deposit" ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString("ar-EG")}</p>
            </div>
          </div>
          <div
            className={`text-sm font-medium ${
              transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

