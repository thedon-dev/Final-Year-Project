import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { BrowseProperties } from "@/components/tenant/browse-properties";

export default async function BrowsePropertiesPage() {
  const session = await getSession();

  // if (!session) {
  //   redirect("/login")
  // }

  return <BrowseProperties />;
}
