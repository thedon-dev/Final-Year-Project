import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { PropertiesList } from "@/components/landlord/properties-list"

export default async function PropertiesPage() {
  const session = await getSession()

  if (!session || (session.role !== "landlord" && session.role !== "admin")) {
    redirect("/login")
  }

  return <PropertiesList />
}
