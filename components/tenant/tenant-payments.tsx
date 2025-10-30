"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, CreditCard } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import type { IPayment } from "@/lib/models/Payment"

export function TenantPayments() {
  const [payments, setPayments] = useState<IPayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  async function fetchPayments() {
    try {
      const res = await fetch("/api/payments")
      const data = await res.json()
      if (data.success) {
        setPayments(data.data)
      }
    } catch (error) {
      console.error("[v0] Error fetching payments:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextPayment = payments.find((p) => p.status === "pending")

  function getStatusColor(status: string) {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage your rent payments</p>
        </div>

        {nextPayment && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Next Payment Due</CardTitle>
              <CardDescription>Your upcoming rent payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">KES {nextPayment.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due on {format(new Date(nextPayment.dueDate), "MMMM dd, yyyy")}
                  </p>
                </div>
                <Button size="lg">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your rent payment records</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">No payment history yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment._id.toString()}>
                      <TableCell>{format(new Date(payment.dueDate), "MMM dd, yyyy")}</TableCell>
                      <TableCell className="font-medium">KES {payment.amount.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{payment.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {payment.receipt ? (
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
