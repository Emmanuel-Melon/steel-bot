import { Github, Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./data"
import { FeedbackCard } from "@/app/components/feedback-card"
import { Toolbar } from "@/app/components/toolbar"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-[#1C1C1C] border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span className="font-mono">steel.feedback</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="#"
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Github Repo</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Feedback</span>
          </Link>
        </div>
      </nav>

      {/* Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">{column.title}</h2>
                  <span className="text-sm text-gray-400">{column.items.length}</span>
                </div>
                <div className="space-y-4">
                  {column.items.map((item) => (
                    <FeedbackCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

