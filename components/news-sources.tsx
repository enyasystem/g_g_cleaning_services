const sources = [
  {
    name: "The Guardian",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://guardian.ng",
    color: "bg-green-600",
    abbr: "G",
  },
  {
    name: "Punch",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://punchng.com",
    color: "bg-red-600",
    abbr: "P",
  },
  {
    name: "Vanguard",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://vanguardngr.com",
    color: "bg-blue-600",
    abbr: "V",
  },
  {
    name: "Premium Times",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://premiumtimesng.com",
    color: "bg-purple-600",
    abbr: "PT",
  },
  {
    name: "Channels TV",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://channelstv.com",
    color: "bg-green-600",
    abbr: "C",
  },
  {
    name: "CNN Africa",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://edition.cnn.com/africa",
    color: "bg-red-600",
    abbr: "CNN",
  },
  {
    name: "BBC Pidgin",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://www.bbc.com/pidgin",
    color: "bg-red-700",
    abbr: "BBC",
  },
  {
    name: "ThisDay",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://www.thisdaylive.com",
    color: "bg-blue-700",
    abbr: "TD",
  },
  {
    name: "Daily Trust",
    logo: "/placeholder.svg?height=80&width=80",
    url: "https://dailytrust.com",
    color: "bg-green-700",
    abbr: "DT",
  },
]

export default function NewsSources() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Nigerian & International News Sources</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {sources.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div
              className={`w-16 h-16 ${source.color} rounded-full mb-2 flex items-center justify-center font-bold text-white`}
            >
              {source.abbr}
            </div>
            <span className="text-sm font-medium text-center">{source.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
