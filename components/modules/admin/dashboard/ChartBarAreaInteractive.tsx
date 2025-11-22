"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dummyProducts } from "@/constants/products";

export const description = "Grafik interaktif produk terjual & pendapatan";

type ProductChartData = {
  name: string;
  units: number;
  revenue: number;
};

const chartConfig = {
  units: {
    label: "Jumlah Terjual",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Pendapatan (Rp)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("units");

  const chartData: ProductChartData[] = React.useMemo(
    () =>
      dummyProducts.map((product) => ({
        name: product.name,
        units: product.sold,
        revenue: product.sold * product.price,
      })),
    []
  );

  const total = React.useMemo(
    () => ({
      units: chartData.reduce((acc, curr) => acc + curr.units, 0),
      revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
    }),
    [chartData]
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Produk Digital</CardTitle>
          <CardDescription>
            Ringkasan performa penjualan produk di website
          </CardDescription>
        </div>
        <div className="flex">
          {(["units", "revenue"] as (keyof typeof chartConfig)[]).map(
            (chart) => (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {chart === "units"
                    ? total.units.toLocaleString("id-ID")
                    : formatRupiah(total.revenue)}
                </span>
              </button>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) =>
                String(value).length > 18
                  ? String(value).slice(0, 18) + "..."
                  : String(value)
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[220px]"
                  labelFormatter={(value) => String(value)}
                  formatter={(value) =>
                    activeChart === "units"
                      ? `${Number(value).toLocaleString("id-ID")} unit`
                      : formatRupiah(Number(value))
                  }
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
