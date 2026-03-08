import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  isValid,
  parseISO,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

export const formateDate = (date: string | Date | null) => {
  if (!date) return "";
  if (typeof date === "string") {
    return date;
  } else {
    return format(date, "dd-MM-yyyy");
  }
};

// check if the passed values is a valid date or not
export const isValidDate = (value: string | number | Date | null) => {
  if (!value) return false;
  let date;
  // Reject numeric timestamps explicitly
  if (typeof value === "number") {
    return false;
  }

  // If it's a string
  if (typeof value === "string") {
    // Try parsing as ISO first
    date = parseISO(value);

    // Fallback: try native Date constructor
    if (!isValid(date)) {
      date = new Date(value);
    }
  }
  // If it's already a Date object
  else if (value instanceof Date) {
    date = value;
  } else {
    return false;
  }

  return isValid(date);
};

export const addToDate = (
  date: string | Date,
  amount: number,
  unit: "days" | "months" | "years",
) => {
  if (!date || !isValidDate(date)) return;
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  switch (unit) {
    case "days":
      return addDays(parsedDate, amount);
    case "months":
      return addMonths(parsedDate, amount);
    case "years":
      return addYears(parsedDate, amount);
    default:
      return "";
  }
};
export const subtractFromDate = (
  date: string | Date,
  amount: number,
  unit: "days" | "months" | "years",
) => {
  if (!date || !isValidDate(date)) return;
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  switch (unit) {
    case "days":
      return subDays(parsedDate, amount);
    case "months":
      return subMonths(parsedDate, amount);
    case "years":
      return subYears(parsedDate, amount);
    default:
      return "";
  }
};
export const dateDifference = (
  date: string | Date,
  amount: number,
  unit: "days" | "weeks" | "months" | "years",
) => {
  if (!date || !isValidDate(date)) return date;
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  switch (unit) {
    case "days":
      return amount > 0
        ? addDays(parsedDate, amount)
        : subDays(parsedDate, amount * -1);
    case "weeks":
      return amount > 0
        ? addWeeks(parsedDate, amount)
        : subWeeks(parsedDate, amount * -1);
    case "months":
      return amount > 0
        ? addMonths(parsedDate, amount)
        : subMonths(parsedDate, amount * -1);
    case "years":
      return amount > 0
        ? addYears(parsedDate, amount)
        : subYears(parsedDate, amount * -1);
    default:
      return parsedDate;
  }
};
