
import type { ReactNode } from "react";

import SiteLayout from "../(site)/layout";

export default function EventsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SiteLayout>
      {children}
    </SiteLayout>
  );
}
