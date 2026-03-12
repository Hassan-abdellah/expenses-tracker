import { Skeleton } from "../ui/skeleton";

const ViewExpenseSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 px-4">
      <Skeleton className="bg-light-gray h-8 w-full" />
      <Skeleton className="bg-light-gray h-8 w-full" />
      <Skeleton className="bg-light-gray h-20 w-full" />
      <Skeleton className="bg-light-gray h-8 w-full" />
      <div className="h-1 w-full bg-light-gray" />
      <Skeleton className="bg-light-gray h-8 w-full rounded-3xl" />
    </div>
  );
};

export default ViewExpenseSkeleton;
