// Mock Data untuk AgriHub

// ============ PETERNAK DATA ============
export const ternakData = [
  { id: "1", nama: "Sapi Perah A1", jenis: "Sapi Perah", umur: "3 tahun", status: "Sehat", produksiHarian: "15 L" },
  { id: "2", nama: "Sapi Perah A2", jenis: "Sapi Perah", umur: "2 tahun", status: "Sehat", produksiHarian: "12 L" },
  { id: "3", nama: "Sapi Perah A3", jenis: "Sapi Perah", umur: "4 tahun", status: "Periksa", produksiHarian: "8 L" },
  { id: "4", nama: "Sapi Perah A4", jenis: "Sapi Perah", umur: "2 tahun", status: "Sehat", produksiHarian: "14 L" },
  { id: "5", nama: "Sapi Perah A5", jenis: "Sapi Perah", umur: "3 tahun", status: "Sehat", produksiHarian: "13 L" },
  { id: "6", nama: "Kambing B1", jenis: "Kambing Etawa", umur: "1 tahun", status: "Sehat", produksiHarian: "2 L" },
  { id: "7", nama: "Kambing B2", jenis: "Kambing Etawa", umur: "2 tahun", status: "Sehat", produksiHarian: "2.5 L" },
];

export const produksiMingguan = [
  { hari: "Sen", susu: 85, telur: 0 },
  { hari: "Sel", susu: 92, telur: 0 },
  { hari: "Rab", susu: 88, telur: 0 },
  { hari: "Kam", susu: 95, telur: 0 },
  { hari: "Jum", susu: 90, telur: 0 },
  { hari: "Sab", susu: 87, telur: 0 },
  { hari: "Min", susu: 82, telur: 0 },
];

export const stokPakanPeternak = [
  { id: "1", nama: "Konsentrat Sapi", jumlah: 250, satuan: "kg", minStok: 100 },
  { id: "2", nama: "Rumput Gajah", jumlah: 500, satuan: "kg", minStok: 200 },
  { id: "3", nama: "Dedak Padi", jumlah: 80, satuan: "kg", minStok: 50 },
  { id: "4", nama: "Mineral Mix", jumlah: 15, satuan: "kg", minStok: 10 },
];

export const transaksiPeternak = [
  { id: "1", tanggal: "2025-01-28", jenis: "Penjualan", item: "Susu Segar", jumlah: 100, satuan: "L", total: 1500000 },
  { id: "2", tanggal: "2025-01-27", jenis: "Pembelian", item: "Konsentrat Sapi", jumlah: 100, satuan: "kg", total: -750000 },
  { id: "3", tanggal: "2025-01-26", jenis: "Penjualan", item: "Susu Segar", jumlah: 95, satuan: "L", total: 1425000 },
  { id: "4", tanggal: "2025-01-25", jenis: "Pembelian", item: "Rumput Gajah", jumlah: 200, satuan: "kg", total: -400000 },
  { id: "5", tanggal: "2025-01-24", jenis: "Penjualan", item: "Susu Segar", jumlah: 88, satuan: "L", total: 1320000 },
];

export const notifikasiPeternak = [
  { id: "1", judul: "Jadwal Vaksin", pesan: "Vaksinasi sapi A3 besok pukul 09:00", waktu: "1 jam lalu", dibaca: false },
  { id: "2", judul: "Stok Pakan Rendah", pesan: "Stok Dedak Padi hampir habis", waktu: "3 jam lalu", dibaca: false },
  { id: "3", judul: "Pesanan Dikirim", pesan: "Pesanan konsentrat dalam perjalanan", waktu: "1 hari lalu", dibaca: true },
];

// ============ AGENT DATA ============
export const penjualanBulanan = [
  { bulan: "Agu", penjualan: 45000000, target: 50000000 },
  { bulan: "Sep", penjualan: 52000000, target: 50000000 },
  { bulan: "Okt", penjualan: 48000000, target: 55000000 },
  { bulan: "Nov", penjualan: 61000000, target: 55000000 },
  { bulan: "Des", penjualan: 58000000, target: 60000000 },
  { bulan: "Jan", penjualan: 42000000, target: 60000000 },
];

export const peternakBinaan = [
  { id: "1", nama: "Budi Santoso", lokasi: "Malang", ternak: 25, status: "Aktif", lastOrder: "2025-01-28" },
  { id: "2", nama: "Siti Rahayu", lokasi: "Pasuruan", ternak: 15, status: "Aktif", lastOrder: "2025-01-27" },
  { id: "3", nama: "Agus Prayitno", lokasi: "Blitar", ternak: 40, status: "Aktif", lastOrder: "2025-01-25" },
  { id: "4", nama: "Dewi Lestari", lokasi: "Kediri", ternak: 12, status: "Tidak Aktif", lastOrder: "2025-01-10" },
  { id: "5", nama: "Hendra Wijaya", lokasi: "Jombang", ternak: 30, status: "Aktif", lastOrder: "2025-01-26" },
];

export const pesananAgent = [
  { id: "ORD001", peternak: "Budi Santoso", produk: "Konsentrat Premium", qty: 500, total: 3750000, status: "Proses", tanggal: "2025-01-28" },
  { id: "ORD002", peternak: "Siti Rahayu", produk: "Mineral Mix", qty: 50, total: 750000, status: "Dikirim", tanggal: "2025-01-27" },
  { id: "ORD003", peternak: "Agus Prayitno", produk: "Konsentrat Sapi", qty: 1000, total: 7000000, status: "Selesai", tanggal: "2025-01-26" },
  { id: "ORD004", peternak: "Hendra Wijaya", produk: "Dedak Halus", qty: 300, total: 900000, status: "Proses", tanggal: "2025-01-28" },
];

// ============ MITRA PAKAN DATA ============
export const inventoryPakan = [
  { id: "1", nama: "Konsentrat Premium", kategori: "Konsentrat", stok: 5000, satuan: "kg", harga: 7500, minStok: 1000 },
  { id: "2", nama: "Konsentrat Sapi", kategori: "Konsentrat", stok: 8000, satuan: "kg", harga: 7000, minStok: 2000 },
  { id: "3", nama: "Mineral Mix", kategori: "Suplemen", stok: 500, satuan: "kg", harga: 15000, minStok: 100 },
  { id: "4", nama: "Dedak Halus", kategori: "Dedak", stok: 3000, satuan: "kg", harga: 3000, minStok: 500 },
  { id: "5", nama: "Vitamin Ternak", kategori: "Suplemen", stok: 200, satuan: "botol", harga: 25000, minStok: 50 },
  { id: "6", nama: "Rumput Fermentasi", kategori: "Hijauan", stok: 10000, satuan: "kg", harga: 2000, minStok: 3000 },
];

export const topProducts = [
  { nama: "Konsentrat Premium", value: 35 },
  { nama: "Konsentrat Sapi", value: 28 },
  { nama: "Dedak Halus", value: 18 },
  { nama: "Mineral Mix", value: 12 },
  { nama: "Lainnya", value: 7 },
];

export const pesananMitra = [
  { id: "PO001", agent: "Ahmad Wijaya", peternak: "Budi Santoso", produk: "Konsentrat Premium", qty: 500, total: 3750000, status: "Pending", tanggal: "2025-01-28" },
  { id: "PO002", agent: "Ahmad Wijaya", peternak: "Siti Rahayu", produk: "Mineral Mix", qty: 50, total: 750000, status: "Diproses", tanggal: "2025-01-27" },
  { id: "PO003", agent: "Rina Susanti", peternak: "Agus Prayitno", produk: "Konsentrat Sapi", qty: 1000, total: 7000000, status: "Dikirim", tanggal: "2025-01-26" },
  { id: "PO004", agent: "Ahmad Wijaya", peternak: "Hendra Wijaya", produk: "Dedak Halus", qty: 300, total: 900000, status: "Pending", tanggal: "2025-01-28" },
  { id: "PO005", agent: "Rina Susanti", peternak: "Dewi Lestari", produk: "Vitamin Ternak", qty: 20, total: 500000, status: "Selesai", tanggal: "2025-01-25" },
];

export const daftarMitra = [
  { id: "1", nama: "Ahmad Wijaya", tipe: "Agent", lokasi: "Surabaya", transaksi: 45, totalNilai: 156000000, status: "Aktif" },
  { id: "2", nama: "Rina Susanti", tipe: "Agent", lokasi: "Malang", transaksi: 32, totalNilai: 98000000, status: "Aktif" },
  { id: "3", nama: "Budi Santoso", tipe: "Peternak", lokasi: "Malang", transaksi: 12, totalNilai: 24000000, status: "Aktif" },
  { id: "4", nama: "Koperasi Tani Makmur", tipe: "Koperasi", lokasi: "Pasuruan", transaksi: 28, totalNilai: 82000000, status: "Aktif" },
];

// ============ STATISTIK DASHBOARD ============
export const statsPeternak = {
  totalTernak: 7,
  produksiHariIni: "66.5 L",
  pendapatanBulan: "Rp 42.500.000",
  stokPakan: "845 kg",
};

export const statsAgent = {
  totalPenjualan: "Rp 42.000.000",
  komisiBulan: "Rp 2.100.000",
  targetBulan: "70%",
  jumlahPeternak: 5,
};

export const statsMitra = {
  totalProduk: 6,
  pesananPending: 2,
  revenueBulan: "Rp 156.000.000",
  mitraAktif: 4,
};

// Format currency helper
export const formatRupiah = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};
