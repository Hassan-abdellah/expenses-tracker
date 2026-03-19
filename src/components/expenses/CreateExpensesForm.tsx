import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { expenseFormSchema } from "@/formSchemas/expensesFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusIcon } from "lucide-react";
import { formateDate } from "@/utils";
import { toast } from "sonner";
import ExpenseFormInputs from "./ExpenseFormInputs";
import CustomButton from "../common/CustomButton";
import { useAuth } from "@clerk/react";
import { useExpensesMutation } from "@/hooks/useExpensesMutation";
import type { SupabaseError } from "@/types";

const CreateExpensesForm = () => {
  const { createExpense } = useExpensesMutation();
  const { userId } = useAuth();
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      effective_date: formateDate(new Date()),
      amount: "",
      description: "",
      label: "",
    },
  });
  async function handleAddExpense(data: z.infer<typeof expenseFormSchema>) {
    try {
      await createExpense.mutateAsync({ ...data, user_id: userId });
      toast.success("added successfully", { position: "top-right" });
      form.reset();
    } catch (error) {
      const supsabaseErr = error as SupabaseError;
      toast.error(supsabaseErr.message, { position: "top-right" });
    }
  }

  return (
    <section className="pt-8 pb-2 h-[calc(100%-var(--nav-height))] flex items-center justify-center">
      <Card className="card-width sm:max-w-md">
        <CardHeader>
          <CardTitle>Create New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseFormInputs form={form} handleSubmit={handleAddExpense} />
        </CardContent>
        <CardFooter className="border-t border-light-gray pt-5">
          <CustomButton
            type="submit"
            formId="form-rhf-demo" // Connect button to form
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            title="Save"
            icon={<PlusIcon />}
            suffixIcon={true}
          />
        </CardFooter>
      </Card>
    </section>
  );
};

export default CreateExpensesForm;
