"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertTriangle } from "lucide-react"

export default function CropRecommendations() {
  return (
    <div className="space-y-4">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="bg-green-200 p-1.5 rounded-full mr-3 mt-0.5">
              <Check className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h4 className="font-medium text-green-800">Ideal Rice Variety</h4>
              <p className="text-sm text-green-700 mt-1">
                BRRI Dhan 29 is well-suited for current conditions. Expected yield: 6-7 tons/hectare.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="bg-amber-200 p-1.5 rounded-full mr-3 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-amber-700" />
            </div>
            <div>
              <h4 className="font-medium text-amber-800">Weather Alert</h4>
              <p className="text-sm text-amber-700 mt-1">
                Heavy rain expected on Friday. Consider checking drainage systems to prevent field flooding.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg border p-4 mt-6">
        <h4 className="font-medium mb-3">Recommended Actions</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
              <span className="text-blue-700 text-xs font-bold">1</span>
            </div>
            <div>
              <p className="font-medium">Apply second nitrogen dose</p>
              <p className="text-gray-600 text-xs">Recommended within next 3 days</p>
            </div>
          </li>

          <li className="flex items-start">
            <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
              <span className="text-blue-700 text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-medium">Monitor for stem borers</p>
              <p className="text-gray-600 text-xs">Increased risk due to current humidity</p>
            </div>
          </li>

          <li className="flex items-start">
            <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
              <span className="text-blue-700 text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-medium">Prepare for heavy rain</p>
              <p className="text-gray-600 text-xs">Check field drainage before Friday</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All Recommendations →</button>
      </div>
    </div>
  )
}
