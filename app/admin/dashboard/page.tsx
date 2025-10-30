import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminDashboardPage() {
  const session = await getSession();

  // if (!session || session.role !== "admin") {
  //   redirect("/login")
  // }

  return <AdminDashboard />;
}
