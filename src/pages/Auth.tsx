import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Users, Package, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useAuth, type UserRole } from "@/hooks/useAuth";
import { loginSchema, registerSchema } from "@/lib/validations";
import { toast } from "sonner";

const roles = [
  {
    id: "peternak" as UserRole,
    label: "Peternak",
    description: "Kelola ternak dan produksi",
    icon: Sprout,
    businessLabel: "Nama Kandang",
    businessPlaceholder: "Contoh: Kandang Makmur",
  },
  {
    id: "agent" as UserRole,
    label: "Agent",
    description: "Kelola penjualan dan peternak",
    icon: Users,
    businessLabel: "Nama Toko",
    businessPlaceholder: "Contoh: Toko Pakan Jaya",
  },
  {
    id: "mitra" as UserRole,
    label: "Mitra Pakan",
    description: "Kelola inventory dan pesanan",
    icon: Package,
    businessLabel: "Nama Perusahaan",
    businessPlaceholder: "Contoh: PT Pakan Sejahtera",
  },
];

type AuthMode = "login" | "register";

export default function Auth() {
  const navigate = useNavigate();
  const { signIn, signUp, user, role, isLoading } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("peternak");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user && role) {
      navigate(`/${role}`);
    }
  }, [user, role, isLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Email atau password salah");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Email belum diverifikasi. Silakan cek inbox email Anda.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Login berhasil!");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse({
      fullName,
      nik,
      email,
      password,
      confirmPassword,
      businessName,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email, password, fullName, nik, businessName, selectedRole);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes("User already registered")) {
        toast.error("Email sudah terdaftar. Silakan login.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.");
    setMode("login");
    setPassword("");
    setConfirmPassword("");
  };

  const getRoleButtonStyles = (role: UserRole) => {
    const styles = {
      peternak: "border-peternak/50 bg-peternak-light text-peternak",
      agent: "border-agent/50 bg-agent-light text-agent",
      mitra: "border-mitra/50 bg-mitra-light text-mitra",
    };
    return styles[role];
  };

  const getButtonStyles = () => {
    if (mode === "login") {
      return "gradient-primary hover:opacity-90";
    }
    const styles = {
      peternak: "gradient-peternak hover:opacity-90",
      agent: "gradient-agent hover:opacity-90",
      mitra: "gradient-mitra hover:opacity-90",
    };
    return styles[selectedRole];
  };

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tMi0yVjI0aC04djRoOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sprout className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">AgriHub</h1>
          </div>

          <p className="text-xl text-white/90 text-center mb-12 max-w-md">
            Ekosistem Pertanian Terintegrasi untuk Indonesia
          </p>

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

          <p className="absolute bottom-8 text-sm text-white/60">
            © 2025 AgriHub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
              <Sprout className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-primary">AgriHub</h1>
          </div>

          {mode === "login" ? (
            <>
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight">
                  Selamat Datang Kembali
                </h2>
                <p className="text-muted-foreground">
                  Masuk ke akun Anda untuk melanjutkan
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn("h-11", errors.email && "border-destructive")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

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
                      className={cn("h-11 pr-10", errors.password && "border-destructive")}
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
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className={cn("w-full h-11 text-white font-medium", getButtonStyles())}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Masuk"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="px-1 text-primary"
                    onClick={() => setMode("register")}
                  >
                    Daftar Sekarang
                  </Button>
                </p>
              </form>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mb-2 -ml-2"
                  onClick={() => setMode("login")}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Kembali ke Login
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">
                  Daftar Akun Baru
                </h2>
                <p className="text-muted-foreground">
                  Isi data berikut untuk membuat akun
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label>Daftar sebagai</Label>
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
                          htmlFor={`register-${role.id}`}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-xl border-2 p-3 cursor-pointer transition-all",
                            isSelected
                              ? getRoleButtonStyles(role.id)
                              : "border-border hover:border-muted-foreground/50"
                          )}
                        >
                          <RadioGroupItem
                            value={role.id}
                            id={`register-${role.id}`}
                            className="sr-only"
                          />
                          <Icon className="h-5 w-5" />
                          <span className="text-xs font-medium">{role.label}</span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Nama lengkap sesuai KTP"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={cn("h-11", errors.fullName && "border-destructive")}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                {/* NIK */}
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK (16 digit)</Label>
                  <Input
                    id="nik"
                    type="text"
                    placeholder="3201234567890123"
                    value={nik}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setNik(value);
                    }}
                    maxLength={16}
                    className={cn("h-11", errors.nik && "border-destructive")}
                  />
                  {errors.nik && (
                    <p className="text-sm text-destructive">{errors.nik}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn("h-11", errors.email && "border-destructive")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn("h-11 pr-10", errors.password && "border-destructive")}
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
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn("h-11 pr-10", errors.confirmPassword && "border-destructive")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Business Name (role-specific) */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">{selectedRoleData?.businessLabel}</Label>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder={selectedRoleData?.businessPlaceholder}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className={cn("h-11", errors.businessName && "border-destructive")}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-destructive">{errors.businessName}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className={cn("w-full h-11 text-white font-medium mt-2", getButtonStyles())}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Sudah punya akun?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="px-1 text-primary"
                    onClick={() => setMode("login")}
                  >
                    Masuk
                  </Button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
