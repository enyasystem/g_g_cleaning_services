"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function CurrencyWidget() {
  const currencies = [
    { name: "USD", value: 1550, change: 0.5, up: false },
    { name: "EUR", value: 1680, change: 0.3, up: true },
    { name: "GBP", value: 1950, change: 0.2, up: true },
  ]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Exchange Rate (NGN)</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          {currencies.map((currency) => (
            <div key={currency.name} className="flex items-center justify-between text-sm">
              <span className="font-medium">{currency.name}</span>
              <div className="flex items-center">
                <span className="mr-2">₦{currency.value.toLocaleString()}</span>
                <div className={`flex items-center text-xs ${currency.up ? "text-green-500" : "text-red-500"}`}>
                  {currency.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {currency.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
