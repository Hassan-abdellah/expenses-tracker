import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import {
  Fragment,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { formateDate } from "@/utils";
import { expenseFormSchema } from "@/formSchemas/expensesFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { updateExpense } from "@/utils/expenses";
import type { expeneseType } from "@/types";
import ViewExpenseSkeleton from "./ViewExpenseSkeleton";
import ExpenseFormInputs from "./ExpenseFormInputs";
import { useForm } from "react-hook-form";

const UpdateExpensesForm = ({
  expenseId,
  trigger,
  handleUpdateExpens,
}: {
  expenseId: number;
  trigger: (setOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  handleUpdateExpens: (expense: expeneseType) => void;
}) => {
  const { fetchSingleExpense, expense, isLoading } = useFetchExpenses({
    autoFetch: false,
  });

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (expenseId && open) {
      fetchSingleExpense(expenseId);
    } else return;
  }, [expenseId, open]);

  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      effective_date: formateDate(new Date()),
      amount: "",
      description: "",
      label: "",
    },
  });
  async function handleUpdateExpense(data: z.infer<typeof expenseFormSchema>) {
    const { error, expense: updatedExpense } = await updateExpense(
      expense?.id,
      data,
    );
    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      toast.success("updated successfully", { position: "top-right" });
      form.reset();
      if (updatedExpense) {
        handleUpdateExpens(updatedExpense);
      }
      setOpen(false);
    }
  }

  useEffect(() => {
    form.reset({
      effective_date: expense?.effective_date
        ? format(expense?.effective_date, "dd-MM-yyyy")
        : "",
      amount:
        expense && Number(expense?.amount) >= 0
          ? expense?.amount.toString()
          : "0",
      description: expense && expense?.description ? expense.description : "",
      label: expense?.label,
    });
  }, [expense, isLoading, form]);

  useEffect(() => {
    if (!open) {
      form.reset({
        effective_date: "",
        amount: "0",
        description: "",
        label: "",
      });
    }
  }, [open, form]);

  return (
    <Fragment>
      {trigger(setOpen)}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm px-0">
          <DialogHeader className="mb-4 px-4">
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <ViewExpenseSkeleton />
          ) : (
            <Fragment>
              <ExpenseFormInputs
                form={form}
                handleSubmit={handleUpdateExpense}
              />

              <DialogFooter className="border-t border-gray-100 pt-4 px-4">
                <Button
                  className="relative border-2 border-green-200 hover:bg-green-200 bg-transparent w-full rounded-3xl text-green-200 hover:text-white cursor-pointer py-5 transition-colors duration-300"
                  type="submit"
                  form="form-rhf-demo" // Connect button to form
                  disabled={form.formState.isSubmitting}
                >
                  <div className="w-6 h-6 bg-green-200 text-white rounded-full flex items-center justify-center">
                    <PencilIcon />
                  </div>

                  <span>Update</span>
                </Button>
              </DialogFooter>
            </Fragment>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UpdateExpensesForm;
