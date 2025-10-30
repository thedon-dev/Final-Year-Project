import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { TenantDashboard } from "@/components/tenant/tenant-dashboard";

export default async function TenantDashboardPage() {
  const session = await getSession();

  // if (!session) {
  //   redirect("/login")
  // }

  // if (session.role !== "tenant" && session.role !== "admin") {
  //   redirect("/landlord/dashboard")
  // }

  return <TenantDashboard />;
}
