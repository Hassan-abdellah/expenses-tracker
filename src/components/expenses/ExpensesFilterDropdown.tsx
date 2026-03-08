import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { expensesFilterType } from "@/types";
import { dateDifference } from "@/utils/dateUtils";
import { format } from "date-fns";
import { Check, Funnel } from "lucide-react";
import { useState } from "react";
const ExpensesFilterDropdown = ({
  onFilter,
}: {
  onFilter: (filters: expensesFilterType) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 border-2 border-gray-300 text-gray-300 bg-transparent hover:bg-gray-300  hover:text-white data-[state=open]:bg-gray-300 data-[state=open]:text-white  transition-colors duration-300 px-4 py-2 rounded-full">
        <Funnel size={16} />
        <span className="text-sm md:inline-flex hidden">Filtering</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-sm">
          <span className="text-gray-300">Filter Expenses</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {[
          {
            label: "Today",
            onclick: () => {
              onFilter({ effectiveDate: format(new Date(), "yyyy-MM-dd") });
              setActiveFilter(1);
            },
            isActive: activeFilter === 1,
          },
          {
            label: "Yesterday",
            onclick: () => {
              onFilter({
                effectiveDate: format(
                  dateDifference(new Date(), -1, "days"),
                  "yyyy-MM-dd",
                ),
              });
              setActiveFilter(2);
            },

            isActive: activeFilter === 2,
          },
          {
            label: "Last Week",
            onclick: () => {
              onFilter({
                startDate: format(
                  dateDifference(new Date(), -1, "weeks"),
                  "yyyy-MM-dd",
                ),
                endDate: format(new Date(), "yyyy-MM-dd"),
              });
              setActiveFilter(3);
            },
            isActive: activeFilter === 3,
          },
          {
            label: "Last 2 Weeks",
            onclick: () => {
              onFilter({
                startDate: format(
                  dateDifference(new Date(), -2, "weeks"),
                  "yyyy-MM-dd",
                ),
                endDate: format(new Date(), "yyyy-MM-dd"),
              });
              setActiveFilter(4);
            },
            isActive: activeFilter === 4,
          },
          {
            label: "Last 3 Weeks",
            onclick: () => {
              onFilter({
                startDate: format(
                  dateDifference(new Date(), -3, "weeks"),
                  "yyyy-MM-dd",
                ),
                endDate: format(new Date(), "yyyy-MM-dd"),
              });
              setActiveFilter(5);
            },
            isActive: activeFilter === 5,
          },
          {
            label: "Last Month",
            onclick: () => {
              onFilter({
                startDate: format(
                  dateDifference(new Date(), -1, "months"),
                  "yyyy-MM-dd",
                ),
                endDate: format(new Date(), "yyyy-MM-dd"),
              });
              setActiveFilter(6);
            },
            isActive: activeFilter === 6,
          },
        ].map((item) => (
          <DropdownMenuItem
            key={item.label}
            className="cursor-pointer text-gray-800"
            onClick={item.onclick}
          >
            {item.label}
            <DropdownMenuShortcut className="flex items-center gap-0">
              {item.isActive ? <Check size={16} /> : null}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExpensesFilterDropdown;
