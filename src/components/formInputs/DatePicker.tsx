import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import FormErrorMessage from "./FormErrorMessage";
import { Field, FieldLabel } from "@/components/ui/field";
import { formateDate } from "@/utils";

const DatePicker = ({
  id,
  label,
  value,
  handleChange,
  error,
  invalid,
}: {
  id: string;
  label: string;
  value: Date | string | undefined;
  handleChange: (value: Date) => void;
  error: string | undefined;
  invalid: boolean;
}) => {
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>
      <Popover>
        <PopoverTrigger asChild className="date-input-trigger">
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal cursor-pointer",
              "focus-visible:border-green-100 focus-visible:ring-green-100 focus-visible:ring-[3px]",
            )}
            id={id}
          >
            {value ? formateDate(value) : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            mode="single"
            selected={typeof value === "string" ? new Date(value) : value}
            onSelect={(value) => {
              if (!value) return;
              handleChange(value);
            }}
            // disabled={(date: Date) => date < new Date(addDays(new Date(), -1))}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>

      <FormErrorMessage error={error} />
    </Field>
  );
};

export default DatePicker;
