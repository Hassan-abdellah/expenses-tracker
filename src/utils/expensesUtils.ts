import type { ExpenseChartType } from "@/types";

const getAllMonthsExpenses = (expenses: ExpenseChartType[], month: number) => {
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.effective_date);
    return expenseDate.getMonth() === month;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  return totalAmount;
};
export const formatExpensesDataForBarChart = (expenses: ExpenseChartType[]) => {
  return [
    { month: "January", amount: getAllMonthsExpenses(expenses, 0) },
    { month: "February", amount: getAllMonthsExpenses(expenses, 1) },
    { month: "March", amount: getAllMonthsExpenses(expenses, 2) },
    { month: "April", amount: getAllMonthsExpenses(expenses, 3) },
    { month: "May", amount: getAllMonthsExpenses(expenses, 4) },
    { month: "June", amount: getAllMonthsExpenses(expenses, 5) },
    { month: "July", amount: getAllMonthsExpenses(expenses, 6) },
    { month: "August", amount: getAllMonthsExpenses(expenses, 7) },
    { month: "September", amount: getAllMonthsExpenses(expenses, 8) },
    { month: "October", amount: getAllMonthsExpenses(expenses, 9) },
    { month: "November", amount: getAllMonthsExpenses(expenses, 10) },
    { month: "December", amount: getAllMonthsExpenses(expenses, 11) },
  ];
};
