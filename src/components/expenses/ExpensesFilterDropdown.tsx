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
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<expensesFilterType | null>>;
}) => {
  const [activeFilter, setActiveFilter] = useState(0);

  const handleFilter = (
    filters: expensesFilterType | null,
    filterIndex: number,
  ) => {
    setFilters(filters);
    setActiveFilter(filterIndex);
  };
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
            label: "All",
            onclick: () => {
              handleFilter(null, 0);
            },
            isActive: activeFilter === 0,
          },
          {
            label: "Today",
            onclick: () => {
              handleFilter(
                { effectiveDate: format(new Date(), "yyyy-MM-dd") },
                1,
              );
            },
            isActive: activeFilter === 1,
          },
          {
            label: "Yesterday",
            onclick: () => {
              handleFilter(
                {
                  effectiveDate: format(
                    dateDifference(new Date(), -1, "days"),
                    "yyyy-MM-dd",
                  ),
                },
                2,
              );
            },

            isActive: activeFilter === 2,
          },
          {
            label: "Last Week",
            onclick: () => {
              handleFilter(
                {
                  startDate: format(
                    dateDifference(new Date(), -1, "weeks"),
                    "yyyy-MM-dd",
                  ),
                  endDate: format(new Date(), "yyyy-MM-dd"),
                },
                3,
              );
            },
            isActive: activeFilter === 3,
          },
          {
            label: "Last 2 Weeks",
            onclick: () => {
              handleFilter(
                {
                  startDate: format(
                    dateDifference(new Date(), -2, "weeks"),
                    "yyyy-MM-dd",
                  ),
                  endDate: format(new Date(), "yyyy-MM-dd"),
                },
                4,
              );
            },
            isActive: activeFilter === 4,
          },
          {
            label: "Last 3 Weeks",
            onclick: () => {
              handleFilter(
                {
                  startDate: format(
                    dateDifference(new Date(), -3, "weeks"),
                    "yyyy-MM-dd",
                  ),
                  endDate: format(new Date(), "yyyy-MM-dd"),
                },
                5,
              );
            },
            isActive: activeFilter === 5,
          },
          {
            label: "Last Month",
            onclick: () => {
              handleFilter(
                {
                  startDate: format(
                    dateDifference(new Date(), -1, "months"),
                    "yyyy-MM-dd",
                  ),
                  endDate: format(new Date(), "yyyy-MM-dd"),
                },
                6,
              );
              setActiveFilter(6);
            },
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
