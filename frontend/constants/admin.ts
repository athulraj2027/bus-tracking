import { Users, Bus, Route, UserCog, LayoutDashboard } from "lucide-react";

export const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Drivers", url: "/admin/drivers", icon: UserCog },
  { title: "Buses", url: "/admin/buses", icon: Bus },
  { title: "Routes", url: "/admin/routes", icon: Route },
];
