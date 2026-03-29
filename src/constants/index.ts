import { dateDifference } from "@/utils/dateUtils";
import { format } from "date-fns";

export const defaultNumberValidKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  ".",
];

export const datePresets = [
  {
    label: "Today",
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Yesterday",
    from: format(dateDifference(new Date(), -1, "days"), "yyyy-MM-dd"),
    to: format(dateDifference(new Date(), -1, "days"), "yyyy-MM-dd"),
  },
  {
    label: "Last Week",
    from: format(dateDifference(new Date(), -1, "weeks"), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last 2 Weeks",
    from: format(dateDifference(new Date(), -2, "weeks"), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last 3 Week",
    from: format(dateDifference(new Date(), -3, "weeks"), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last Month",
    from: format(dateDifference(new Date(), -1, "months"), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  },
];
