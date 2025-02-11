import { FeedbackCard } from "./feedback-card"
import { FeedbackSkeleton } from "./feedback-skeleton"
import { Column, Message } from "@prisma/client"
import { Plus } from "lucide-react"

interface FeedbackColumnsProps {
  columns: Column & {
    id: string;
    title: string;
    type: string; messages: Message[]
  }[];
  isLoading?: boolean;
}

export function FeedbackColumns({ columns, isLoading = false }: FeedbackColumnsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-24 h-6 bg-gray-800 rounded animate-pulse" />
              <div className="w-6 h-6 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <FeedbackSkeleton key={itemIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns?.map((column) => (
        <div key={column.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{column.title}</h2>
            <span className="text-sm text-gray-400">{column.messages.length}</span>
          </div>
          <div className="space-y-4">
            {column.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-700 rounded-lg bg-[#1C1C1C]">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  No {column.title.toLowerCase()} yet
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {column.type === "QUESTION" && "Questions from users will appear here"}
                  {column.type === "FEEDBACK" && "Feedback from users will appear here"}
                  {column.type === "FEATURE_REQUEST" && "Feature requests will appear here"}
                </p>
              </div>
            ) : (
              column.messages.map((message) => (
                <FeedbackCard key={message.id} item={message} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
