import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StatExpenseCardSkeleton = () => {
  return (
    <Card className="flex-1">
      <CardContent className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="text-gray-400  flex flex-col gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <Skeleton className="rounded-full w-12 h-12" />
      </CardContent>
    </Card>
  );
};

export default StatExpenseCardSkeleton;
