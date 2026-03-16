import type { expeneseType } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar, PencilIcon, TagIcon, TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { format } from "date-fns";
import DeleteModal from "../common/DeleteModal";
import UpdateExpensesForm from "./UpdateExpensesForm";

const ExpenseCard = ({
  expense,
  handleDelete,
  handleUpdateExpense,
}: {
  expense: expeneseType;
  handleDelete: (expenseId: number) => Promise<void>;
  handleUpdateExpense: (
    expenseId: number,
    data: expeneseType,
  ) => Promise<{
    error: Error | null;
  }>;
}) => {
  const handleDeleteExpense = async (expenseId: number) => {
    await handleDelete(expenseId);
  };

  const handleUpdate = async (
    expenseId: number,
    data: expeneseType,
  ): Promise<{
    error: Error | null;
  }> => {
    const { error } = await handleUpdateExpense(expenseId, data);
    return { error };
  };
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100 flex items-center justify-between [.border-b]:pb-2">
        <CardTitle className="text-green-200">{expense.label}</CardTitle>
        <CardAction className="flex items-center gap-2">
          {expense.id ? (
            <UpdateExpensesForm
              expenseId={expense?.id}
              handleUpdateExpens={(expenseId, expense) =>
                handleUpdate(expenseId, expense)
              }
              trigger={(setOpen) => (
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setOpen(true)}
                    className="hover:bg-gray-300 hover:text-white text-gray-300 cursor-pointer border-2 border-gray-300 rounded-full w-7 h-7 flex items-center justify-center"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              )}
            />
          ) : null}

          <DeleteModal
            modalTitle="Delete Expense"
            modalDescription="Are You Sure you want to delete this Expense?"
            trigger={(setOpen) => (
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setOpen(true)}
                  className="hover:bg-destructive hover:text-white text-destructive cursor-pointer border-2 border-destructive rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <TrashIcon className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            )}
            onDelete={() =>
              expense.id ? handleDeleteExpense(expense?.id) : undefined
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{expense.description}</p>
      </CardContent>

      <CardFooter className="border-t border-gray-100 flex gap-4 [.border-t]:pt-2">
        <div className="flex items-center gap-1.5 mt-2 text-gray-500">
          <TagIcon className="w-4 h-4" />
          <span>{expense.amount.toLocaleString("en-US")} E£</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{format(expense.effective_date, "dd-MM-yyyy")}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;
