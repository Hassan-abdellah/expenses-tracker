import { z } from "zod";

export const expenseFormSchema = z.object({
  effective_date: z.string({
    message: "Effective Date is Required.",
  }),
  label: z.string().min(2, {
    message: "Label is Required.",
  }),
  description: z.string().min(2, {
    message: "Description is Required.",
  }),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
});
