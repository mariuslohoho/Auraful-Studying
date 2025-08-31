"use client";
import { AppSidebar } from "@/app/(withSidebar)/_components/app-sidebar";
import { SiteHeader } from "@/app/(withSidebar)/_components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import HeaderProvider from "./_site-header-provider/header_context";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeaderProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </HeaderProvider>
  );
}
