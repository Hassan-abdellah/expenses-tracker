import { format } from "date-fns";

export const formateDate = (date: string | Date | null) => {
  if (!date) return "";
  if (typeof date === "string") {
    return date;
  } else {
    return format(date, "dd-MM-yyyy");
  }
};
