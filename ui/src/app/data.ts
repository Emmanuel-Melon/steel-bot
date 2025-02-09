import type { Column, FeedbackItem } from "./types"

const feedbackItems: FeedbackItem[] = [
  {
    id: "1",
    title: "Add dark mode support",
    content: "Would be great to have a dark mode option for better visibility at night.",
    type: "feature",
    status: "in-progress",
    votes: 42,
    createdAt: "2024-02-01",
    githubIssue: "steel-dev/feedback#123",
    tags: ["ui", "theme"],
  },
  {
    id: "2",
    title: "Browser agent crashes on complex workflows",
    content: "The browser agent stops responding when handling multiple parallel tasks.",
    type: "bug",
    status: "open",
    votes: 15,
    createdAt: "2024-02-05",
    githubIssue: "steel-dev/feedback#124",
    tags: ["agent", "critical"],
  },
  {
    id: "3",
    title: "How to implement custom agents?",
    content: "Looking for documentation on creating custom agents.",
    type: "question",
    status: "resolved",
    votes: 8,
    createdAt: "2024-02-07",
    tags: ["documentation", "agents"],
  },
  {
    id: "4",
    title: "Great tool for automation!",
    content: "Really enjoying using this for my workflow automation.",
    type: "general",
    status: "closed",
    votes: 23,
    createdAt: "2024-02-03",
    tags: ["feedback"],
  },
  {
    id: "5",
    title: "Support for custom scripts",
    content: "Would love to be able to inject custom scripts into the workflow.",
    type: "feature",
    status: "open",
    votes: 31,
    createdAt: "2024-02-06",
    githubIssue: "steel-dev/feedback#125",
    tags: ["enhancement", "scripts"],
  },
]

export const columns: Column[] = [
  {
    id: "feature",
    title: "Feature Requests",
    items: feedbackItems.filter((item) => item.type === "feature"),
  },
  {
    id: "bug",
    title: "Bug Reports",
    items: feedbackItems.filter((item) => item.type === "bug"),
  },
  {
    id: "question",
    title: "Questions",
    items: feedbackItems.filter((item) => item.type === "question"),
  },
  {
    id: "general",
    title: "General Feedback",
    items: feedbackItems.filter((item) => item.type === "general"),
  },
]

