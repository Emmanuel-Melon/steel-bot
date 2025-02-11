 "use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useGuildChannels } from "@/app/hooks/use-channels"
import { useServer } from "@/app/hooks/use-server"

export default function ManagePage() {
  const serverId = process.env.NEXT_PUBLIC_DISCORD_SERVER_ID || "";
  const { data: server, isLoading: isLoadingServer } = useServer(serverId);
  const { data: channels, isLoading: isLoadingChannels } = useGuildChannels(serverId);
  
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [customEmojis, setCustomEmojis] = useState({
    bug: "🐛",
    feature: "🚀",
    question: "❓",
  })

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId) ? prev.filter((id) => id !== channelId) : [...prev, channelId],
    )
  }

  const handleEmojiChange = (key: keyof typeof customEmojis, value: string) => {
    setCustomEmojis((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted configuration:", {
      serverId,
      channels: selectedChannels,
      emojis: customEmojis,
    })
    // Here you would typically send this data to your backend
  }

  if (isLoadingServer || isLoadingChannels) {
    return (
      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-white">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="max-w-2xl mx-auto">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/" className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-6 text-white">Manage Discord Integration</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Server Information</h2>
          <p className="text-gray-400">{server?.name || "Unknown Server"}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Select Channels</h2>
            <div className="space-y-2">
              {channels?.map((channel) => (
                <div key={channel.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`channel-${channel.id}`}
                    checked={selectedChannels.includes(channel.id)}
                    onCheckedChange={() => handleChannelToggle(channel.id)}
                  />
                  <Label htmlFor={`channel-${channel.id}`} className="text-white">
                    #{channel.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Customize Emojis</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(customEmojis).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={`emoji-${key}`} className="text-white capitalize">
                    {key}
                  </Label>
                  <Input
                    id={`emoji-${key}`}
                    value={value}
                    onChange={(e) => handleEmojiChange(key as keyof typeof customEmojis, e.target.value)}
                    className="mt-1 bg-gray-800 text-white border-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Configuration
          </Button>
        </form>
      </div>
    </main>
  )
}
