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
import { FieldGroup } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../formInputs/DatePicker";
import FormController from "../formInputs/FormController";
import TextAreaController from "../formInputs/TextAreaController";
import { formateDate } from "@/utils";
import { formSchema } from "@/formSchemas/expensesFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { updateExpense } from "@/utils/expenses";
import type { expeneseType } from "@/types";

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      effective_date: formateDate(new Date()),
      amount: "",
      description: "",
      label: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
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
            <div className="flex flex-col gap-6 px-4">
              <Skeleton className="bg-light-gray h-8 w-full" />
              <Skeleton className="bg-light-gray h-8 w-full" />
              <Skeleton className="bg-light-gray h-16 w-full" />
              <Skeleton className="bg-light-gray h-8 w-full" />
              <Skeleton className="bg-light-gray h-8 w-full" />
            </div>
          ) : (
            <Fragment>
              <form
                id="form-rhf-demo"
                className="px-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FieldGroup>
                  {/* Effective Date */}
                  <Controller
                    name="effective_date"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        id="form-rhf-demo-effective_date"
                        label="Effective Date"
                        value={field.value}
                        handleChange={(date) => {
                          form.setValue("effective_date", formateDate(date));
                        }}
                        invalid={fieldState.invalid}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  {/* label */}
                  <Controller
                    name="label"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FormController
                        id="form-rhf-demo-label"
                        data-invalid={fieldState.invalid}
                        name="label"
                        label="Expense Label"
                        type="text"
                        placeholder="e.g. Groceries, Rent, etc."
                        value={field.value}
                        onchange={field.onChange}
                        error={fieldState.error?.message}
                        invalid={fieldState.invalid}
                      />
                    )}
                  />
                  {/* description */}
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <TextAreaController
                        id="form-rhf-demo-description"
                        label="Description"
                        name="description"
                        placeholder="1 Kg of rice, 1 dozen eggs, etc."
                        value={field.value}
                        onchange={field.onChange}
                        error={fieldState.error?.message}
                        invalid={fieldState.invalid}
                      />
                    )}
                  />
                  {/* amount */}
                  <Controller
                    name="amount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FormController
                        id="form-rhf-demo-amount"
                        data-invalid={fieldState.invalid}
                        name="amount"
                        label="Amount"
                        type="text"
                        placeholder="10"
                        value={field.value}
                        onchange={field.onChange}
                        error={fieldState.error?.message}
                        invalid={fieldState.invalid}
                        isNumber={true}
                      />
                    )}
                  />
                </FieldGroup>
              </form>

              <DialogFooter className="border-t border-gray-100 pt-4 px-4">
                <Button
                  className="relative border-2 border-green-200 hover:bg-green-200 bg-transparent w-full rounded-3xl text-green-200 hover:text-white cursor-pointer py-5 transition-colors duration-300"
                  type="submit"
                  form="form-rhf-demo" // Connect button to form
                  disabled={form.formState.isSubmitting}
                >
                  <span>Save</span>

                  <div className="w-6 h-6 bg-green-200 text-white rounded-full flex items-center justify-center">
                    <PlusIcon />
                  </div>
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
