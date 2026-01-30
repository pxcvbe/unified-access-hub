import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, { message: "Nama lengkap minimal 3 karakter" }).max(100, { message: "Nama lengkap maksimal 100 karakter" }),
  nik: z.string().length(16, { message: "NIK harus 16 digit" }).regex(/^\d+$/, { message: "NIK hanya boleh angka" }),
  email: z.string().trim().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
  confirmPassword: z.string().min(6, { message: "Konfirmasi password minimal 6 karakter" }),
  businessName: z.string().trim().min(2, { message: "Nama minimal 2 karakter" }).max(100, { message: "Nama maksimal 100 karakter" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
