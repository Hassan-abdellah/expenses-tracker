import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpensesFilterDropdown from "@/components/expenses/ExpensesFilterDropdown";
import ExpensesSkeleton from "@/components/expenses/ExpensesSkeleton";
import { useAllExpenses } from "@/hooks/useExpensesQuery";
import type { expensesFilterType } from "@/types";
import { Fragment, useState } from "react";
const ExpensesListPage = () => {
  const [filters, setFilters] = useState<expensesFilterType | null>(null);

  const { isLoading, data } = useAllExpenses(filters);
  const expenses = data?.data || [];
  return (
    <section className="flex flex-col max-w-xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-black text-2xl">
          Expenses{" "}
          {expenses.length
            ? `(${expenses.length}) ${expenses.reduce((total, item) => total + Number(item.amount), 0).toLocaleString("en-US")} E£`
            : null}
        </h3>
        <ExpensesFilterDropdown setFilters={setFilters} />
      </div>

      {isLoading ? (
        <ExpensesSkeleton />
      ) : (
        <Fragment>
          {expenses.length > 0 ? (
            <div className="flex flex-col gap-2 items-center justify-center">
              {expenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          ) : null}
        </Fragment>
      )}

      {!isLoading && expenses.length === 0 ? (
        <div>
          <h3 className="text-muted-black text-center">No Expenses yet!</h3>
        </div>
      ) : null}
    </section>
  );
};

export default ExpensesListPage;
