import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { AddPropertyForm } from "@/components/landlord/add-property-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default async function NewPropertyPage() {
  const session = await getSession()

  if (!session || (session.role !== "landlord" && session.role !== "admin")) {
    redirect("/login")
  }

  return (
    <DashboardLayout role="landlord">
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
          <p className="text-muted-foreground">Fill in the details to list your property</p>
        </div>
        <AddPropertyForm />
      </div>
    </DashboardLayout>
  )
}
