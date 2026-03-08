import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpensesFilterDropdown from "@/components/expenses/ExpensesFilterDropdown";
import ExpensesSkeleton from "@/components/expenses/ExpensesSkeleton";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { Fragment } from "react";
const ExpensesListPage = () => {
  const { isLoading, expenses, setExpenses, fetchFilteredExpenses } =
    useFetchExpenses();

  return (
    <section className="flex flex-col max-w-xl mx-auto my-40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-black text-2xl">
          Expenses{" "}
          {expenses.length
            ? `(${expenses.length}) ${expenses.reduce((total, item) => total + Number(item.amount), 0)} E£`
            : null}
        </h3>
        <ExpensesFilterDropdown
          onFilter={(filters) => fetchFilteredExpenses(filters)}
        />
      </div>

      {isLoading ? (
        <ExpensesSkeleton />
      ) : (
        <Fragment>
          {expenses.length > 0 ? (
            <div className="flex flex-col gap-2 items-center justify-center">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onDeleteSuccess={(id) =>
                    setExpenses((prev) => prev.filter((item) => item.id !== id))
                  }
                />
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
