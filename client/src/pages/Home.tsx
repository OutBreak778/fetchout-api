import { Badge } from "@/components/ui/badge";
import {
  Copy,
  ArrowRight,
  Zap,
  Code,
  Globe,
  BarChart3,
  Shield,
  Clock,
  // PlusCircle,
  // Key,
  // Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const apiExample = `curl https://fetchoutapi.com/api/endpoint/city-weather \\
  --cookie "sessionId"=your-session-secret-token
  `;

  const apiResponse = `{
  "city": "San Francisco",
  "temperature": "72°F",
  "condition": "Sunny",
  "humidity": "65%",
  "wind_speed": "8 mph",
  "timestamp": "2024-01-15T14:30:00Z"
}`;

  const features = [
    {
      icon: Zap,
      title: "Create in Minutes",
      description:
        "Zero config. One command. Your API is live globally with auto-scaling.",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient:
        "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
    },
    {
      icon: BarChart3,
      title: "Better Analytics",
      description:
        "Request logs, performance metrics, and error tracking in one dashboard.",
      gradient: "from-blue-400 to-purple-500",
      bgGradient:
        "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
    },
    {
      icon: Shield,
      title: "Built-in Security",
      description:
        "Rate limiting, API keys, CORS, and DDoS protection out of the box.",
      gradient: "from-green-400 to-teal-500",
      bgGradient:
        "from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20",
    },
    {
      icon: Clock,
      title: "Blazing Fast Response",
      description:
        "Sub-100ms latency across all endpoints with real-time performance monitoring.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient:
        "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    },
  ];

  // const steps = [
  //   {
  //     icon: PlusCircle,
  //     title: "Create Your API Endpoint",
  //     description:
  //       "Define methods (GET/POST), parameters, and authentication types in minutes.",
  //   },
  //   {
  //     icon: Key,
  //     title: "Integrate & Monitor Instantly",
  //     description:
  //       "Copy generated URL. Real-time logging starts immediately.",
  //   },
  //   {
  //     icon: Activity,
  //     title: "Manage & Scale with Ease",
  //     description:
  //       "Monitor usage, edit endpoints, and set rate limits from your dashboard.",
  //   },
  // ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />

        <div className="relative w-full lg:px-32 ">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mt-5">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left max-w-full px-4">
              {/* Trust Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Zero Infrastructure Setup
                </Badge>
                <Badge
                  variant="outline"
                  className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Global CDN
                </Badge>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                Build. Test. Ship APIs —{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  in Minutes.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-md sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                APIs. No setup. No hassle. Fetchout lets you focus on
                logic while{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  we handle everything else.
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 px-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <a href="/login">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 text-gray-900 hover:border-slate-400 px-8 py-3 text-lg font-semibold transition-all duration-200 bg-transparent flex items-center"
                >
                  <Code className="w-8 h-8" />
                  See Examples
                </Button>
              </div>

              {/* Trust Indicators */}
              {/* <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                99.9% Uptime
              </div>
              <div>500K+ API Calls</div>
              <div>10K+ Developers</div>
            </div> */}
            </div>

            {/* Right Side - Live Code Example */}
            <div className="flex-1 max-w-2xl w-full">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 dark:bg-slate-700 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-slate-400 text-sm font-medium ml-2">
                      Terminal
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                {/* Code Content */}
                <div className="p-4 space-y-4">
                  {/* API Request */}
                  <div>
                    <div className="text-green-400 text-sm mb-2">$ Request</div>
                    <pre className="text-slate-300 text-sm font-mono leading-relaxed overflow-x-auto">
                      <code>{apiExample}</code>
                    </pre>
                  </div>

                  {/* API Response */}
                  <div>
                    <div className="text-blue-400 text-sm mb-2">Response</div>
                    <pre className="text-slate-300 text-sm font-mono leading-relaxed bg-slate-800 dark:bg-slate-900 p-3 rounded-lg overflow-x-auto">
                      <code>{apiResponse}</code>
                    </pre>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      200 OK
                    </div>
                    <div className="text-slate-500 text-sm">• 45ms</div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  ✨ Real API endpoint • No setup required • Start building now
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Ship APIs like a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10x developer
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Stop wrestling with infrastructure. Start building features that
              matter.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.bgGradient} p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20 dark:border-slate-700/50`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/50 bg-[size:20px_20px] opacity-30" />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {/* Icon Glow */}
                      <div
                        className={`absolute w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-all duration-300 -mt-16`}
                      />
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ste by Step Actions */}
      {/* <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              From Idea to API in 3 Steps
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Fetchout simplifies the entire API lifecycle, so you can focus on
              building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Footer Section */}
      <footer className="h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full text-sm text-slate-600 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Fetchout. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div
              className="hover:text-slate-900 flex text-lg dark:hover:text-white transition-colors"
            >
              🧡 By <p className="font-bold ml-2">OUTBREAK</p>
            </div>
 
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
