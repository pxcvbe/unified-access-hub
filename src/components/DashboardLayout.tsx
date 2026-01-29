import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserMenu } from "@/components/UserMenu";
import { NotificationBell } from "@/components/NotificationBell";
import { notifikasiPeternak } from "@/data/mockData";
import type { UserRole } from "@/hooks/useAuth";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("agrihub_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("agrihub_user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={user.role} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-full items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="hidden md:block">
                  <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <NotificationBell
                  notifications={notifikasiPeternak}
                  onNotificationClick={(id) => console.log("Notification clicked:", id)}
                />
                <UserMenu
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-muted/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
