import { FieldGroup } from "../ui/field";
import { Controller, type UseFormReturn } from "react-hook-form";
import DatePicker from "../formInputs/DatePicker";
import FormController from "../formInputs/FormController";
import { formateDate } from "@/utils";
import TextAreaController from "../formInputs/TextAreaController";
import type { expenseFormSchema } from "@/formSchemas/expensesFormSchema";
import type { expenseFormValues } from "@/types";
import * as z from "zod";
import NumericInput from "../formInputs/NumericInput";

const ExpenseFormInputs = ({
  handleSubmit,
  form,
}: {
  handleSubmit: (values: z.infer<typeof expenseFormSchema>) => Promise<void>;
  form: UseFormReturn<expenseFormValues>;
}) => {
  return (
    <form
      id="form-rhf-demo"
      className="px-4"
      onSubmit={form.handleSubmit(handleSubmit)}
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
              autoFocus={true}
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
        {/* <Controller
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
        /> */}
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <NumericInput
              id="form-rhf-demo-amount"
              data-invalid={fieldState.invalid}
              name="amount"
              label="Amount"
              placeholder="10"
              value={field.value}
              onchange={field.onChange}
              error={fieldState.error?.message}
              invalid={fieldState.invalid}
            />
          )}
        />
      </FieldGroup>
    </form>
  );
};

export default ExpenseFormInputs;
