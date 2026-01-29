
# Rencana Implementasi AgriHub

## Ringkasan
Membangun platform agrikultur **AgriHub** dengan tampilan split-screen login dan 3 dashboard untuk Peternak, Agent, dan Mitra Pakan. Semua UI dalam Bahasa Indonesia dengan desain gradien hijau/alam seperti referensi SATU PINTU.

---

## Fase 1: Setup Design System & Theme

### Update Warna (src/index.css)
Menambahkan custom CSS variables untuk tema hijau agrikultur:
- Primary: Hijau tua (forest green)
- Accent: Hijau muda (lime green)
- Warna khusus untuk setiap role:
  - Peternak: Hijau (green)
  - Agent: Biru (blue)
  - Mitra Pakan: Kuning/Oranye (amber)

---

## Fase 2: Halaman Login (Split-Screen)

### Membuat src/pages/Login.tsx
**Sisi Kiri (50%):**
- Background gradien hijau dengan overlay
- Logo AgriHub besar
- Tagline: "Ekosistem Pertanian Terintegrasi"
- Ilustrasi/gambar pertanian

**Sisi Kanan (50%):**
- Form login dengan:
  - Pilihan role (RadioGroup): Peternak, Agent, Mitra Pakan
  - Input email
  - Input password
  - Tombol login (warna berubah sesuai role)
  - Link "Lupa Password?" dan "Daftar Akun"

**Responsif Mobile:**
- Full-width form dengan background gradien

---

## Fase 3: Layout Dashboard

### Membuat src/components/DashboardLayout.tsx
- Menggunakan SidebarProvider dari Shadcn
- Header dengan nama user, notifikasi, tombol logout
- Sidebar navigasi dengan ikon dan label Bahasa Indonesia
- Main content area
- Responsif: hamburger menu untuk mobile

### Membuat src/components/AppSidebar.tsx
Menu navigasi berbeda untuk setiap role:

**Peternak:**
- Beranda
- Ternak Saya
- Produksi
- Stok Pakan
- Transaksi

**Agent:**
- Beranda
- Penjualan
- Peternak Binaan
- Pesanan
- Laporan

**Mitra Pakan:**
- Beranda
- Inventory
- Pesanan Masuk
- Mitra
- Laporan

---

## Fase 4: Dashboard Peternak

### Membuat src/pages/peternak/Dashboard.tsx
**Komponen:**
- **StatCards**: Total ternak, produksi hari ini, pendapatan estimasi, stok pakan
- **Grafik Produksi**: Line chart produksi mingguan (Recharts)
- **Tabel Ternak**: Daftar ternak dengan status kesehatan
- **Notifikasi**: Reminder pakan, jadwal vaksin

### Halaman Tambahan:
- `/peternak/ternak` - Manajemen ternak
- `/peternak/produksi` - Data produksi
- `/peternak/pakan` - Stok pakan
- `/peternak/transaksi` - Riwayat transaksi

---

## Fase 5: Dashboard Agent

### Membuat src/pages/agent/Dashboard.tsx
**Komponen:**
- **StatCards**: Total penjualan, komisi bulan ini, target, jumlah peternak
- **Grafik Kinerja**: Bar chart penjualan bulanan
- **Tabel Pesanan**: Pesanan terbaru dengan status
- **List Peternak**: Top 5 peternak aktif

### Halaman Tambahan:
- `/agent/penjualan` - Laporan penjualan
- `/agent/peternak` - Daftar peternak binaan
- `/agent/pesanan` - Manajemen pesanan
- `/agent/laporan` - Laporan kinerja

---

## Fase 6: Dashboard Mitra Pakan

### Membuat src/pages/mitra/Dashboard.tsx
**Komponen:**
- **StatCards**: Total produk, pesanan pending, revenue bulan ini, mitra aktif
- **Grafik Penjualan**: Pie chart top products
- **Tabel Inventory**: Stok produk dengan harga
- **Pesanan Terbaru**: List pesanan masuk

### Halaman Tambahan:
- `/mitra/inventory` - Manajemen inventory
- `/mitra/pesanan` - Pesanan masuk
- `/mitra/daftar-mitra` - Koneksi dengan agent/farmer
- `/mitra/laporan` - Laporan penjualan

---

## Fase 7: Komponen Shared

### Membuat komponen reusable:
```text
src/components/
  StatCard.tsx        - Card untuk statistik dengan ikon
  DataTable.tsx       - Tabel data dengan sorting
  ChartCard.tsx       - Wrapper untuk grafik Recharts
  PageHeader.tsx      - Header halaman dengan breadcrumb
  NotificationBell.tsx - Dropdown notifikasi
  UserMenu.tsx        - Dropdown user profile
```

---

## Fase 8: Routing

### Update src/App.tsx
```text
Routes:
  /                    -> Redirect ke /login
  /login               -> Halaman Login
  /peternak            -> Dashboard Peternak
  /peternak/*          -> Halaman-halaman Peternak
  /agent               -> Dashboard Agent
  /agent/*             -> Halaman-halaman Agent
  /mitra               -> Dashboard Mitra Pakan
  /mitra/*             -> Halaman-halaman Mitra
```

---

## Fase 9: Mock Data

### Membuat src/data/mockData.ts
Data dummy untuk:
- Daftar ternak
- Data produksi (untuk grafik)
- Daftar pesanan
- Inventory pakan
- Statistik dashboard

---

## Struktur File yang Akan Dibuat

```text
src/
  components/
    AppSidebar.tsx
    DashboardLayout.tsx
    StatCard.tsx
    PageHeader.tsx
    UserMenu.tsx
    NotificationBell.tsx
  pages/
    Login.tsx
    peternak/
      Dashboard.tsx
      Ternak.tsx
      Produksi.tsx
      Pakan.tsx
      Transaksi.tsx
    agent/
      Dashboard.tsx
      Penjualan.tsx
      PeternakBinaan.tsx
      Pesanan.tsx
      Laporan.tsx
    mitra/
      Dashboard.tsx
      Inventory.tsx
      PesananMasuk.tsx
      DaftarMitra.tsx
      Laporan.tsx
  data/
    mockData.ts
  hooks/
    useAuth.ts (simple context untuk role management)
```

---

## Detail Teknis

### Dependencies yang Digunakan (sudah terinstall):
- **react-router-dom**: Routing
- **recharts**: Grafik dan visualisasi data
- **lucide-react**: Ikon
- **Shadcn UI**: Komponen UI (Sidebar, Card, Table, Button, dll)

### Estimasi Langkah Implementasi:
1. Update theme/warna di index.css
2. Buat halaman Login dengan split-screen design
3. Buat DashboardLayout dan AppSidebar
4. Buat komponen shared (StatCard, PageHeader, dll)
5. Buat mock data
6. Buat Dashboard Peternak dengan semua halaman
7. Buat Dashboard Agent dengan semua halaman
8. Buat Dashboard Mitra dengan semua halaman
9. Update App.tsx dengan semua routes
10. Testing responsivitas

