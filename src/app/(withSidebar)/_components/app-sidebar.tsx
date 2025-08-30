"use client";

import * as React from "react";

import * as data from "./sidebar";

import { NavDocuments } from "@/app/(withSidebar)/_components/nav-documents";
import { NavMain } from "@/app/(withSidebar)/_components/nav-main";
import { NavSecondary } from "@/app/(withSidebar)/_components/nav-secondary";
import { NavUser } from "@/app/(withSidebar)/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconInnerShadowTop } from "@tabler/icons-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 h-14">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <div className="">
                  <h1 className="text-xl text-primary mb-2">Auraful Studying</h1>
                  <p className="text-sm text-muted-foreground">Your urgent locking-in companion</p>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.routes} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
