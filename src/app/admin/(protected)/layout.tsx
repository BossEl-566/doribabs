
import type { ReactNode } from "react";

import AdminShell from "@/components/admin/admin-shell";
import { requireSchoolAdmin } from "@/lib/auth";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const { user } = await requireSchoolAdmin();

  return (
    <AdminShell email={user.email ?? "Administrator"}>
      {children}
    </AdminShell>
  );
}
