"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, Cloud, CloudRain, Leaf, MapPin, Sun, Wind } from "lucide-react";
import { useState } from "react";
import WeatherCropDashboard from "@/components/WeatherCropDashboard";

import { useGetWeatherDataQuery } from "@/redux/features/weather/weatherApi";
import DynamicWeatherSection from "@/components/DynamicWeatherSection";
import WeatherForecast from "@/components/WeatherForecast";

import CropRecommendations from "@/components/CropRecommendations";
import SoilConditions from "@/components/SoilConditions";

export default function Home() {
  const [location, setLocation] = useState(""); // track selected location
  const [showWeatherData, setShowWeatherData] = useState(false);
  const [aiDecision, setAIDecision] = useState("");

  const form = useForm({
    defaultValues: {
      location: "",
    },
  });

  // only fetch when location is set
  const {
    data: weatherData,
    isLoading,
    error,
  } = useGetWeatherDataQuery(location, {
    skip: !location, // skip API call until we have a location
  });

  const onSubmit = (data: { location: string }) => {
    if (!data.location) {
      alert("Please enter a location");
      return;
    }

    setLocation(data.location);
    setShowWeatherData(true);
    // you can update this line to process `weatherData` or send `data` to AI model
    setAIDecision(
      "Based on weather, suitable crops are: Rice, Jute, and Maize."
    );
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
              setLocation(city); // trigger weather data fetch
              setShowWeatherData(true);
              setAIDecision(
                "AI recommendation based on your current location."
              );
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
        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
            }}
          />

          {/* Animated Weather Icons */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <Cloud className="absolute text-white/10 h-24 w-24 animate-float-slow top-1/4 left-1/4" />
            <Sun className="absolute text-yellow-500/10 h-32 w-32 animate-float-medium top-1/3 right-1/4" />
            <CloudRain className="absolute text-blue-500/10 h-28 w-28 animate-float-fast bottom-1/3 left-1/3" />
            <Wind className="absolute text-white/10 h-20 w-20 animate-float-medium bottom-1/4 right-1/3" />
            <Leaf className="absolute text-green-500/10 h-16 w-16 animate-float-slow top-1/2 left-1/2" />
          </div>

          <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                agriClimaTE
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-12">
                চাষাবাদের জন্য আবহাওয়ার তথ্য
              </p>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  শুরু করুন
                </h2>
                <p className="text-green-100 mb-8">
                  আপনার অবস্থান দিন এবং আবহাওয়ার পূর্বাভাস এবং কৃষি সংক্রান্ত
                  পরামর্শ পান
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

              <div className="mt-12 flex flex-wrap justify-center gap-8">
                <div className="flex items-center text-white">
                  <Calendar className="h-5 w-5 mr-2 text-green-300" />
                  <span>৫-দিনের পূর্বাভাস </span>
                </div>
                <div className="flex items-center text-white">
                  <Leaf className="h-5 w-5 mr-2 text-green-300" />
                  <span>ফসলের পরামর্শ</span>
                </div>
                <div className="flex items-center text-white">
                  <Cloud className="h-5 w-5 mr-2 text-green-300" />
                  <span>মাটির অবস্থা</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              আবহাওয়ার তথ্য দিয়ে স্মার্ট চাষাবাদ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CloudRain className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  আবহাওয়ার পূর্বাভাস
                </h3>
                <p className="text-gray-600">
                  কৃষি চাহিদা অনুযায়ী নির্ভুল ৫-দিনের আবহাওয়ার পূর্বাভাস পান।
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  ফসলের তথ্য
                </h3>
                <p className="text-gray-600">
                  বর্তমান এবং আসন্ন আবহাওয়ার উপর ভিত্তি করে আপনার ফসলের জন্য
                  ব্যক্তিগত পরামর্শ পান।
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  চাষের ক্যালেন্ডার
                </h3>
                <p className="text-gray-600">
                  আবহাওয়ার ধরণের সাথে সামঞ্জস্য রেখে আমাদের ইন্টারেক্টিভ চাষের
                  ক্যালেন্ডার দিয়ে আপনার কৃষি কার্যক্রম পরিকল্পনা করুন।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-green-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              কৃষকদের বিশ্বাস
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-green-800 p-6 rounded-xl">
                <p className="mb-4">
                  "agriClimaTE আমার ধান চাষের পরিকল্পনা পরিবর্তন করেছে।
                  আবহাওয়ার পূর্বাভাস সঠিক এবং ফসলের পরামর্শগুলি অমূল্য।"
                </p>
                <p className="font-semibold">- রহমান আলী, ধান চাষী</p>
              </div>

              <div className="bg-green-800 p-6 rounded-xl">
                <p className="mb-4">
                  "এই প্ল্যাটফর্ম ব্যবহার শুরু করার পর থেকে আমি আমার ফসলের ফলন
                  ২০% বাড়িয়েছি। মাটির অবস্থার তথ্যগুলি একদম সঠিক!"
                </p>
                <p className="font-semibold">- ফাতিমা বেগম, কৃষি সমবায়</p>
              </div>

              <div className="bg-green-800 p-6 rounded-xl">
                <p className="mb-4">
                  "আবহাওয়ার সতর্কতা বহুবার আমার ফসল বাঁচিয়েছে। এটি যেকোনো
                  গুরুতর কৃষকের জন্য একটি অপরিহার্য টুল।"
                </p>
                <p className="font-semibold">- কামাল হোসেন, সবজি চাষী</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">agriClimaTE</h3>
                <p className="text-green-200">
                  কৃষকদের আবহাওয়া-সচেতন সিদ্ধান্ত নিতে সাহায্য করে ভালো ফসলের
                  ফলন পেতে।
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">দ্রুত লিঙ্ক</h3>
                <ul className="space-y-2 text-green-200">
                  <li>
                    <a href="#" className="hover:text-white">
                      আবহাওয়ার পূর্বাভাস
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      ফসলের ক্যালেন্ডার
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      মাটির বিশ্লেষণ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      সাহায্য কেন্দ্র
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">যোগাযোগ করুন</h3>
                <p className="text-green-200">
                  আপডেট এবং কৃষি টিপস পেতে আমাদের অনুসরণ করুন
                </p>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-green-200 hover:text-white">
                    ফেসবুক
                  </a>
                  <a href="#" className="text-green-200 hover:text-white">
                    টুইটার
                  </a>
                  <a href="#" className="text-green-200 hover:text-white">
                    ইনস্টাগ্রাম
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-200">
              <p>
                &copy; {new Date().getFullYear()} agriClimaTE. সর্বস্বত্ব
                সংরক্ষিত।
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Hero Section with Weather Overview */}
      <DynamicWeatherSection weatherData={weatherData?.data} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 -mt-16 relative z-30">
        {/* Weather & Crop Dashboard */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-xl p-6 border border-green-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-green-800">
                  আবহাওয়া এবং ফসলের ড্যাশবোর্ড
                </h2>
                <p className="text-gray-600">
                  আজকের অবস্থা - সর্বোত্তম চাষের জন্য
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span className="text-sm text-gray-500">
                  সর্বশেষ আপডেট: আজ,{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <div className="px-3 py-1 bg-green-100 rounded-full text-green-800 text-sm font-medium">
                  ধান চাষের মৌসুম
                </div>
              </div>
            </div>
            <WeatherCropDashboard weatherData={weatherData?.data} />
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Forecast */}
            <section>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-50">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    ৫-দিনের আবহাওয়ার পূর্বাভাস
                  </h2>
                </div>
                <WeatherForecast forecast={weatherData?.data} />
              </div>
            </section>

         
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-8">
            {/* Soil Conditions */}
            <section>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  মাটির অবস্থা
                </h2>
                <SoilConditions />
              </div>
            </section>

            {/* Crop Recommendations */}
            <section>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  ফসলের পরামর্শ
                </h2>
                <CropRecommendations />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">agriClimaTE</h3>
              <p className="text-green-200">
                কৃষকদের আবহাওয়া-সচেতন সিদ্ধান্ত নিতে সাহায্য করে ভালো ফসলের ফলন
                পেতে।
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">দ্রুত লিঙ্ক</h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <a href="#" className="hover:text-white">
                    আবহাওয়ার পূর্বাভাস
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    ফসলের ক্যালেন্ডার
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    মাটির বিশ্লেষণ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    সাহায্য কেন্দ্র
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">যোগাযোগ করুন</h3>
              <p className="text-green-200">
                আপডেট এবং কৃষি টিপস পেতে আমাদের অনুসরণ করুন
              </p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-green-200 hover:text-white">
                  ফেসবুক
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  টুইটার
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  ইনস্টাগ্রাম
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-200">
            <p>
              &copy; {new Date().getFullYear()} agriClimaTE. সর্বস্বত্ব
              সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
