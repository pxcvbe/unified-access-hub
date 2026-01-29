import { Plus, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { stokPakanPeternak } from "@/data/mockData";

export default function PakanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Stok Pakan"
        description="Kelola persediaan pakan ternak"
        breadcrumbs={[
          { label: "Dashboard", href: "/peternak" },
          { label: "Stok Pakan" },
        ]}
        actions={
          <Button className="gradient-peternak text-white">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Stok
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stokPakanPeternak.map((pakan) => {
          const percentage = (pakan.jumlah / (pakan.minStok * 3)) * 100;
          const isLow = pakan.jumlah < pakan.minStok * 1.5;

          return (
            <Card key={pakan.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {pakan.nama}
                  {isLow && (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {pakan.jumlah} {pakan.satuan}
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={isLow ? "[&>div]:bg-amber-500" : "[&>div]:bg-peternak"}
                  />
                  <p className="text-xs text-muted-foreground">
                    Min. stok: {pakan.minStok} {pakan.satuan}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Stok Pakan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Pakan</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead>Min. Stok</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stokPakanPeternak.map((pakan) => {
                const isLow = pakan.jumlah < pakan.minStok * 1.5;
                return (
                  <TableRow key={pakan.id}>
                    <TableCell className="font-medium">{pakan.nama}</TableCell>
                    <TableCell>{pakan.jumlah}</TableCell>
                    <TableCell>{pakan.satuan}</TableCell>
                    <TableCell>{pakan.minStok}</TableCell>
                    <TableCell>
                      <Badge
                        variant={isLow ? "destructive" : "default"}
                        className={!isLow ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                      >
                        {isLow ? "Stok Rendah" : "Aman"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
