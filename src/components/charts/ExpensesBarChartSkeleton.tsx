import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ExpensesBarChartSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-12" />
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </CardFooter>
    </Card>
  );
};

export default ExpensesBarChartSkeleton;
