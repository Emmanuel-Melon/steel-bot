import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function FeedbackSkeleton() {
  return (
    <Card className="bg-[#1C1C1C] border-gray-800">
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <div className="flex items-center space-x-2 mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}
