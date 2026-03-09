import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formSchema } from "@/formSchemas/expensesFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { PlusIcon } from "lucide-react";
import { formateDate } from "@/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import DatePicker from "@/components/formInputs/DatePicker";
import FormController from "@/components/formInputs/FormController";
import TextAreaController from "@/components/formInputs/TextAreaController";
import { createExpense } from "@/utils/expenses";

const ExpensesForm = () => {
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
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
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
        </CardContent>
        <CardFooter className="border-t border-light-gray">
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

export default ExpensesForm;
