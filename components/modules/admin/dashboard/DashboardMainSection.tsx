"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardMainSection() {
  return (
    <Card className="min-h-screen flex-1 rounded-xl md:min-h-min">
      <CardHeader>
        <CardTitle>Aktivitas & Grafik</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Placeholder – nanti bisa diisi chart & list */}
        <div className="h-40 rounded-lg border border-dashed" />
        <div className="h-40 rounded-lg border border-dashed" />
      </CardContent>
    </Card>
  );
}
