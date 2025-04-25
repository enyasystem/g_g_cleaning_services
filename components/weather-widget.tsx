"use client"

import { useState } from "react"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function WeatherWidget() {
  const [weather, setWeather] = useState({
    location: "Lagos, Nigeria",
    temperature: 28,
    condition: "Partly Cloudy",
    icon: "cloud",
  })

  // In a real app, you would fetch weather data from an API
  // This is just a mock implementation

  const getWeatherIcon = () => {
    switch (weather.icon) {
      case "sun":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "wind":
        return <Wind className="h-8 w-8 text-gray-500" />
      case "cloud":
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">{weather.location}</h3>
            <p className="text-xs text-muted-foreground">{weather.condition}</p>
          </div>
          <div className="flex items-center">
            {getWeatherIcon()}
            <span className="text-2xl font-bold ml-2">{weather.temperature}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
