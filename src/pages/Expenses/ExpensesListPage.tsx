import EmptyExpensesList from "@/components/expenses/EmptyExpensesList";
import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpensesFilterDropdown from "@/components/expenses/ExpensesFilterDropdown";
import ExpensesSkeleton from "@/components/expenses/ExpensesSkeleton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { usePaginatedExpenses } from "@/hooks/useExpensesQuery";
import type { expensesFilterType } from "@/types";
import { Fragment, useState } from "react";
const ExpensesListPage = () => {
  const [filters, setFilters] = useState<expensesFilterType | null>(null);

  const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePaginatedExpenses(filters);
  const expenses = data?.pages.flatMap((page) => page.data) || [];
  return (
    <section className="flex flex-col max-w-xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4 mx-4 lg:mx-0">
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
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-2 items-center justify-center">
                {expenses.map((expense) => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </div>
              {/* loading state for fetching next page */}
              {isFetchingNextPage ? <ExpensesSkeleton /> : null}
              {/* Load More Button */}
              {hasNextPage ? (
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="flex items-center gap-1.5 mx-auto px-10 py-5 bg-green-300 text-white hover:bg-green-200 transition-colors duration-300 cursor-pointer rounded-3xl"
                >
                  {isFetchingNextPage ? <Spinner /> : null}
                  <span>Load More</span>
                </Button>
              ) : null}

              {expenses.length > 0 && !hasNextPage ? (
                <span className="inline-flex mx-auto text-muted-black text-sm">
                  No More Items
                </span>
              ) : null}
            </div>
          ) : null}
        </Fragment>
      )}

      {!isLoading && expenses.length === 0 ? <EmptyExpensesList /> : null}
    </section>
  );
};

export default ExpensesListPage;
