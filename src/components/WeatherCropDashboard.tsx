import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "./ui/tabs";
import { set } from "react-hook-form";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent } from "./ui/card";
import { CloudRain, Droplets, Leaf, Sprout, Sun, Thermometer, Wind } from "lucide-react";
import { Progress } from "./ui/progress";

export default function WeatherCropDashboard() {
  const [activeTab, setActiveTab] = useState("weather");
  return (
    <Tabs defaultValue="weather" onValueChange={setActiveTab}>
      <div className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="weather">Weather Conditions</TabsTrigger>
          <TabsTrigger value="crop">Crop Health</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="weather">
        <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* temperature card */}
          <Card className="border-l-4 border-l-orange-400">
            <CardContent className="pt-6">
              {/* top */}
              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Temperature
                    </h4>
                    <p className="text-2xl font-bold">32°C</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Feels like</p>
                  <p className="font-medium">34°C</p>
                </div>
              </div>
              {/* bottom */}
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    Ideal for rice: 25-30°C
                  </span>
                  <span className="text-sm font-medium text-amber-600">
                    Slightly High
                  </span>
                </div>
                <Progress
                  value={85}
                  className="h-2 bg-orange-100 [&>div]:bg-orange-500"
                />
              </div>
            </CardContent>
          </Card>
          {/* Humidity card */}
          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="pt-6">
              {/* top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Droplets className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Humidity
                    </h4>
                    <p className="text-2xl font-bold">70%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Feels like</p>
                  <p className="font-medium">72%</p>

              </div>
              </div>
              {/* bottom */}
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Ideal: 60-80%</span>
                  <span className="text-sm font-medium text-blue-600">
                    Optimal
                  </span>
                </div>
                <Progress
                  value={70}
                  className="bg-blue-100 [&>div]:bg-blue-500 "
                />
              </div>
            </CardContent>
          </Card>
          {/* Rainfall */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="pt-6">
              {/* top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <CloudRain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Rainfall
                    </h4>
                    <p className="text-2xl font-bold">5mm</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last 24 hours</p>
                  <p className="font-medium">10mm</p>

              </div>

              </div>
              {/* bottom */}
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">
                        Ideal for rice: 5-10mm
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                        Optimal
                    </span>
                </div>
                <Progress value={65} className="h-2 bg-blue-100 [&>div]:bg-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Sun className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Sunshine</h4>
                    <p className="text-2xl font-bold">5.5 hrs</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">UV Index</p>
                  <p className="font-medium">High (8)</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Ideal: 4-6 hours</span>
                  <span className="text-sm font-medium text-green-600">Optimal</span>
                </div>
                <Progress value={(5.5 / 12) * 100} className="h-2 bg-yellow-100 [&>div]:bg-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Wind className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Wind Speed</h4>
                    <p className="text-2xl font-bold">12 km/h</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Direction</p>
                  <p className="font-medium">South-West</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Safe limit: 20 km/h</span>
                  <span className="text-sm font-medium text-green-600">Safe</span>
                </div>
                <Progress value={(12 / 30) * 100} className="h-2 bg-teal-100 [&>div]:bg-teal-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Sprout className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Growing Conditions</h4>
                    <p className="text-2xl font-bold">Excellent</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Index</p>
                  <p className="font-medium">8.5/10</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Rice growth potential</span>
                  <span className="text-sm font-medium text-green-600">High</span>
                </div>
                <Progress value={85} className="h-2 bg-green-100 [&>div]:bg-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="crop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Rice Health Index</h4>
                  <p className="text-sm text-gray-500">Based on current conditions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Water Level</span>
                    <span className="text-sm font-medium text-green-600">Good (75%)</span>
                  </div>
                  <Progress value={75} className="h-2 bg-green-100 [&>div]bg-green-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Growth Rate</span>
                    <span className="text-sm font-medium text-green-600">Excellent (90%)</span>
                  </div>
                  <Progress value={90} className="h-2 bg-green-100 [&>div]:bg-green-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Pest Risk</span>
                    <span className="text-sm font-medium text-amber-600">Moderate (45%)</span>
                  </div>
                  <Progress value={45} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Disease Risk</span>
                    <span className="text-sm font-medium text-green-600">Low (25%)</span>
                  </div>
                  <Progress value={25} className="h-2 bg-green-100 [&>div]:bg-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Sprout className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium">Current Growth Stage</h4>
                  <p className="text-sm text-gray-500">Vegetative Stage (45 days)</p>
                </div>
              </div>

              <div className="relative pt-2">
                <div className="flex mb-2">
                  <div className="flex-1 text-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 mx-auto flex items-center justify-center text-white">
                      1
                    </div>
                    <p className="text-xs mt-1">Seedling</p>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 mx-auto flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <p className="text-xs mt-1">Vegetative</p>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500">
                      3
                    </div>
                    <p className="text-xs mt-1">Reproductive</p>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500">
                      4
                    </div>
                    <p className="text-xs mt-1">Ripening</p>
                  </div>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-2 mb-6">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "45%" }}></div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h5 className="font-medium text-amber-800 mb-2">Vegetative Stage Care</h5>
                  <ul className="text-sm text-amber-700 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Maintain 2-3 cm water level in fields</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Monitor for leaf yellowing (nitrogen deficiency)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Apply second nitrogen fertilizer dose</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
