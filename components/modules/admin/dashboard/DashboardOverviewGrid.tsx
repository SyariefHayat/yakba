"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardOverviewGrid() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <Card className="aspect-video rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Total Pendaftar Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">120</p>
          <p className="text-xs text-muted-foreground">
            +15 dibanding minggu lalu
          </p>
        </CardContent>
      </Card>

      <Card className="aspect-video rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Lead / Pesan Masuk
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">34</p>
          <p className="text-xs text-muted-foreground">8 belum ditangani</p>
        </CardContent>
      </Card>

      <Card className="aspect-video rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Penjualan Produk Digital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">Rp 2,4 jt</p>
          <p className="text-xs text-muted-foreground">Bulan ini</p>
        </CardContent>
      </Card>
    </div>
  );
}
