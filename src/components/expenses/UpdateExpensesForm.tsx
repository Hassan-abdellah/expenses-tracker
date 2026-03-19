import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import type { SupabaseError } from "@/types";
import ViewExpenseSkeleton from "./ViewExpenseSkeleton";
import ExpenseFormInputs from "./ExpenseFormInputs";
import { useForm } from "react-hook-form";
import CustomButton from "../common/CustomButton";
import { useViewExpense } from "@/hooks/useExpensesQuery";
import { useExpensesMutation } from "@/hooks/useExpensesMutation";
import { toast } from "sonner";

const UpdateExpensesForm = ({
  expenseId,
  trigger,
}: {
  expenseId: number;
  trigger: (setOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { isLoading, data: expense } = useViewExpense(expenseId, open);
  const { updateExpense } = useExpensesMutation();
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      effective_date: formateDate(new Date()),
      amount: "",
      description: "",
      label: "",
    },
  });
  async function handleUpdate(data: z.infer<typeof expenseFormSchema>) {
    try {
      await updateExpense.mutateAsync({ expenseId, data });
      toast.success("added successfully", { position: "top-right" });
      setOpen(false);
      form.reset();
    } catch (error) {
      const supsabaseErr = error as SupabaseError;
      toast.error(supsabaseErr.message, { position: "top-right" });
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

  // useEffect(() => {
  //   if (!open) {
  //     form.reset({
  //       effective_date: "",
  //       amount: "0",
  //       description: "",
  //       label: "",
  //     });
  //   }
  // }, [open, form]);

  return (
    <Fragment>
      {trigger(setOpen)}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="card-width max-w-sm px-0">
          <DialogHeader className="mb-4 px-4 text-left">
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <ViewExpenseSkeleton />
          ) : (
            <Fragment>
              <ExpenseFormInputs form={form} handleSubmit={handleUpdate} />

              <DialogFooter className="border-t border-gray-100 pt-4 px-4">
                <CustomButton
                  type="submit"
                  formId="form-rhf-demo" // Connect button to form
                  disabled={form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                  title="Update"
                  icon={<PencilIcon />}
                  prefixIcon={true}
                />
              </DialogFooter>
            </Fragment>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UpdateExpensesForm;
