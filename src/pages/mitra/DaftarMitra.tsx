import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { daftarMitra, formatRupiah } from "@/data/mockData";

export default function DaftarMitraPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Daftar Mitra"
        description="Kelola hubungan dengan agent dan peternak"
        breadcrumbs={[
          { label: "Dashboard", href: "/mitra" },
          { label: "Daftar Mitra" },
        ]}
        actions={
          <Button className="gradient-mitra text-mitra-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Mitra
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Mitra Terdaftar</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari mitra..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Transaksi</TableHead>
                <TableHead>Total Nilai</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daftarMitra.map((mitra) => (
                <TableRow key={mitra.id}>
                  <TableCell className="font-medium">{mitra.nama}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        mitra.tipe === "Agent"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : mitra.tipe === "Peternak"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-purple-50 text-purple-700 border-purple-200"
                      }
                    >
                      {mitra.tipe}
                    </Badge>
                  </TableCell>
                  <TableCell>{mitra.lokasi}</TableCell>
                  <TableCell>{mitra.transaksi} kali</TableCell>
                  <TableCell>{formatRupiah(mitra.totalNilai)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={mitra.status === "Aktif" ? "default" : "secondary"}
                      className={
                        mitra.status === "Aktif"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : ""
                      }
                    >
                      {mitra.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
