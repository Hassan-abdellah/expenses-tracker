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
import { type DateRange } from "react-day-picker";
import { datePresets } from "@/constants";

const DateRangePicker = ({
  id,
  label,
  value,
  handleChange,
  error,
  invalid,
}: {
  id: string;
  label: string;
  value: DateRange | undefined;
  handleChange: (value: DateRange) => void;
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
            {value?.from ? (
              value.to ? (
                <>
                  {formateDate(value.from)} - {formateDate(value.to)}
                </>
              ) : (
                formateDate(value.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 flex items-center" align="start">
          {/* presets */}
          <ul className="space-y-2 ml-1.5">
            {datePresets.map((preset, index) => (
              <li
                key={`${preset.label}-${index}`}
                className="text-muted-black hover:bg-gray-100 rounded-lg px-2 py-0.5  cursor-pointer"
                onClick={() =>
                  handleChange({
                    from: new Date(preset.from),
                    to: new Date(preset.to),
                  })
                }
              >
                {preset.label}
              </li>
            ))}
          </ul>
          <Calendar
            mode="range"
            selected={value}
            onSelect={(selected) => {
              handleChange({ from: selected?.from, to: selected?.to });
            }}
            // disabled={(date: Date) => date < new Date(addDays(new Date(), -1))}
            captionLayout="dropdown"
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <FormErrorMessage error={error} />
    </Field>
  );
};

export default DateRangePicker;
