
# Rencana Perbaikan Error RLS dan Format Pendaftaran

## Masalah yang Ditemukan

Error `new row violates row-level security policy for table "profiles"` terjadi karena:

1. Ketika user mendaftar dengan email confirmation **enabled**, session belum aktif
2. RLS policy menggunakan `auth.uid() = user_id` untuk INSERT, tapi `auth.uid()` masih null karena user belum terverifikasi
3. Insert profile/role dilakukan dari client-side yang tidak punya akses

---

## Solusi: Database Trigger dengan Security Definer

Menggunakan **database trigger** yang berjalan dengan **SECURITY DEFINER** untuk membuat profile dan role secara otomatis.

### Alur Baru:
1. User mengisi form pendaftaran
2. Data tambahan (fullName, nik, businessName, role) disimpan di `user_metadata` saat signup
3. Trigger `handle_new_user` otomatis membuat profile dan role dari metadata
4. RLS policy tidak perlu diubah karena trigger menggunakan SECURITY DEFINER

---

## Langkah Implementasi

### 1. Migration Database Baru

Membuat trigger yang berjalan saat ada user baru di `auth.users`:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile from user metadata
    INSERT INTO public.profiles (user_id, full_name, nik, business_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'nik', ''),
        COALESCE(NEW.raw_user_meta_data->>'business_name', '')
    );
    
    -- Create user role from metadata
    INSERT INTO public.user_roles (user_id, role)
    VALUES (
        NEW.id,
        (NEW.raw_user_meta_data->>'role')::app_role
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 2. Update useAuth.ts

Mengubah `signUp` untuk menyimpan data di `user_metadata`:

```typescript
const signUp = async (...) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        full_name: fullName,
        nik: nik,
        business_name: businessName,
        role: userRole,
      },
    },
  });
  
  // Tidak perlu insert manual lagi - trigger yang handle
  return { error };
};
```

---

## Format Pendaftaran

Sesuai permintaan, berikut format pendaftaran yang sudah diimplementasi:

| Field | Deskripsi | Validasi |
|-------|-----------|----------|
| **Nama Lengkap** | Nama sesuai KTP | Min 3 karakter, max 100 |
| **NIK** | Nomor Induk Kependudukan | Harus 16 digit angka |
| **Email** | Alamat email | Format email valid |
| **Password** | Kata sandi | Minimal 6 karakter |
| **Konfirmasi Password** | Ulangi password | Harus sama dengan password |
| **Nama Kandang/Toko/Perusahaan** | Sesuai role yang dipilih | Min 2 karakter, max 100 |

**Role yang tersedia:**
- **Peternak**: Meminta "Nama Kandang"
- **Agent**: Meminta "Nama Toko"  
- **Mitra Pakan**: Meminta "Nama Perusahaan"

---

## File yang Akan Diubah

1. **Baru**: `supabase/migrations/[timestamp]_fix_signup_trigger.sql` - Trigger untuk handle signup
2. **Update**: `src/hooks/useAuth.ts` - Simpan data di user_metadata, hapus insert manual

---

## Keuntungan Solusi Ini

- User bisa mendaftar meskipun email confirmation **enabled**
- Data profile dan role dibuat secara atomik oleh database
- Tidak ada race condition antara signup dan insert
- RLS policies tetap aman karena trigger menggunakan SECURITY DEFINER
