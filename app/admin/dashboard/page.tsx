import { TrendingDown, TrendingUp } from "lucide-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { dummyLeads } from "@/constants/leads";
import { dummyEvents } from "@/constants/events";
import { dummyTentors } from "@/constants/tentors";
import { dummyArticles } from "@/constants/articles";
import { dashboardSummary } from "@/constants/dashboard-summary";
import { ChartAreaInteractive } from "@/components/modules/admin/dashboard/ChartAreaInteractive";
import { ChartBarInteractive } from "@/components/modules/admin/dashboard/ChartBarAreaInteractive";

type TrendResult = {
  direction: "up" | "down";
  percent: string;
};

function getTrend(current: number, previous: number): TrendResult {
  if (previous === 0) {
    return { direction: "up", percent: "100.0" };
  }

  const diff = current - previous;
  const percent = Math.abs((diff / previous) * 100);
  const direction: "up" | "down" = diff >= 0 ? "up" : "down";

  return {
    direction,
    percent: percent.toFixed(1),
  };
}

export default function Page() {
  const activeTentors = dummyTentors.length;
  const totalArticles = dummyArticles.length;
  const totalLeads = dummyLeads.length;
  const activeEvents = dummyEvents.filter((e) => e.status === "ongoing").length;

  const { tentors, leads, articles, events } = dashboardSummary;

  const tentorTrend = getTrend(tentors.current, tentors.previous);
  const leadsTrend = getTrend(leads.current, leads.previous);
  const articleTrend = getTrend(articles.current, articles.previous);
  const eventTrend = getTrend(events.current, events.previous);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription className="text-sm font-medium">
              Tentor Aktif
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
              {activeTentors}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                {tentorTrend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {tentorTrend.direction === "up" ? "+" : "-"}
                {tentorTrend.percent}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">Tentor aktif hari ini</div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-sm font-medium">
              Total Leads
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
              {totalLeads}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                {leadsTrend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {leadsTrend.direction === "up" ? "+" : "-"}
                {leadsTrend.percent}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">Pesan masuk</div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-sm font-medium">
              Total Article
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
              {totalArticles}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                {articleTrend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {articleTrend.direction === "up" ? "+" : "-"}
                {articleTrend.percent}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Artikel yang dipublikasikan
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-sm font-medium">
              Event Aktif
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
              {activeEvents}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                {eventTrend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {eventTrend.direction === "up" ? "+" : "-"}
                {eventTrend.percent}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Event yang sedang berlangsung
            </div>
          </CardFooter>
        </Card>
      </div>

      <div>
        <ChartAreaInteractive />
      </div>

      <div>
        <ChartBarInteractive />
      </div>
    </div>
  );
}
