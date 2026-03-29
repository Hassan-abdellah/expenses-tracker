import ExpensesBarChart from "@/components/charts/ExpensesBarChart";
import ExpensesBarChartSkeleton from "@/components/charts/ExpensesBarChartSkeleton";
import ExpensesDahsboardForm from "@/components/charts/ExpensesDahsboardForm";
import TotalExpensesCard from "@/components/charts/TotalExpensesCard";
import TotalExpensesCardSkeleton from "@/components/charts/TotalExpensesCardSkeleton";
import { useAllExpenses } from "@/hooks/useExpensesQuery";
import type { expensesFilterType } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const DashboardPage = () => {
  const [filters, setFilters] = useState<expensesFilterType | null>(null);
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
            <TotalExpensesCardSkeleton />
            <ExpensesBarChartSkeleton />
          </>
        ) : (
          <>
            <TotalExpensesCard expenses={expenses} />
            <ExpensesBarChart expenses={expenses} />
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
