"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import { CloudRain, Droplets, Leaf, Sprout, Sun, Thermometer, Wind } from 'lucide-react'
import { Progress } from "./ui/progress"

// Function to calculate crop health based on weather conditions
const calculateCropHealth = (weatherData:any) => {
  if (!weatherData) return null;
  
  // Extract relevant weather data
  const temp = weatherData.temp || 30;
  const humidity = weatherData.humidity || 70;
  const precip = weatherData.precip || 0;
  const cloudcover = weatherData.cloudcover || 50;
  
  // Calculate growth rate based on temperature and humidity
  let growthRate = 80; // Base value
  
  // Adjust for temperature (rice grows best between 25-30°C)
  if (temp > 35) {
    growthRate -= 15; // Too hot
  } else if (temp < 20) {
    growthRate -= 20; // Too cold
  } else if (temp >= 25 && temp <= 30) {
    growthRate += 10; // Optimal
  }
  
  // Adjust for humidity (rice prefers 70-80% humidity)
  if (humidity > 85) {
    growthRate -= 5; // Too humid
  } else if (humidity < 60) {
    growthRate -= 10; // Too dry
  } else if (humidity >= 70 && humidity <= 80) {
    growthRate += 5; // Optimal
  }
  
  // Calculate pest risk based on temperature and humidity
  let pestRisk = 30; // Base value
  
  // High humidity and temperature increase pest risk
  if (humidity > 80 && temp > 30) {
    pestRisk += 25;
  } else if (humidity > 70 && temp > 28) {
    pestRisk += 15;
  }
  
  // Calculate disease risk based on humidity and precipitation
  let diseaseRisk = 20; // Base value
  
  // High humidity and rainfall increase disease risk
  if (humidity > 85 && precip > 5) {
    diseaseRisk += 30;
  } else if (humidity > 75 && precip > 2) {
    diseaseRisk += 15;
  }
  
  // Calculate water level based on precipitation and cloud cover
  let waterLevel = 65; // Base value
  
  if (precip > 10) {
    waterLevel += 25;
  } else if (precip > 5) {
    waterLevel += 15;
  } else if (precip < 1 && cloudcover < 30) {
    waterLevel -= 10; // Sunny and dry
  }
  
  // Ensure values are within 0-100 range
  growthRate = Math.max(0, Math.min(100, growthRate));
  pestRisk = Math.max(0, Math.min(100, pestRisk));
  diseaseRisk = Math.max(0, Math.min(100, diseaseRisk));
  waterLevel = Math.max(0, Math.min(100, waterLevel));
  
  return {
    riceHealthIndex: {
      waterLevel,
      growthRate,
      pestRisk,
      diseaseRisk
    },
    growthStage: "বৃদ্ধি পর্যায় (৪৫ দিন)" // Vegetative Stage (45 days)
  };
};

interface WeatherData {
  currentConditions: {
    temp: number;
    feelslike: number;
    humidity: number;
    precip: number;
    precipprob?: number;
    cloudcover: number;
    windspeed: number;
    winddir: number;
    uvindex: number;
    conditions: string;
    dew?: number;
  };
}

export default function WeatherCropDashboard({ weatherData }: { weatherData: WeatherData }) {
  const [activeTab, setActiveTab] = useState("weather");
  const [cropData, setCropData] = useState<{
    riceHealthIndex: {
      waterLevel: number;
      growthRate: number;
      pestRisk: number;
      diseaseRisk: number;
    };
    growthStage: string;
  } | null>(null);
  
  useEffect(() => {
    if (weatherData && weatherData?.currentConditions) {
      // Calculate crop health based on current weather conditions
      const calculatedCropData = calculateCropHealth(weatherData?.currentConditions);
      setCropData(calculatedCropData);
    }
  }, [weatherData]);
  
  console.log("Weather Data:", weatherData);
  // If no weather data is available yet
  if (!weatherData || !weatherData.currentConditions) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">আবহাওয়ার তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }
  
  // Extract current weather data
  const current = weatherData.currentConditions;
  
  // Prepare data for display
  const displayData = {
    temperature: Math.round(current.temp),
    feelslike: Math.round(current.feelslike),
    humidity: Math.round(current.humidity),
    rainfall: current.precip || 0,
    sunshine: 10 - (current.cloudcover / 10), // Estimate sunshine hours based on cloud cover
    windSpeed: Math.round(current.windspeed),
    uvIndex: current.uvindex
  };

  return (
    <Tabs defaultValue="weather" onValueChange={setActiveTab}>
      <div className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="weather">আবহাওয়া</TabsTrigger>
          <TabsTrigger value="crop">ফসলের স্বাস্থ্য</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="weather">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">



          {/* Temperature card */}
          <Card className="border-l-4 border-l-orange-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">তাপমাত্রা</h4>
                    <p className="text-2xl font-bold">{displayData.temperature}°C</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">অনুভূত তাপমাত্রা</p>
                  <p className="font-medium">{displayData.feelslike}°C</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">চালের জন্য আদর্শ: ২৫-৩০°C</span>
                  <span className="text-sm font-medium text-amber-600">
                    {displayData.temperature > 35 ? "অত্যধিক উষ্ণ" : 
                     displayData.temperature > 30 ? "সামান্য বেশি" : 
                     displayData.temperature < 20 ? "অত্যধিক শীতল" : "অনুকূল"}
                  </span>
                </div>
                <Progress
                  value={(displayData.temperature / 40) * 100}
                  className="h-2 bg-orange-100 [&>div]:bg-orange-500"
       
                />
              </div>
            </CardContent>
          </Card>

          {/* Humidity card */}
          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Droplets className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">আর্দ্রতা</h4>
                    <p className="text-2xl font-bold">{displayData.humidity}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">শিশির বিন্দু</p>
                  <p className="font-medium">{current.dew}°C</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">আদর্শ: ৬০-৮০%</span>
                  <span className="text-sm font-medium text-blue-600">
                    {displayData.humidity > 85 ? "অত্যধিক আর্দ্র" : 
                     displayData.humidity < 60 ? "শুষ্ক" : "অনুকূল"}
                  </span>
                </div>
                <Progress 
                  value={displayData.humidity} 
                  className="h-2 bg-blue-100 [&>div]:bg-blue-500"
                
                />
              </div>
            </CardContent>
          </Card>

          {/* Rainfall */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <CloudRain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">বৃষ্টি</h4>
                    <p className="text-2xl font-bold">{displayData.rainfall}mm</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">সম্ভাবনা</p>
                  <p className="font-medium">{current.precipprob || 0}%</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">চালের জন্য আদর্শ: ৫-১০mm</span>
                  <span className="text-sm font-medium text-blue-600">
                    {displayData.rainfall > 20 ? "অত্যধিক" : 
                     displayData.rainfall > 10 ? "পর্যাপ্ত" : 
                     displayData.rainfall > 0 ? "অনুকূল" : "শুষ্ক"}
                  </span>
                </div>
                <Progress
                  value={(displayData.rainfall / 10) * 100}
                  className="h-2 bg-blue-100 [&>div]:bg-blue-600"
             
                />
              </div>
            </CardContent>
          </Card>

          {/* Sunshine */}
          <Card className="border-l-4 border-l-yellow-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Sun className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">সূর্যালোক</h4>
                    <p className="text-2xl font-bold">{displayData.sunshine.toFixed(1)} hrs</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">UV ইনডেক্স</p>
                  <p className="font-medium">{displayData.uvIndex || 0}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">আদর্শ: ৪-৬ ঘণ্টা</span>
                  <span className="text-sm font-medium text-green-600">
                    {displayData.sunshine > 8 ? "অত্যধিক" : 
                     displayData.sunshine > 6 ? "পর্যাপ্ত" : 
                     displayData.sunshine > 3 ? "অনুকূল" : "অপর্যাপ্ত"}
                  </span>
                </div>
                <Progress 
                  value={(displayData.sunshine / 12) * 100} 
                  className="h-2 bg-yellow-100 [&>div]:bg-yellow-500"
                
                />
              </div>
            </CardContent>
          </Card>

          {/* Wind Speed */}
          <Card className="border-l-4 border-l-teal-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Wind className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">বাতাসের গতি</h4>
                    <p className="text-2xl font-bold">{displayData.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">দিক</p>
                  <p className="font-medium">{current.winddir}°</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">আদর্শ: ১০-২০ km/h</span>
                  <span className="text-sm font-medium text-teal-600">
                    {displayData.windSpeed > 25 ? "অত্যধিক" : 
                     displayData.windSpeed > 20 ? "সতর্কতা" : 
                     displayData.windSpeed < 5 ? "কম" : "অনুকূল"}
                  </span>
                </div>
                <Progress
                  value={(displayData.windSpeed / 30) * 100}
                  className="h-2 bg-teal-100 [&>div]:bg-teal-500"
          
                />
              </div>
            </CardContent>
          </Card>

          {/* Weather Condition */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Sprout className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">আবহাওয়ার অবস্থা</h4>
                    <p className="text-2xl font-bold">{current.conditions}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">মেঘাচ্ছন্নতা</p>
                  <p className="font-medium">{current.cloudcover}%</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">ফসলের জন্য প্রভাব</span>
                  <span className="text-sm font-medium text-green-600">
                    {current.conditions.includes("rain") ? "বৃষ্টিযুক্ত" : 
                     current.conditions.includes("cloud") ? "মেঘলা" : 
                     current.conditions.includes("clear") ? "পরিষ্কার" : "মিশ্র"}
                  </span>
                </div>
                <Progress
                  value={100 - current.cloudcover}
                  className="h-2 bg-green-100 [&>div]:bg-green-500"
                
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Crop Health */}
      <TabsContent value="crop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cropData && (
            <>
              {/* Rice Health Index */}
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Leaf className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">চালের স্বাস্থ্য সূচক</h4>
                      <p className="text-2xl font-bold">{cropData.riceHealthIndex.growthRate}%</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">বৃদ্ধির হার</span>
                      <span className="text-sm font-medium text-green-600">
                        {cropData.riceHealthIndex.growthRate > 80 ? "উত্তম" : 
                         cropData.riceHealthIndex.growthRate > 60 ? "ভালো" : 
                         cropData.riceHealthIndex.growthRate > 40 ? "মাঝারি" : "খারাপ"}
                      </span>
                    </div>
                    <Progress
                      value={cropData.riceHealthIndex.growthRate}
                      className="h-2 bg-green-100    [&>div]:bg-green-500"
                    
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Water Level */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Droplets className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">জলের স্তর</h4>
                      <p className="text-2xl font-bold">{cropData.riceHealthIndex.waterLevel}%</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">জলের পরিমাণ</span>
                      <span className="text-sm font-medium text-blue-600">
                        {cropData.riceHealthIndex.waterLevel > 80 ? "অত্যধিক" : 
                         cropData.riceHealthIndex.waterLevel > 60 ? "পর্যাপ্ত" : 
                         cropData.riceHealthIndex.waterLevel > 40 ? "মাঝারি" : "অপর্যাপ্ত"}
                      </span>
                    </div>
                    <Progress
                      value={cropData.riceHealthIndex.waterLevel}
                      className="h-2 bg-blue-100 [&>div]:bg-blue-500"
                    
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pest Risk */}
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Sprout className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">পোকামাকড়ের ঝুঁকি</h4>
                      <p className="text-2xl font-bold">{cropData.riceHealthIndex.pestRisk}%</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">ঝুঁকির মাত্রা</span>
                      <span className="text-sm font-medium text-red-600">
                        {cropData.riceHealthIndex.pestRisk > 70 ? "অত্যধিক" : 
                         cropData.riceHealthIndex.pestRisk > 50 ? "উচ্চ" : 
                         cropData.riceHealthIndex.pestRisk > 30 ? "মাঝারি" : "কম"}
                      </span>
                    </div>
                    <Progress
                      value={cropData.riceHealthIndex.pestRisk}
                      className="h-2 bg-red-100 [&>div]:bg-red-500"
                    
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Disease Risk */}
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Sprout className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">রোগের ঝুঁকি</h4>
                      <p className="text-2xl font-bold">{cropData.riceHealthIndex.diseaseRisk}%</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">ঝুঁকির মাত্রা</span>
                      <span className="text-sm font-medium text-purple-600">
                        {cropData.riceHealthIndex.diseaseRisk > 70 ? "অত্যধিক" : 
                         cropData.riceHealthIndex.diseaseRisk > 50 ? "উচ্চ" : 
                         cropData.riceHealthIndex.diseaseRisk > 30 ? "মাঝারি" : "কম"}
                      </span>
                    </div>
                    <Progress
                      value={cropData.riceHealthIndex.diseaseRisk}
                      className="h-2 bg-purple-100 [&>div]:bg-purple-500"
                   
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Growth Stage */}
              <Card className="border-l-4 border-l-amber-500 md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Leaf className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">বর্তমান বৃদ্ধি পর্যায়</h4>
                      <p className="text-xl font-bold">{cropData.growthStage}</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-amber-50 p-4 rounded-lg">
                    <h5 className="font-medium text-amber-800 mb-2">বৃদ্ধি পর্যায়ের যত্ন</h5>
                    <ul className="text-sm text-amber-700 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>ক্ষেতে ২-৩ সেমি জলের স্তর বজায় রাখুন</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>পাতার হলুদ হওয়া (নাইট্রোজেন ঘাটতি) পর্যবেক্ষণ করুন</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>দ্বিতীয় নাইট্রোজেন সার প্রয়োগ করুন</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
