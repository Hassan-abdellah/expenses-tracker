import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { expesnsesRoutes } from "@/data/routePaths";
import { Banknote } from "lucide-react";
import { Link } from "react-router";

const EmptyExpensesList = () => {
  return (
    <Empty className="border border-muted-black bg-white my-24">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Banknote />
        </EmptyMedia>
        <EmptyTitle>Expenses List Empty</EmptyTitle>
        <EmptyDescription>No Expenses items in this list Yet!</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link
          to={expesnsesRoutes.addNew}
          className="bg-green-200 text-white rounded-md cursor-pointer px-4 py-2 hover:bg-green-100 transition-colors duration-300"
        >
          Add Expense
        </Link>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyExpensesList;
