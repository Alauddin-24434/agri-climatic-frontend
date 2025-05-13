"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "./ui/progress"


export default function SoilConditions() {
  const soilData = [
    { name: "Moisture", value: 85, ideal: "80-90%", status: "Optimal", color: "bg-green-500" },
    { name: "pH Level", value: 65, ideal: "5.5-6.5", status: "Slightly High", color: "bg-amber-500" },
    { name: "Nitrogen (N)", value: 70, ideal: "Medium-High", status: "Good", color: "bg-green-500" },
    { name: "Phosphorus (P)", value: 45, ideal: "Medium", status: "Low", color: "bg-red-500" },
    { name: "Potassium (K)", value: 80, ideal: "High", status: "Optimal", color: "bg-green-500" },
  ]

  return (
    <div className="space-y-4">
      {soilData.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between">
            <div>
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-xs text-gray-500 ml-2">({item.ideal})</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                item.status === "Optimal"
                  ? "bg-green-100 text-green-800"
                  : item.status === "Good"
                    ? "bg-green-100 text-green-800"
                    : item.status === "Slightly High"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {item.status}
            </span>
          </div>
          <Progress value={item.value} className="h-2" />
        </div>
      ))}

      <Card className="mt-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-amber-800 mb-2">Soil Recommendations</h3>
          <ul className="text-sm text-amber-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Apply phosphorus fertilizer to address deficiency</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Consider lime application to lower pH slightly</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Maintain current water levels for optimal moisture</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Detailed Soil Analysis →</button>
      </div>
    </div>
  )
}
