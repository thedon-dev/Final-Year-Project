import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { TenantPayments } from "@/components/tenant/tenant-payments";

export default async function TenantPaymentsPage() {
  const session = await getSession();

  // if (!session || (session.role !== "tenant" && session.role !== "admin")) {
  //   redirect("/login")
  // }

  return <TenantPayments />;
}
