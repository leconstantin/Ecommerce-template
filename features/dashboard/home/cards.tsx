import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Orders",
    value: "100",
    trend: "+12.5%",
    trendIcon: TrendingUpIcon,
    trendType: "up",
    summary: "Orders up",
    note: "The amount of orders placed",
  },
  {
    title: "Total Customers",
    value: "5",
    trend: "-20%",
    trendIcon: TrendingDownIcon,
    trendType: "down",
    summary: "Fewer customers",
    note: "Number of services booked",
  },
  {
    title: "Total Revenue",
    value: "18",
    trend: "+12.5%",
    trendIcon: TrendingUpIcon,
    trendType: "up",
    summary: "Revenue rising",
    note: "Includes all orders placed",
  },
  {
    title: "Total Items",
    value: "20",
    trend: "+4.5%",
    trendIcon: TrendingUpIcon,
    trendType: "up",
    summary: "More items",
    note: "Number of items in the menu",
  },
];

export function SectionCards() {
  return (
    <div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-background">
      {stats.map((item) => {
        const Icon = item.trendIcon;
        return (
          <Card className="@container/card" key={item.title}>
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
                {item.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Icon />
                  {item.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {item.summary} <Icon className="size-4" />
              </div>
              <div className="text-muted-foreground">{item.note}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
