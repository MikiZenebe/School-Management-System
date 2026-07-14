"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Ellipsis } from "lucide-react";

const chartData = [
  { day: "Mon", present: 60, absent: 40 },
  { day: "Tue", present: 70, absent: 60 },
  { day: "Wed", present: 90, absent: 75 },
  { day: "Thu", present: 90, absent: 75 },
  { day: "Fri", present: 65, absent: 55 },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "var(--primary)",
  },
  absent: {
    label: "Absent",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

export default function AttendanceChart() {
  return (
    <Card className="bg-white rounded-xl w-full h-full border-none shadow-none flex flex-col p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-4 p-0">
        <div>
          <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
          <CardDescription>Monday - Friday</CardDescription>
        </div>
        <Ellipsis />
      </CardHeader>
      <CardContent className="flex-1 p-0 mt-4">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#ddd"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="present"
              fill="var(--color-present)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="absent"
              fill="var(--color-absent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
