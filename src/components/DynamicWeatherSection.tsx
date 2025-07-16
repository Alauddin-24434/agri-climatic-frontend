"use client"

import { useState, useEffect } from "react"
import { Droplets, Thermometer, Sun, CloudRain, MapPin, Loader2 } from 'lucide-react'


export default function DynamicWeatherSection({ weatherData }: { weatherData: any }) {
  const [isLoading, setIsLoading] = useState(false)

  // If no weather data is available yet
  if (!weatherData || !weatherData.currentConditions) {
    return (
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10" />
        <div
          className="relative h-[300px] md:h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
        >
          <div className="container mx-auto px-4 py-12 relative z-20 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-green-300 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">আবহাওয়ার তথ্য লোড হচ্ছে...</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">agriClimaTE</h1>
              <p className="text-xl text-green-100 mb-6">চাষাবাদের জন্য আবহাওয়ার তথ্য</p>
              
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Extract current weather data
  const current = weatherData.currentConditions;
  
  // Get background image based on weather condition
  const getBackgroundImage = (condition:any) => {
    if (condition.includes("clear")) {
      return "url('/placeholder.svg?height=400&width=800')"
    } else if (condition.includes("cloud") || condition.includes("partly")) {
      return "url('/placeholder.svg?height=400&width=800')"
    } else if (condition.includes("rain") || condition.includes("shower")) {
      return "url('/placeholder.svg?height=400&width=800')"
    } else {
      return "url('/placeholder.svg?height=400&width=800')"
    }
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10" />
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-center"
        style={{ backgroundImage: getBackgroundImage(current.conditions) }}
      >
        <div className="container mx-auto px-4 py-12 relative z-20 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-green-300 mb-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">{weatherData.address}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">agriClimaTE</h1>
            <p className="text-xl text-green-100 mb-6">চাষাবাদের জন্য আবহাওয়ার তথ্য</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-300" />
                  <span className="text-sm">তাপমাত্রা</span>
                </div>
                <p className="text-2xl font-bold mt-1">{Math.round(current.temp)}°C</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-300" />
                  <span className="text-sm">আর্দ্রতা</span>
                </div>
                <p className="text-2xl font-bold mt-1">{Math.round(current.humidity)}%</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-300" />
                  <span className="text-sm">বৃষ্টি</span>
                </div>
                <p className="text-2xl font-bold mt-1">{current.precip || 0}mm</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">সূর্যালোক</span>
                </div>
                <p className="text-2xl font-bold mt-1">{(10 - (current.cloudcover / 10)).toFixed(1)} hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
