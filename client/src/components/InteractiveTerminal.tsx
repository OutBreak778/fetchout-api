import { Copy, Pause, Play, RotateCcw, Terminal } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { steps } from "@/config"

const InteractiveTerminal = () => {
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const [displayedContent, setDisplayedContent] = useState([""])

  useEffect(() => {
    if (!isPlaying) return

    const typeStep = async (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setTimeout(() => {
          setCurrentStep(0)
          setDisplayedContent([""])
        }, 3000)
        return
      }

      const step = steps[stepIndex]
      setIsTyping(true)

      let content = ""
      for (let i = 0; i <= step.content.length; i++) {
        content = step.content.slice(0, i)
        setDisplayedContent((prev) => {
          const newContent = [...prev]
          newContent[stepIndex] = content
          return newContent
        })
        await new Promise((resolve) => setTimeout(resolve, step.delay))
      }

      setIsTyping(false)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentStep(stepIndex + 1)
    }

    typeStep(currentStep)
  }, [currentStep, isPlaying])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const restart = () => {
    setCurrentStep(0)
    setDisplayedContent([""])
    setIsPlaying(true)
  }

  return (
    <div className="bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-800 hover:border-gray-600 transition-all duration-300 group w-full max-w-4xl mx-auto">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full opacity-60" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full opacity-40" />
          </div>
          <div className="flex items-center gap-2 ml-2 sm:ml-4">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span className="text-white text-xs sm:text-sm font-mono font-medium hidden sm:inline">
              fetchout-terminal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayback}
            className="text-white hover:text-black hover:bg-white transition-all duration-200 p-1 sm:p-2"
          >
            {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={restart}
            className="text-white hover:text-black hover:bg-white transition-all duration-200 p-1 sm:p-2"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-black hover:bg-white transition-all duration-200 p-1 sm:p-2"
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4 h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px] bg-black overflow-y-auto">
        {displayedContent.map((content, index) => {
          if (!content && index > currentStep) return null

          const step = steps[index]
          if (!step) return null

          return (
            <div key={index} className="space-y-1 sm:space-y-2">
              {step.type === "command" && (
                <div className="flex items-start gap-1 sm:gap-2">
                  <span className="text-white font-mono text-xs sm:text-sm opacity-60">$</span>
                  <pre className="text-white font-mono text-xs sm:text-sm leading-relaxed flex-1 break-all">
                    {content}
                    {index === currentStep && isTyping && (
                      <span className="animate-pulse bg-white w-1 sm:w-2 h-3 sm:h-4 inline-block ml-1" />
                    )}
                  </pre>
                </div>
              )}

              {step.type === "response" && content && (
                <div className="bg-gray-900 rounded-lg p-2 sm:p-3 lg:p-4 border border-gray-800">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-mono opacity-60">200 OK • 42ms</span>
                  </div>
                  <pre className="text-white font-mono text-xs sm:text-sm leading-relaxed break-all">
                    {content}
                    {index === currentStep && isTyping && (
                      <span className="animate-pulse bg-white w-1 sm:w-2 h-3 sm:h-4 inline-block ml-1" />
                    )}
                  </pre>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InteractiveTerminal