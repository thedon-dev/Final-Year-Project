import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { PaymentsList } from "@/components/landlord/payments-list"

export default async function PaymentsPage() {
  const session = await getSession()

  if (!session || (session.role !== "landlord" && session.role !== "admin")) {
    redirect("/login")
  }

  return <PaymentsList />
}
