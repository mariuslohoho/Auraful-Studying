import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/sidebar/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar></AppSidebar>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
