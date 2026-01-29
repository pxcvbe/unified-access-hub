import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { penjualanBulanan, formatRupiah } from "@/data/mockData";

const kinerjaBulanan = [
  { bulan: "Agu", pesanan: 28, peternak: 4 },
  { bulan: "Sep", pesanan: 35, peternak: 5 },
  { bulan: "Okt", pesanan: 32, peternak: 5 },
  { bulan: "Nov", pesanan: 42, peternak: 5 },
  { bulan: "Des", pesanan: 38, peternak: 5 },
  { bulan: "Jan", pesanan: 25, peternak: 5 },
];

const distribusiProduk = [
  { nama: "Konsentrat Premium", value: 40 },
  { nama: "Konsentrat Sapi", value: 30 },
  { nama: "Mineral Mix", value: 15 },
  { nama: "Lainnya", value: 15 },
];

const COLORS = ["hsl(210, 70%, 45%)", "hsl(210, 60%, 55%)", "hsl(210, 50%, 65%)", "hsl(210, 40%, 75%)"];

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Kinerja"
        description="Analisis performa Anda sebagai agent"
        breadcrumbs={[
          { label: "Dashboard", href: "/agent" },
          { label: "Laporan" },
        ]}
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Penjualan Bulanan</CardTitle>
            <CardDescription>Total penjualan 6 bulan terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={penjualanBulanan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="bulan" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000000}jt`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatRupiah(value)}
                  />
                  <Bar dataKey="penjualan" fill="hsl(var(--agent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Produk</CardTitle>
            <CardDescription>Produk terlaris berdasarkan volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribusiProduk}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nama, percent }) => `${nama} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distribusiProduk.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kinerja Bulanan</CardTitle>
            <CardDescription>Jumlah pesanan dan peternak aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kinerjaBulanan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="bulan" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="pesanan" name="Pesanan" fill="hsl(var(--agent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="peternak" name="Peternak Aktif" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
