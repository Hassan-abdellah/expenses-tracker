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
import { Button } from "@/components/ui/button";
import { createExpense } from "@/utils/expenses";
import ExpenseFormInputs from "./ExpenseFormInputs";

const CreateExpensesForm = () => {
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
    const { error } = await createExpense(data);
    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      toast.success("added successfully", { position: "top-right" });
      form.reset();
    }
  }

  return (
    <section className="pt-8 pb-2 h-[calc(100%-var(--nav-height))] flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseFormInputs form={form} handleSubmit={handleAddExpense} />
        </CardContent>
        <CardFooter className="border-t border-light-gray pt-5">
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
        </CardFooter>
      </Card>
    </section>
  );
};

export default CreateExpensesForm;
