import ExpensesBarChart from "@/components/charts/ExpensesBarChart";
import ExpensesBarChartSkeleton from "@/components/charts/ExpensesBarChartSkeleton";
import ExpensesDahsboardForm from "@/components/charts/ExpensesDahsboardForm";
import StatExpenseCard from "@/components/charts/StatExpenseCard";
import StatExpenseCardSkeleton from "@/components/charts/StatExpenseCardSkeleton";

import { useAllExpenses } from "@/hooks/useExpensesQuery";
import type { expensesFilterType } from "@/types";
import { getEndOfCurrentYear, getStartOfCurrentYear } from "@/utils/dateUtils";
import { format } from "date-fns";
import {
  Banknote,
  BanknoteArrowDown,
  MoveDown,
  MoveUp,
  Tag,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const DashboardPage = () => {
  const [filters, setFilters] = useState<expensesFilterType | null>({
    startDate: format(getStartOfCurrentYear(), "yyyy-MM-dd"),
    endDate: format(getEndOfCurrentYear(), "yyyy-MM-dd"),
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const { data, isLoading } = useAllExpenses(filters);

  const expenses = data?.data || [];

  // handle Filters for dashboard form
  const handleFilters = (dateRange: DateRange) => {
    const { from, to } = dateRange;
    if (from && to) {
      {
        setFilters({
          startDate: dateRange.from
            ? format(new Date(dateRange.from), "yyyy-MM-dd")
            : undefined,
          endDate: dateRange.to
            ? format(new Date(dateRange.to), "yyyy-MM-dd")
            : undefined,
        });
      }
    } else {
      setFilters(null);
    }
  };

  return (
    <section className="container py-10">
      <div className="flex flex-col gap-2">
        <ExpensesDahsboardForm
          dateRange={dateRange}
          setDateRange={setDateRange}
          handleFilters={handleFilters}
          isLoading={isLoading}
        />
        {isLoading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StatExpenseCardSkeleton key={index} />
              ))}
            </div>

            <ExpensesBarChartSkeleton />
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-1">
              <StatExpenseCard
                cardTitle="Expenses"
                cardDesrciption="Total Expenses"
                cardNumber={expenses.length}
                Icon={<BanknoteArrowDown />}
              />

              <StatExpenseCard
                cardTitle="Money Spent"
                cardDesrciption="Total Money Spent"
                cardNumber={
                  expenses
                    .reduce((sum, expense) => sum + expense.amount, 0)
                    .toLocaleString("en-US") + " E£"
                }
                Icon={<Tag />}
              />
              <StatExpenseCard
                cardTitle="Average"
                cardDesrciption="Average Amount Spent"
                cardNumber={
                  expenses.length > 0
                    ? (
                        expenses.reduce(
                          (sum, expense) => sum + expense.amount,
                          0,
                        ) / expenses.length
                      ).toLocaleString("en-US") + " E£"
                    : (0).toLocaleString("en-US") + " E£"
                }
                Icon={<Banknote />}
              />
              <StatExpenseCard
                cardTitle="Maximum"
                cardDesrciption="Maximum Amount Spent"
                cardNumber={
                  expenses.length > 0
                    ? Math.max(...expenses.map((e) => e.amount)).toLocaleString(
                        "en-US",
                      ) + " E£"
                    : (0).toLocaleString("en-US") + " E£"
                }
                Icon={<MoveUp />}
              />
              <StatExpenseCard
                cardTitle="Minimum"
                cardDesrciption="Minimum Amount Spent"
                cardNumber={
                  expenses.length > 0
                    ? Math.min(...expenses.map((e) => e.amount)).toLocaleString(
                        "en-US",
                      ) + " E£"
                    : (0).toLocaleString("en-US") + " E£"
                }
                Icon={<MoveDown />}
              />
            </div>
            <ExpensesBarChart expenses={expenses} />
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
