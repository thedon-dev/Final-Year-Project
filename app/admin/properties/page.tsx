import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminProperties } from "@/components/admin/admin-properties";

export default async function AdminPropertiesPage() {
  const session = await getSession();

  // if (!session || session.role !== "admin") {
  //   redirect("/login")
  // }

  return <AdminProperties />;
}
