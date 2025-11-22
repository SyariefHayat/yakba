"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  dummyProgramRegistrations,
  ProgramRegistration,
} from "@/constants/program-registrants";

export const description =
  "Grafik interaktif pendaftar program online & offline dari data dummy";

type DailyRegistrants = {
  date: string;
  online: number;
  offline: number;
};

const chartConfig = {
  registrants: {
    label: "Pendaftar",
  },
  offline: {
    label: "Offline",
    color: "var(--primary)",
  },
  online: {
    label: "Online",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// helper: ubah list pendaftar → data harian
function buildDailyRegistrants(
  registrations: ProgramRegistration[]
): DailyRegistrants[] {
  const map = new Map<string, { online: number; offline: number }>();

  registrations.forEach((reg) => {
    // pakai tanggal saja (tanpa jam)
    const dateKey = reg.date.slice(0, 10); // "YYYY-MM-DD"
    const current = map.get(dateKey) ?? { online: 0, offline: 0 };

    if (reg.programType === "online") {
      current.online += 1;
    } else {
      current.offline += 1;
    }

    map.set(dateKey, current);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, counts]) => ({
      date,
      online: counts.online,
      offline: counts.offline,
    }));
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  // bangun data harian dari dummy
  const dailyData = React.useMemo(
    () => buildDailyRegistrants(dummyProgramRegistrations),
    []
  );

  // tanggal referensi = tanggal terakhir di data
  const lastDateString =
    dailyData[dailyData.length - 1]?.date ??
    new Date().toISOString().slice(0, 10);
  const referenceDate = React.useMemo(
    () => new Date(lastDateString),
    [lastDateString]
  );

  const filteredData = React.useMemo(() => {
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return dailyData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= referenceDate;
    });
  }, [dailyData, referenceDate, timeRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendaftar Program</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total pendaftar online & offline berdasarkan data dummy
          </span>
          <span className="@[540px]/card:hidden">Rentang waktu dinamis</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => val && setTimeRange(val)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 bulan</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 hari</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 hari</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Pilih rentang waktu"
            >
              <SelectValue placeholder="3 bulan terakhir" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 bulan terakhir
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 hari terakhir
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 hari terakhir
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOffline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-offline)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-offline)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="online"
              name="Online"
              type="natural"
              fill="url(#fillOnline)"
              stroke="var(--color-online)"
              stackId="a"
            />
            <Area
              dataKey="offline"
              name="Offline"
              type="natural"
              fill="url(#fillOffline)"
              stroke="var(--color-offline)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
