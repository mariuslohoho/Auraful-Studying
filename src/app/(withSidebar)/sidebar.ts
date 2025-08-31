import { Icon, IconBug, IconDashboard } from "@tabler/icons-react";

interface item {
  title: string;
  url: string;
  icon?: Icon;
}

export const routes: item[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Test",
    url: "/test",
    icon: IconBug,
  },
  {
    title: "Widgets Test",
    url: "/widgets_test",
    icon: IconBug,
  },
];
