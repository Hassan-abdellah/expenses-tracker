import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ExpensesSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card className="card-width" key={i}>
          <CardHeader className="border-b border-gray-100 flex items-center justify-between [.border-b]:pb-2">
            <Skeleton className="h-4 w-2/3 bg-light-gray" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 bg-light-gray rounded-full" />
              <Skeleton className="h-7 w-7 bg-light-gray rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video h-12 w-full bg-light-gray" />
          </CardContent>

          <CardFooter className="border-t border-gray-100 flex gap-4 [.border-t]:pt-2">
            <Skeleton className="h-4 w-2/3 bg-light-gray" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ExpensesSkeleton;
