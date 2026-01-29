import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { topProducts, formatRupiah } from "@/data/mockData";

const penjualanBulanan = [
  { bulan: "Agu", penjualan: 125000000 },
  { bulan: "Sep", penjualan: 142000000 },
  { bulan: "Okt", penjualan: 138000000 },
  { bulan: "Nov", penjualan: 165000000 },
  { bulan: "Des", penjualan: 158000000 },
  { bulan: "Jan", penjualan: 156000000 },
];

const pesananBulanan = [
  { bulan: "Agu", pesanan: 45 },
  { bulan: "Sep", pesanan: 52 },
  { bulan: "Okt", pesanan: 48 },
  { bulan: "Nov", pesanan: 61 },
  { bulan: "Des", pesanan: 55 },
  { bulan: "Jan", pesanan: 42 },
];

const COLORS = ["hsl(38, 90%, 50%)", "hsl(38, 80%, 55%)", "hsl(38, 70%, 60%)", "hsl(38, 60%, 65%)", "hsl(38, 50%, 70%)"];

export default function LaporanMitraPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Penjualan"
        description="Analisis performa penjualan pakan"
        breadcrumbs={[
          { label: "Dashboard", href: "/mitra" },
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
            <CardTitle>Revenue Bulanan</CardTitle>
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
                  <Bar dataKey="penjualan" fill="hsl(var(--mitra))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jumlah Pesanan</CardTitle>
            <CardDescription>Total pesanan per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pesananBulanan}>
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
                  <Line
                    type="monotone"
                    dataKey="pesanan"
                    stroke="hsl(var(--mitra))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--mitra))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribusi Produk Terlaris</CardTitle>
            <CardDescription>Persentase penjualan berdasarkan produk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nama, percent }) => `${nama} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
