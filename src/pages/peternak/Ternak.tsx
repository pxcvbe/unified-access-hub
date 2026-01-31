import { Plus, Bird, HeartPulse, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { KandangCard } from "@/components/peternak/KandangCard";
import { StatCardLarge } from "@/components/peternak/StatCardLarge";
import { kandangData, statistikTernak } from "@/data/mockDataTernak";

export default function TernakPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hewan Ternak"
        description="Kelola data kandang dan populasi ternak Anda"
        breadcrumbs={[
          { label: "Dashboard", href: "/peternak" },
          { label: "Hewan Ternak" },
        ]}
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCardLarge
          label="Total Populasi"
          value={statistikTernak.totalPopulasi}
          unit="ekor"
          icon={Bird}
          iconColor="text-peternak"
          iconBgColor="bg-peternak/10"
        />
        <StatCardLarge
          label="Ayam Sakit / Karantina"
          value={statistikTernak.ayamSakitKarantina}
          unit="ekor"
          icon={HeartPulse}
          iconColor="text-destructive"
          iconBgColor="bg-destructive/10"
        />
        <StatCardLarge
          label="Mortality Rate"
          value={`${statistikTernak.mortalityRate}%`}
          icon={TrendingDown}
          iconColor="text-peternak"
          iconBgColor="bg-peternak/10"
          description="Global (Semua Kandang)"
        />
      </div>

      {/* Kandang List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Daftar Kandang (Coop)</h2>
          <Button className="gradient-peternak text-white">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Populasi Baru
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kandangData.map((kandang) => (
            <KandangCard
              key={kandang.id}
              id={kandang.id}
              nama={kandang.nama}
              jenis={kandang.jenis}
              umur={kandang.umur}
              populasi={kandang.populasi}
              kapasitas={kandang.kapasitas}
              status={kandang.status}
              onLaporMati={() => console.log("Lapor mati:", kandang.id)}
              onUbahStatus={() => console.log("Ubah status:", kandang.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
