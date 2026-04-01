import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateRangePicker from "../formInputs/DateRangePicker";
import { ArrowRightCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { DateRange } from "react-day-picker";

const ExpensesDahsboardForm = ({
  dateRange,
  setDateRange,
  handleFilters,
  isLoading,
}: {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  handleFilters: (dateRange: DateRange) => void;
  isLoading: boolean;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Filter your expenses in certain range</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleFilters(dateRange);
          }}
        >
          <DateRangePicker
            id="dashboard-date-range"
            label="Date Range"
            value={dateRange}
            handleChange={setDateRange}
            error=""
            invalid={false}
          />
          <Button
            type="submit"
            className="self-end cursor-pointer bg-green-300 hover:bg-green-200 text-white transition-colors duration-200"
            disabled={isLoading}
          >
            <span>Submit</span>
            <ArrowRightCircleIcon />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default ExpensesDahsboardForm;
