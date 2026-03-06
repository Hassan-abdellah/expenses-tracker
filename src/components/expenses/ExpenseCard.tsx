import type { expeneseType } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EyeIcon, PencilIcon, TagIcon, TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ExpenseCard = ({ expense }: { expense: expeneseType }) => {
  return (
    <Card className="w-150">
      <CardHeader>
        <CardTitle className="bg-green-200 text-white text-base font-medium w-fit px-2 py-1 rounded-md">
          {expense.label}
        </CardTitle>
        {/* <CardAction className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              asChild
              className="text-gray-300 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300"
            >
              <PencilIcon className="w-2 h-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <TrashIcon className="w-5 h-5 text-destructive" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{expense.description}</p>
        <div className="flex items-center gap-1.5 mt-2 ">
          <TagIcon className="w-4 h-4 text-green-200" />
          <span className="text-green-200">{expense.amount} E£</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
