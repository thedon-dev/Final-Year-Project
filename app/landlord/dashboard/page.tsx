import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LandlordDashboard } from "@/components/landlord/landlord-dashboard"

export default async function LandlordDashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (session.role !== "landlord" && session.role !== "admin") {
    redirect("/tenant/dashboard")
  }

  return <LandlordDashboard />
}
