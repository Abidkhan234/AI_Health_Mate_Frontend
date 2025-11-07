import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SidebarMenuSkeleton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <SidebarMenuSkeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between py-2 border-t">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex items-center justify-between py-2 border-t">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
