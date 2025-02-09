import { ArrowUpCircle, GitPullRequest, LinkIcon } from "lucide-react"
import type { FeedbackItem } from "@/app/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function FeedbackCard({ item }: { item: FeedbackItem }) {
  const statusColors = {
    open: "bg-green-500/10 text-green-500",
    "in-progress": "bg-blue-500/10 text-blue-500",
    resolved: "bg-purple-500/10 text-purple-500",
    closed: "bg-gray-500/10 text-gray-500",
  }

  return (
    <Card className="bg-[#1C1C1C] border-gray-800">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-white line-clamp-2">{item.title}</h3>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowUpCircle className="w-4 h-4 mr-1" />
            {item.votes}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 line-clamp-2">{item.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={statusColors[item.status]}>
            {item.status}
          </Badge>
          <span className="text-xs text-gray-500">{item.createdAt}</span>
        </div>
        {item.githubIssue && (
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <GitPullRequest className="w-4 h-4 mr-1" />
            <LinkIcon className="w-3 h-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

