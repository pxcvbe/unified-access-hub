import {
  Home,
  Beef,
  BarChart3,
  Package,
  Receipt,
  ShoppingCart,
  Users,
  FileText,
  Warehouse,
  ClipboardList,
  Handshake,
  Sprout,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/hooks/useAuth";

interface AppSidebarProps {
  role: UserRole;
}

const menuItems = {
  peternak: [
    { title: "Beranda", url: "/peternak", icon: Home },
    { title: "Ternak Saya", url: "/peternak/ternak", icon: Beef },
    { title: "Produksi", url: "/peternak/produksi", icon: BarChart3 },
    { title: "Stok Pakan", url: "/peternak/pakan", icon: Package },
    { title: "Transaksi", url: "/peternak/transaksi", icon: Receipt },
  ],
  agent: [
    { title: "Beranda", url: "/agent", icon: Home },
    { title: "Penjualan", url: "/agent/penjualan", icon: ShoppingCart },
    { title: "Peternak Binaan", url: "/agent/peternak", icon: Users },
    { title: "Pesanan", url: "/agent/pesanan", icon: ClipboardList },
    { title: "Laporan", url: "/agent/laporan", icon: FileText },
  ],
  mitra: [
    { title: "Beranda", url: "/mitra", icon: Home },
    { title: "Inventory", url: "/mitra/inventory", icon: Warehouse },
    { title: "Pesanan Masuk", url: "/mitra/pesanan", icon: ClipboardList },
    { title: "Daftar Mitra", url: "/mitra/daftar-mitra", icon: Handshake },
    { title: "Laporan", url: "/mitra/laporan", icon: FileText },
  ],
};

const roleLabels = {
  peternak: "Peternak",
  agent: "Agent",
  mitra: "Mitra Pakan",
};

const roleGradients = {
  peternak: "gradient-peternak",
  agent: "gradient-agent",
  mitra: "gradient-mitra",
};

export function AppSidebar({ role }: AppSidebarProps) {
  const location = useLocation();
  const items = menuItems[role];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", roleGradients[role])}>
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">AgriHub</h2>
            <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (item.url !== `/${role}` && location.pathname.startsWith(item.url));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                    >
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-muted-foreground text-center">
          AgriHub v1.0.0
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
