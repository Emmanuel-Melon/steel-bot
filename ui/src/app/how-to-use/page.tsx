import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HowToUsePage() {
  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-6 text-white">How to Use Discord Reactions</h1>
        <div className="space-y-6 text-gray-300">
          <p>
            You can create GitHub issues directly from our Discord server by reacting to messages with specific emojis.
            Here's how it works:
          </p>
          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🐛</span>
              <span>React with 🐛 to create a bug report</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🚀</span>
              <span>React with 🚀 to suggest a feature</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl">❓</span>
              <span>React with ❓ to ask a question</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl">💡</span>
              <span>React with 💡 for general feedback</span>
            </div>
          </div>
          <p>
            Once you react with one of these emojis, our bot will automatically create a corresponding issue on GitHub.
            This helps us track and address feedback more efficiently.
          </p>
        </div>
      </div>
    </main>
  )
}

