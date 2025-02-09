import { ArrowUpCircle, GitPullRequest, Plus, GitFork } from "lucide-react"
import { Message } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function FeedbackCard({ item }: { item: Message }) {
  const statusColors = {
    resolved: "bg-green-500/10 text-green-500",
    unresolved: "bg-gray-500/10 text-gray-500",
  }

  return (
    <Card className="bg-[#1C1C1C] border-gray-800">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-white line-clamp-2">
            {item.content.split('\n')[0]}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Badge variant="outline" className={statusColors[item.resolved ? 'resolved' : 'unresolved']}>
            {item.resolved ? 'Resolved' : 'Open'}
          </Badge>
          <span className="text-gray-500">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-400 line-clamp-2">
          {item.content.split('\n').slice(1).join('\n') || item.content}
        </p>
        <div className="flex flex-wrap gap-2">
          {item?.categories?.map((category, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      {item.solution ? (
        <CardFooter>
          <div className="w-full text-sm text-gray-400">
            <span className="font-medium text-white">Solution:</span> {item.solution}
          </div>
        </CardFooter>
      ) : (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full hover:text-white border-gray-700">
            <Plus className="w-4 h-4 mr-1" />
            Add Solution
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
