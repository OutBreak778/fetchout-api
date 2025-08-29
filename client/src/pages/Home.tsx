import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Code, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { features } from "@/config";
import InteractiveTerminal from "@/components/InteractiveTerminal";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <Loader2 className="h-12 w-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="no-scrollbar min-h-screen flex flex-col bg-white mt-16">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.01)_25%,rgba(0,0,0,0.01)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.01)_75%)] bg-[length:60px_60px]" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(0,0,0,0.01)_25%,rgba(0,0,0,0.01)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.01)_75%)] bg-[length:40px_40px]" />
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-32 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left max-w-full">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <Badge className="bg-black text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Zero Setup Required
                </Badge>
                <Badge
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 px-4 py-2 text-sm font-medium"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Global CDN
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-black mb-8">
                Build. Test. Ship APIs —{" "}
                <span className="relative inline-block">
                  <span className="relative leading-10 z-10 text-indigo-500 px-4 py-2">
                    in Minutes.
                  </span>
                  <div className="absolute inset-0 bg-black transform rotate-1 -z-10" />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                APIs. No setup. No hassle. Fetchout lets you focus on logic
                while{" "}
                <span className="font-bold text-black relative">
                  we handle everything else.
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-black opacity-20" />
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-black"
                  asChild
                >
                  {isAuthenticated ? (
                    <Link to="/dashboard" className="flex items-center">
                      Dashboard
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Link>
                  ) : (
                    <Link to="/login" className="flex items-center">
                      Get Started
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Link>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-10 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <Link to="/documentation" className="flex items-center">
                  <Code className="w-5 h-5 mr-3" />
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Interactive Terminal */}
            <div className="w-full lg:flex-1 max-w-full lg:max-w-2xl xl:max-w-4xl">
              <InteractiveTerminal />

              <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
                <p className="text-xs sm:text-sm text-gray-600 font-medium px-4">
                  ✨{" "}
                  <span className="font-bold text-black">
                    Real API endpoint
                  </span>{" "}
                  • No setup required • Start building now
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ship APIs like a
              <span className="relative inline-block">
                <span className="relative z-10 text-white bg-black px-4 py-2">
                  10x developer
                </span>
                <div className="absolute inset-0 bg-white transform -rotate-1 -z-10" />
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stop wrestling with infrastructure. Start building features that
              matter.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 hover:border-black"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%)] bg-[length:20px_20px] opacity-50" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex w-16 h-16 rounded-2xl bg-black p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className="text-xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t-2 border-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row space-y-3 md:items-center justify-between w-full">
          <p className="text-black font-medium flex flex-col">
            <span>
            &copy; {new Date().getFullYear()} Fetchout. All rights reserved.
            </span>
            <span className="block text-sm font-normal">outbreak@gmail.com</span>
          </p>
          <div className="flex items-center gap-2 text-black font-bold">
            <span className="text-2xl">❤️</span>
            <span>By</span>
            <span className="bg-black text-white px-3 py-1 rounded font-black">
              OUTBREAK
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
