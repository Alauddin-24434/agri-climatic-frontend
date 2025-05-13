"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Weather icon mapping function based on Visual Crossing icon codes
const getWeatherIcon = (condition) => {
  const iconMap = {
    "clear-day": <Sun className="h-8 w-8 text-yellow-500" />,
    "clear-night": <Sun className="h-8 w-8 text-yellow-500" />,
    "partly-cloudy-day": <Cloud className="h-8 w-8 text-gray-400" />,
    "partly-cloudy-night": <Cloud className="h-8 w-8 text-gray-400" />,
    "cloudy": <Cloud className="h-8 w-8 text-gray-500" />,
    "rain": <CloudRain className="h-8 w-8 text-blue-500" />,
    "showers-day": <CloudDrizzle className="h-8 w-8 text-blue-400" />,
    "showers-night": <CloudDrizzle className="h-8 w-8 text-blue-400" />,
    "fog": <Cloud className="h-8 w-8 text-gray-300" />,
    "wind": <Cloud className="h-8 w-8 text-gray-400" />,
    "snow": <CloudRain className="h-8 w-8 text-blue-200" />,
    "thunder-rain": <CloudLightning className="h-8 w-8 text-purple-500" />,
    "thunder-showers-day": <CloudLightning className="h-8 w-8 text-purple-500" />,
    "thunder-showers-night": <CloudLightning className="h-8 w-8 text-purple-500" />,
  }

  return iconMap[condition] || <Cloud className="h-8 w-8 text-gray-400" />
}

// Get day name from date
const getDayName = (dateStr) => {
  const date = new Date(dateStr)
  const today = new Date()

  if (date.toDateString() === today.toDateString()) {
    return "আজ"
  }

  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  if (date.toDateString() === tomorrow.toDateString()) {
    return "আগামীকাল"
  }

  // Bengali day names
  const bengaliDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"]
  return bengaliDays[date.getDay()]
}

// Format date as "May 5" in Bengali
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  
  // Bengali month names
  const bengaliMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"]
  
  // Bengali digits
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  
  const day = date.getDate().toString().split('').map(d => bengaliDigits[parseInt(d)]).join('')
  
  return `${bengaliMonths[date.getMonth()]} ${day}`
}

// Determine crop impact based on weather conditions
const getCropImpact = (weather) => {
  // Rain chance
  const rainChance = weather.precipprob || 0

  // Weather condition code
  const conditionCode = weather.icon

  // Temperature
  const temp = weather.temp

  if (conditionCode.includes("thunder")) {
    // Thunderstorm
    return {
      impact: "সতর্কতা অবলম্বন করুন",
      color: "text-red-600",
    }
  } else if (rainChance > 70) {
    return {
      impact: "জল নিয়ন্ত্রণ করুন",
      color: "text-amber-600",
    }
  } else if (conditionCode.includes("rain") && rainChance > 40) {
    // Rain
    return {
      impact: "বৃদ্ধির জন্য ভালো",
      color: "text-green-600",
    }
  } else if (temp > 35) {
    return {
      impact: "তাপ চাপের ঝুঁকি",
      color: "text-red-600",
    }
  } else if (temp < 15) {
    return {
      impact: "শীত চাপের ঝুঁকি",
      color: "text-amber-600",
    }
  } else {
    return {
      impact: "অনুকূল",
      color: "text-green-600",
    }
  }
}

// Calculate sunshine hours based on weather condition
const getSunshineHours = (weather) => {
  const conditionCode = weather.icon
  const cloudCover = weather.cloudcover || 0

  // Calculate sunshine hours based on cloud cover and condition
  if (conditionCode.includes("clear")) {
    return 10
  } else if (conditionCode.includes("partly-cloudy")) {
    return 7
  } else if (conditionCode === "cloudy") {
    return 4
  } else if (conditionCode.includes("rain") || conditionCode.includes("showers")) {
    return 2
  } else if (conditionCode.includes("thunder")) {
    return 1
  }

  // Fallback calculation based on cloud cover
  return Math.round(10 * (1 - cloudCover / 100))
}

export default function WeatherForecast({ forecast }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // If no weather data is available yet
  if (!forecast|| !forecast.days) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-green-600">আবহাওয়ার তথ্য লোড হচ্ছে...</span>
      </div>
    )
  }
  
  // Process the data to match our format
  const forecastData = forecast?.days.slice(0, 15).map(day => {
    const sunshineHours = getSunshineHours(day)
    const cropImpactInfo = getCropImpact(day)

    return {
      day: getDayName(day.datetime),
      date: formatDate(day.datetime),
      icon: getWeatherIcon(day.icon),
      condition: day.conditions,
      highTemp: Math.round(day.tempmax),
      lowTemp: Math.round(day.tempmin),
      rainChance: Math.round(day.precipprob || 0),
      humidity: day.humidity,
      sunshineHours: sunshineHours,
      windSpeed: Math.round(day.windspeed), // Already in km/h
      cropImpact: cropImpactInfo.impact,
      cropImpactColor: cropImpactInfo.color,
    }
  })

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}. মক ডাটা দেখানো হচ্ছে।
        </div>
      )}

      <div className="space-y-4">
        {forecastData.map((day, index) => (
          <Card key={index} className={index === 0 ? "border-green-200 bg-green-50" : ""}>
            <CardContent className="p-4">
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-3 md:col-span-2">
                  <p className="font-medium">{day.day}</p>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>

                <div className="col-span-2 md:col-span-1 flex justify-center">{day.icon}</div>

                <div className="col-span-7 md:col-span-3">
                  <p className="font-medium">{day.condition}</p>
                  <p className="text-sm text-gray-500">
                    {day.highTemp}°C / {day.lowTemp}°C
                  </p>
                </div>

                <div className="hidden md:block md:col-span-2">
                  <p className="text-sm font-medium">বৃষ্টি</p>
                  <div className="flex items-center">
                    <div className="w-10 h-2 bg-blue-100 rounded-full mr-2">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${day.rainChance}%` }}></div>
                    </div>
                    <span className="text-sm">{day.rainChance}%</span>
                  </div>
                </div>

                <div className="hidden md:block md:col-span-2">
                  <p className="text-sm font-medium">সূর্যালোক</p>
                  <div className="flex items-center">
                    <div className="w-10 h-2 bg-yellow-100 rounded-full mr-2">
                      <div
                        className="h-2 bg-yellow-500 rounded-full"
                        style={{ width: `${(day.sunshineHours / 12) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{day.sunshineHours} ঘন্টা</span>
                  </div>
                </div>

                <div className="hidden md:block md:col-span-2">
                  <p className="text-sm font-medium">ফসলের প্রভাব</p>
                  <p className={`text-sm ${day.cropImpactColor}`}>{day.cropImpact}</p>
                </div>
              </div>

              {index === 0 && (
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    কৃষি পরামর্শ:{" "}
                    {day.rainChance > 50
                      ? "বৃষ্টির প্রস্তুতি নিন। জল নিষ্কাশন ব্যবস্থা পরীক্ষা করুন।"
                      : "ক্ষেত পরিদর্শনের জন্য ভালো দিন। বিকেলে জলের স্তর পরীক্ষা করুন।"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
