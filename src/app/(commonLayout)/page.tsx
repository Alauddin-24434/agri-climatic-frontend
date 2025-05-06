"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useState } from "react";
import WeatherCropDashboard from "@/components/WeatherCropDashboard";

export default function Home() {
  const [showWeatherData, setShowWeatherData] = useState(false);
  const form = useForm({
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = async (data: { location: string }) => {
    console.log("Location submitted:", data.location);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: data.location }),
      });

      const result = await response.json();
      alert(`AI Decision: ${result.decision}`);
    } catch (error) {
      console.error("Failed to fetch backend", error);
      alert("Failed to fetch decision from server");
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const locationData = await response.json();
            const city =
              locationData.city ||
              locationData.locality ||
              locationData.principalSubdivision;

            if (city) {
              form.setValue("location", city);
            } else {
              alert("Could not detect your city");
            }
          } catch (error) {
            console.error("Reverse geocoding failed", error);
            alert("Failed to get location name");
          }
        },
        (error) => {
          console.error("Geolocation error", error);
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  if (!showWeatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <section className="relative h-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
            }}
          />

          <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-center">
            <div className="max-w-3xl">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-md mx-auto">
                <p className="text-green-100 mb-8">
                  Enter your location to access personalized weather forecasts
                  and agricultural recommendations
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <MapPin className="w-5 h-5 text-green-200" />
                            </div>
                            <FormControl>
                              <Input
                                placeholder="Enter your location (e.g., Barisal)"
                                {...field}
                                aria-label="Location"
                                className="w-full bg-white/20 border border-white/30 rounded-lg py-3 pl-10 pr-3 text-white placeholder:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      className="w-full mt-4 bg-blue-900"
                      onClick={handleUseCurrentLocation}
                    >
                      Use Current Location
                    </Button>

                    <Button type="submit" className="w-full mt-4 bg-green-900">
                      Show Weather & AI Decision
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          <WeatherCropDashboard />
        </section>
      
      
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* main containt */}
      <main className="container mx-auto px-4 py-8 -mt-16 relative z-30">
        <WeatherCropDashboard />
      </main>
    </div>
  );
}
