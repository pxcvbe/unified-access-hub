import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { produksiMingguan } from "@/data/mockData";

const produksiBulanan = [
  { bulan: "Agu", susu: 2450 },
  { bulan: "Sep", susu: 2680 },
  { bulan: "Okt", susu: 2520 },
  { bulan: "Nov", susu: 2890 },
  { bulan: "Des", susu: 2750 },
  { bulan: "Jan", susu: 2100 },
];

export default function ProduksiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Produksi"
        description="Pantau produksi ternak Anda"
        breadcrumbs={[
          { label: "Dashboard", href: "/peternak" },
          { label: "Produksi" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produksi Mingguan</CardTitle>
            <CardDescription>Produksi susu harian dalam liter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={produksiMingguan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hari" className="text-xs" />
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
                    dataKey="susu"
                    stroke="hsl(var(--peternak))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--peternak))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produksi Bulanan</CardTitle>
            <CardDescription>Total produksi susu per bulan dalam liter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={produksiBulanan}>
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
                  <Bar dataKey="susu" fill="hsl(var(--peternak))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
