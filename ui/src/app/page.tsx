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
      <nav className="bg-[#1C1C1C] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-4 flex items-baseline space-x-4">
                  <span className="font-mono text-white px-3 py-2 rounded-md text-sm font-medium">steel.feedback</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link
                  href="https://github.com/steel-dev/feedback"
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>Github Repo</span>
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <Link
                href="https://github.com/steel-dev/feedback"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Toolbar />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <FeedbackColumns columns={columns} isLoading={isLoading} />
        </div>
      </main>
    </div>
  )
}
