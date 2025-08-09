import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Frown } from 'lucide-react'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Error404 = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[12rem] font-bold text-gray-200 select-none transition-all duration-1000 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            404
          </h1>
          
          {/* Floating Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`transition-all duration-1000 delay-300 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Frown className="w-16 h-16 text-gray-400 animate-bounce" />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div 
            className={`absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          <div 
            className={`absolute -bottom-4 -right-4 w-6 h-6 bg-purple-200 rounded-full transition-all duration-1000 delay-700 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          <div 
            className={`absolute top-1/2 -right-8 w-4 h-4 bg-green-200 rounded-full transition-all duration-1000 delay-900 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
        </div>

        {/* Animated Text Content */}
        <div className="space-y-6 mb-12">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-800 transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Oops! Page Not Found
          </h2>
          
          <p 
            className={`text-lg text-gray-600 max-w-md mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Animated Action Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button asChild size="lg" className="group">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
              Go Home
            </Link>
          </Button>
 
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
        </div>

 
      </div>
    </div>
  )
}
