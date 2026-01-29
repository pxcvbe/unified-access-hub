import { Plus, Search, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { peternakBinaan } from "@/data/mockData";

export default function PeternakBinaanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Peternak Binaan"
        description="Kelola daftar peternak yang Anda bina"
        breadcrumbs={[
          { label: "Dashboard", href: "/agent" },
          { label: "Peternak Binaan" },
        ]}
        actions={
          <Button className="gradient-agent text-white">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Peternak
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Peternak</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari peternak..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Jumlah Ternak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Terakhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peternakBinaan.map((peternak) => (
                <TableRow key={peternak.id}>
                  <TableCell className="font-medium">{peternak.nama}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {peternak.lokasi}
                    </div>
                  </TableCell>
                  <TableCell>{peternak.ternak} ekor</TableCell>
                  <TableCell>
                    <Badge
                      variant={peternak.status === "Aktif" ? "default" : "secondary"}
                      className={
                        peternak.status === "Aktif"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : ""
                      }
                    >
                      {peternak.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{peternak.lastOrder}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
