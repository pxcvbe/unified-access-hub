// Mock Data untuk Halaman Ternak Peternak

export interface Kandang {
  id: string;
  nama: string;
  jenis: string;
  umur: string;
  populasi: number;
  kapasitas: number;
  status: "Sehat" | "Sakit" | "Periksa";
}

export const kandangData: Kandang[] = [
  { 
    id: "A1", 
    nama: "Kandang A1", 
    jenis: "Isa Brown (Layer)", 
    umur: "24 Minggu", 
    populasi: 985, 
    kapasitas: 1000, 
    status: "Sehat" 
  },
  { 
    id: "B2", 
    nama: "Kandang B2", 
    jenis: "Lohmann Brown", 
    umur: "12 Minggu", 
    populasi: 1150, 
    kapasitas: 1200, 
    status: "Sakit" 
  },
  { 
    id: "C1", 
    nama: "Kandang C1", 
    jenis: "Pullet Platinum", 
    umur: "4 Minggu", 
    populasi: 1998, 
    kapasitas: 2000, 
    status: "Sehat" 
  },
  { 
    id: "D1", 
    nama: "Kandang D1", 
    jenis: "Hy-Line Brown", 
    umur: "18 Minggu", 
    populasi: 850, 
    kapasitas: 900, 
    status: "Periksa" 
  },
];

export const statistikTernak = {
  totalPopulasi: 4133,
  ayamSakitKarantina: 1150,
  mortalityRate: 1.60,
};
