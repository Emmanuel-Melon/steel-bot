"use client";
import { Github } from "lucide-react"
import Link from "next/link"
import { Toolbar } from "@/app/components/toolbar"
import { FeedbackColumns } from "@/app/components/feedback-columns"
import { useColumns } from "@/app/hooks/use-columns"


export default function Page() {
  const { data: columns, isLoading } = useColumns();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <FeedbackColumns columns={columns ?? []} isLoading={isLoading} />
        </div>
      </main>
    </div>
  )
}
