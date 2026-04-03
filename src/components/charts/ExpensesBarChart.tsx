import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatExpensesDataForBarChart } from "@/utils/expensesUtils";
import type { ExpenseChartType } from "@/types";

const chartConfig = {
  amount: {
    label: "Expense",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const ExpensesBarChart = ({ expenses }: { expenses: ExpenseChartType[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-20 w-full">
          <BarChart
            accessibilityLayer
            data={formatExpensesDataForBarChart(expenses)}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-center">
        <div className="leading-none text-gray-400">
          Showing total of {expenses.length} Expenses
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExpensesBarChart;
