"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar, Cloud, CloudRain, Leaf, MapPin, Sun, Wind } from 'lucide-react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGetWeatherDataQuery } from "@/redux/features/weather/weatherApi"
import DynamicWeatherSection from "@/components/DynamicWeatherSection"
import WeatherCropDashboard from "@/components/WeatherCropDashboard"
import WeatherForecast from "@/components/WeatherForecast"
import SoilConditions from "@/components/SoilConditions"
import CropRecommendations from "@/components/CropRecommendations"

export default function Home() {
  const [location, setLocation] = useState("")
  const [showWeatherData, setShowWeatherData] = useState(false)
  const [aiDecision, setAIDecision] = useState("")
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const form = useForm({
    defaultValues: {
      location: "",
    },
  })

  // only fetch when location is set
  const {
    data: weatherData,
    isLoading,
    error,
  } = useGetWeatherDataQuery(location, {
    skip: !location || location.length === 0, // skip API call until we have a location
  })

  const onSubmit = (data: { location: string }) => {
    if (!data.location) {
      alert("Please enter a location")
      return
    }

    setLocation(data.location)
    setShowWeatherData(true)
    setAIDecision("Based on weather, suitable crops are: Rice, Jute, and Maize.")
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            )
            const locationData = await response.json()
            const city = locationData.city || locationData.locality || locationData.principalSubdivision

            if (city) {
              form.setValue("location", city)
              setLocation(city)
              setShowWeatherData(true)
              setAIDecision("AI recommendation based on your current location.")
            } else {
              alert("Could not detect your city")
            }
          } catch (error) {
            console.error("Reverse geocoding failed", error)
            alert("Failed to get location name")
          }
        },
        (error) => {
          console.error("Geolocation error", error)
          alert("Unable to retrieve your location")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  if (!showWeatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 overflow-hidden">
        {/* Hero Section with Parallax Effect */}
        <section className="relative h-screen">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
              y: scrollY * 0.2, // Parallax effect
            }}
          />

          {/* Animated Weather Icons with more complex animations */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 0.1,
                y: [0, 20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
              className="absolute top-1/4 left-1/4"
            >
              <Cloud className="text-white h-24 w-24" />
            </motion.div>

            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 0.1,
                x: [0, 30, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
                times: [0, 0.5, 1],
              }}
              className="absolute top-1/3 right-1/4"
            >
              <Sun className="text-yellow-500 h-32 w-32" />
            </motion.div>

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 0.1,
                x: [0, -20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1,
                times: [0, 0.5, 1],
              }}
              className="absolute bottom-1/3 left-1/3"
            >
              <CloudRain className="text-blue-500 h-28 w-28" />
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 0.1,
                y: [0, -15, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 22,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.5,
                times: [0, 0.5, 1],
              }}
              className="absolute bottom-1/4 right-1/3"
            >
              <Wind className="text-white h-20 w-20" />
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.1,
                y: [0, 10, 0],
                x: [0, 10, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 2,
                times: [0, 0.5, 1],
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Leaf className="text-green-500 h-16 w-16" />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-center">
            <motion.div
              className="max-w-3xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                agriClimaTE
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-green-100 mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                চাষাবাদের জন্য আবহাওয়ার তথ্য
              </motion.p>

              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-md mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <h2 className="text-2xl font-semibold text-white mb-6">শুরু করুন</h2>
                <p className="text-green-100 mb-8">আপনার অবস্থান দিন এবং আবহাওয়ার পূর্বাভাস এবং কৃষি সংক্রান্ত পরামর্শ পান</p>

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

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        className="w-full mt-4 bg-blue-900 hover:bg-blue-800 text-white transition-colors duration-300"
                        onClick={handleUseCurrentLocation}
                      >
                        Use Current Location
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full mt-4 bg-green-900 text-white hover:bg-green-800 transition-colors duration-300"
                      >
                        Show Weather & AI Decision
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>

              <motion.div
                className="mt-12 flex flex-wrap justify-center gap-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.div
                  className="flex items-center text-white"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Calendar className="h-5 w-5 mr-2 text-green-300" />
                  <span>৫-দিনের পূর্বাভাস </span>
                </motion.div>
                <motion.div
                  className="flex items-center text-white"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Leaf className="h-5 w-5 mr-2 text-green-300" />
                  <span>ফসলের পরামর্শ</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-white"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Cloud className="h-5 w-5 mr-2 text-green-300" />
                  <span>মাটির অবস্থা</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with Staggered Animation */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center text-gray-800 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              আবহাওয়ার তথ্য দিয়ে স্মার্ট চাষাবাদ
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-green-50 rounded-xl p-6 border border-green-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CloudRain className="h-6 w-6 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">আবহাওয়ার পূর্বাভাস</h3>
                <p className="text-gray-600">কৃষি চাহিদা অনুযায়ী নির্ভুল ৫-দিনের আবহাওয়ার পূর্বাভাস পান।</p>
              </motion.div>

              <motion.div
                className="bg-blue-50 rounded-xl p-6 border border-blue-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Leaf className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">ফসলের তথ্য</h3>
                <p className="text-gray-600">বর্তমান এবং আসন্ন আবহাওয়ার উপর ভিত্তি করে আপনার ফসলের জন্য ব্যক্তিগত পরামর্শ পান।</p>
              </motion.div>

              <motion.div
                className="bg-amber-50 rounded-xl p-6 border border-amber-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Calendar className="h-6 w-6 text-amber-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">চাষের ক্যালেন্ডার</h3>
                <p className="text-gray-600">
                  আবহাওয়ার ধরণের সাথে সামঞ্জস্য রেখে আমাদের ইন্টারেক্টিভ চাষের ক্যালেন্ডার দিয়ে আপনার কৃষি কার্যক্রম পরিকল্পনা করুন।
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials with Scroll Animation */}
        <section className="py-20 bg-green-900 text-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              কৃষকদের বিশ্বাস
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                className="bg-green-800 p-6 rounded-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <p className="mb-4">
                  "agriClimaTE আমার ধান চাষের পরিকল্পনা পরিবর্তন করেছে। আবহাওয়ার পূর্বাভাস সঠিক এবং ফসলের পরামর্শগুলি অমূল্য।"
                </p>
                <p className="font-semibold">- রহমান আলী, ধান চাষী</p>
              </motion.div>

              <motion.div
                className="bg-green-800 p-6 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <p className="mb-4">
                  "এই প্ল্যাটফর্ম ব্যবহার শুরু করার পর থেকে আমি আমার ফসলের ফলন ২০% বাড়িয়েছি। মাটির অবস্থার তথ্যগুলি একদম সঠিক!"
                </p>
                <p className="font-semibold">- ফাতিমা বেগম, কৃষি সমবায়</p>
              </motion.div>

              <motion.div
                className="bg-green-800 p-6 rounded-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <p className="mb-4">"আবহাওয়ার সতর্কতা বহুবার আমার ফসল বাঁচিয়েছে। এটি যেকোনো গুরুতর কৃষকের জন্য একটি অপরিহার্য টুল।"</p>
                <p className="font-semibold">- কামাল হোসেন, সবজি চাষী</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer with Staggered Animation */}
        <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">agriClimaTE</h3>
                <p className="text-green-200">কৃষকদের আবহাওয়া-সচেতন সিদ্ধান্ত নিতে সাহায্য করে ভালো ফসলের ফলন পেতে।</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">দ্রুত লিঙ্ক</h3>
                <ul className="space-y-2 text-green-200">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      আবহাওয়ার পূর্বাভাস
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      ফসলের ক্যালেন্ডার
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      মাটির বিশ্লেষণ
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      সাহায্য কেন্দ্র
                    </a>
                  </motion.li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">যোগাযোগ করুন</h3>
                <p className="text-green-200">আপডেট এবং কৃষি টিপস পেতে আমাদের অনুসরণ করুন</p>
                <div className="flex space-x-4 mt-2">
                  <motion.a
                    href="#"
                    className="text-green-200 hover:text-white"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ফেসবুক
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-green-200 hover:text-white"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    টুইটার
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-green-200 hover:text-white"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ইনস্টাগ্রাম
                  </motion.a>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="border-t border-green-700 mt-8 pt-6 text-center text-green-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p>&copy; {new Date().getFullYear()} agriClimaTE. সর্বস্বত্ব সংরক্ষিত।</p>
            </motion.div>
          </div>
        </footer>
      </div>
    )
  }

  // Weather data display section
  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dynamic Weather Section */}
        <DynamicWeatherSection weatherData={weatherData?.data} />

        {/* Main Content with Staggered Animation */}
        <motion.main
          className="container mx-auto px-4 py-8 -mt-16 relative z-30"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Weather & Crop Dashboard */}
          <motion.section
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 border border-green-100"
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-green-800">আবহাওয়া এবং ফসলের ড্যাশবোর্ড</h2>
                  <p className="text-gray-600">আজকের অবস্থা - সর্বোত্তম চাষের জন্য</p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="text-sm text-gray-500">
                    সর্বশেষ আপডেট: আজ,{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <motion.div
                    className="px-3 py-1 bg-green-100 rounded-full text-green-800 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ধান চাষের মৌসুম
                  </motion.div>
                </div>
              </div>

              <WeatherCropDashboard weatherData={weatherData?.data} />
            </motion.div>
          </motion.section>

          {/* Two Column Layout with Staggered Animation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2/3 width) */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {/* Weather Forecast */}
              <section>
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-6 border border-blue-50"
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">৫-দিনের আবহাওয়ার পূর্বাভাস</h2>
                  </div>

                  <WeatherForecast forecast={weatherData?.data} />
                </motion.div>
              </section>
            </motion.div>

            {/* Right Column (1/3 width) */}
            <motion.div
              className="space-y-8"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {/* Soil Conditions */}
              <section>
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-6 border border-amber-50"
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">মাটির অবস্থা</h2>
                  <SoilConditions />
                </motion.div>
              </section>

              {/* Crop Recommendations */}
              <section>
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-6 border border-green-50"
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">ফসলের পরামর্শ</h2>
                  <CropRecommendations />
                </motion.div>
              </section>
            </motion.div>
          </div>
        </motion.main>

        {/* Footer with Animation */}
        <motion.footer
          className="bg-gradient-to-r from-green-900 to-green-800 text-white mt-12 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">agriClimaTE</h3>
                <p className="text-green-200">কৃষকদের আবহাওয়া-সচেতন সিদ্ধান্ত নিতে সাহায্য করে ভালো ফসলের ফলন পেতে।</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">দ্রুত লিঙ্ক</h3>
                <ul className="space-y-2 text-green-200">
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      আবহাওয়ার পূর্বাভাস
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      ফসলের ক্যালেন্ডার
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      মাটির বিশ্লেষণ
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href="#" className="hover:text-white">
                      সাহায্য কেন্দ্র
                    </a>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">যোগাযোগ করুন</h3>
                <p className="text-green-200">আপডেট এবং কৃষি টিপস পেতে আমাদের অনুসরণ করুন</p>
                <div className="flex space-x-4 mt-2">
                  <motion.a
                    href="#"
                    className="text-green-200 hover:text-white"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ফেসবুক
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-green-200 hover:text-white"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    টুইটার
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-green-200 hover:text-white"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ইনস্টাগ্রাম
                  </motion.a>
                </div>
              </div>
            </div>
            <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-200">
              <p>&copy; {new Date().getFullYear()} agriClimaTE. সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  )
}
