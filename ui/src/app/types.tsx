export type FeedbackType = "feature" | "bug" | "question" | "general"
export type FeedbackStatus = "open" | "in-progress" | "resolved" | "closed"

export interface FeedbackItem {
  id: string
  title: string
  content: string
  type: FeedbackType
  status: FeedbackStatus
  votes: number
  createdAt: string
  githubIssue?: string
  tags: string[]
}

export interface Column {
  id: FeedbackType
  title: string
  items: FeedbackItem[]
}

