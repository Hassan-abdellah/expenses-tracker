import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ExpenseChartType } from "@/types";

const TotalExpensesCard = ({ expenses }: { expenses: ExpenseChartType[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>January - December 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <span>Total Expenses:</span>
        <span>
          {expenses
            .reduce((sum, expense) => sum + expense.amount, 0)
            .toLocaleString("en-US")}{" "}
          E£
        </span>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total of {expenses.length} Expenses for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default TotalExpensesCard;
