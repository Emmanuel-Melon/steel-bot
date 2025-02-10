import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RoadmapPage() {
  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-6 text-white">Roadmap</h1>
        <div className="space-y-6 text-gray-300">
          <p>We're currently working on our product roadmap. Stay tuned for updates!</p>
          <p>Our roadmap will provide insights into:</p>
          <ul className="list-disc list-inside">
            <li>Upcoming features</li>
            <li>Planned improvements</li>
            <li>Long-term project goals</li>
          </ul>
          <p>We value your input! Feel free to suggest features or improvements using our feedback system.</p>
        </div>
      </div>
    </main>
  )
}

