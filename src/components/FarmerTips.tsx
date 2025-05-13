import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertTriangle, Info } from "lucide-react"

export default function FarmerTips() {
  return (
    <div className="space-y-4">
      <Card className="border-green-300 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start">
            <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-800">Ideal Rice Planting</h4>
              <p className="text-sm text-green-700 mt-1">
                Current humidity levels are perfect for rice seedlings. Ensure proper water levels in your fields.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-300 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800">Rain Alert</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Heavy rain expected tomorrow. Consider checking drainage systems to prevent field flooding.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Sunshine Duration</h4>
              <p className="text-sm text-gray-600 mt-1">
                Today's 5.5 hours of sunshine is adequate for rice growth. No additional measures needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h4 className="font-medium mb-3">Rice Growth Calendar</h4>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[15%] w-0.5 bg-green-200"></div>

          <div className="relative pl-8 pb-6">
            <div className="absolute left-0 w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white">
              1
            </div>
            <h5 className="font-medium">Seedling Stage</h5>
            <p className="text-sm text-gray-600 mt-1">
              Requires consistent moisture and moderate sunshine. Current conditions are favorable.
            </p>
          </div>

          <div className="relative pl-8 pb-6">
            <div className="absolute left-0 w-7 h-7 rounded-full bg-green-400 flex items-center justify-center text-white">
              2
            </div>
            <h5 className="font-medium">Vegetative Stage</h5>
            <p className="text-sm text-gray-600 mt-1">
              Needs higher water levels and good sunshine. Monitor water levels daily.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 w-7 h-7 rounded-full bg-green-200 flex items-center justify-center text-gray-700">
              3
            </div>
            <h5 className="font-medium">Reproductive Stage</h5>
            <p className="text-sm text-gray-600 mt-1">
              Critical period for water management. Maintain 2-3 cm water level.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
