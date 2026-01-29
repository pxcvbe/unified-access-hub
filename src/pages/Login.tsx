import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, User, Users, Package, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/hooks/useAuth";

const roles = [
  {
    id: "peternak" as UserRole,
    label: "Peternak",
    description: "Kelola ternak dan produksi",
    icon: Sprout,
  },
  {
    id: "agent" as UserRole,
    label: "Agent",
    description: "Kelola penjualan dan peternak",
    icon: Users,
  },
  {
    id: "mitra" as UserRole,
    label: "Mitra Pakan",
    description: "Kelola inventory dan pesanan",
    icon: Package,
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("peternak");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Store user in localStorage
    const mockUser = {
      id: "1",
      name: selectedRole === "peternak" ? "Budi Santoso" : selectedRole === "agent" ? "Ahmad Wijaya" : "PT Pakan Sejahtera",
      email: email || `demo@${selectedRole}.com`,
      role: selectedRole,
    };
    localStorage.setItem("agrihub_user", JSON.stringify(mockUser));

    // Navigate to appropriate dashboard
    navigate(`/${selectedRole}`);
    setIsLoading(false);
  };

  const getRoleButtonStyles = (role: UserRole) => {
    const styles = {
      peternak: "border-peternak/50 bg-peternak-light text-peternak",
      agent: "border-agent/50 bg-agent-light text-agent",
      mitra: "border-mitra/50 bg-mitra-light text-mitra",
    };
    return styles[role];
  };

  const getLoginButtonStyles = () => {
    const styles = {
      peternak: "gradient-peternak hover:opacity-90",
      agent: "gradient-agent hover:opacity-90",
      mitra: "gradient-mitra hover:opacity-90",
    };
    return styles[selectedRole];
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tMi0yVjI0aC04djRoOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sprout className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">AgriHub</h1>
          </div>

          {/* Tagline */}
          <p className="text-xl text-white/90 text-center mb-12 max-w-md">
            Ekosistem Pertanian Terintegrasi untuk Indonesia
          </p>

          {/* Features */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Manajemen Ternak</h3>
                <p className="text-sm text-white/70">Pantau kesehatan dan produksi ternak</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Jaringan Agent</h3>
                <p className="text-sm text-white/70">Hubungkan peternak dengan mitra pakan</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Supply Chain Pakan</h3>
                <p className="text-sm text-white/70">Kelola inventory dan distribusi pakan</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="absolute bottom-8 text-sm text-white/60">
            © 2025 AgriHub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
              <Sprout className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-primary">AgriHub</h1>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-muted-foreground">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label>Masuk sebagai</Label>
              <RadioGroup
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as UserRole)}
                className="grid grid-cols-3 gap-3"
              >
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <Label
                      key={role.id}
                      htmlFor={role.id}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border-2 p-4 cursor-pointer transition-all",
                        isSelected
                          ? getRoleButtonStyles(role.id)
                          : "border-border hover:border-muted-foreground/50"
                      )}
                    >
                      <RadioGroupItem
                        value={role.id}
                        id={role.id}
                        className="sr-only"
                      />
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{role.label}</span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-xs text-muted-foreground"
                >
                  Lupa Password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className={cn(
                "w-full h-11 text-white font-medium",
                getLoginButtonStyles()
              )}
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Button variant="link" className="px-1 text-primary">
                Daftar Sekarang
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
