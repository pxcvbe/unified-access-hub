import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { penjualanBulanan, formatRupiah } from "@/data/mockData";

const penjualanMingguan = [
  { hari: "Sen", penjualan: 8500000 },
  { hari: "Sel", penjualan: 12000000 },
  { hari: "Rab", penjualan: 9500000 },
  { hari: "Kam", penjualan: 11000000 },
  { hari: "Jum", penjualan: 15000000 },
  { hari: "Sab", penjualan: 7500000 },
  { hari: "Min", penjualan: 5000000 },
];

export default function PenjualanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Penjualan"
        description="Analisis performa penjualan Anda"
        breadcrumbs={[
          { label: "Dashboard", href: "/agent" },
          { label: "Penjualan" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Penjualan Mingguan</CardTitle>
            <CardDescription>Total penjualan per hari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={penjualanMingguan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hari" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000000}jt`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatRupiah(value)}
                  />
                  <Line
                    type="monotone"
                    dataKey="penjualan"
                    stroke="hsl(var(--agent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--agent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penjualan Bulanan</CardTitle>
            <CardDescription>Perbandingan dengan target</CardDescription>
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
      </div>
    </div>
  );
}
