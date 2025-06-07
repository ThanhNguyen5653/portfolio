"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect, useRef, type FormEvent } from "react"
import {
  SendHorizonalIcon,
  UserIcon,
  BotIcon,
  Loader2Icon,
  MessageCircleIcon,
  SparklesIcon,
  LightbulbIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useCallback } from "react"

interface Message {
  id: string
  text: string
  role: "user" | "assistant"
  isStreaming?: boolean
}

// Sample questions from the Q&A pool for suggestions
const allSuggestions = [
  "What certifications does Duy have?",
  "What's Duy's educational background?",
  "Tell me about Duy's technical projects.",
  "What programming languages does Duy know?",
  "Does Duy have any work experience?",
  "What are Duy's strongest technical skills?",
  "Has Duy worked on any AI projects?",
  "What makes Duy stand out as a candidate?",
  "Is Duy experienced with cloud technologies?",
  "What's Duy's experience with cybersecurity?",
  "How does Duy handle teamwork?",
  "What development frameworks is Duy familiar with?",
  "Does Duy have any leadership experience?",
  "What's Duy's approach to problem-solving?",
  "Is Duy familiar with Microsoft technologies?",
]

// Animated Mily Icon Component
function MilyIcon({ className = "", isGenerating = false }: { className?: string; isGenerating?: boolean }) {
  return (
    <div className={cn("flex-shrink-0 transition-all duration-300", className)}>
      {isGenerating ? (
        // Tiny pulsing dot when generating
        <div className="w-3 h-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full animate-pulse shadow-md"></div>
      ) : (
        // Normal bot icon when not generating
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
          <BotIcon size={18} />
        </div>
      )}
    </div>
  )
}

function getGreetingResponse(): string {
  const greetings = [
    "Hi! I'm Mily, Duy's AI assistant. It's wonderful to meet you! I can tell you all about Duy's skills, projects, and experience. What would you like to know?",
    "Hello there! My name is Mily, and I'm here to help you learn about Duy. I know everything about his technical background, certifications, and projects. How can I assist you today?",
    "Hey! I'm Mily, Duy's virtual assistant. I'm excited to share information about his cybersecurity expertise, programming skills, and professional journey. What interests you most?",
    "Greetings! I'm Mily, and I'm here to tell you all about Duy Nguyen. Whether you want to know about his certifications, projects, or technical skills, I've got you covered!",
    "Hi there! Mily here - I'm Duy's dedicated AI assistant. I can share insights about his educational background, work experience, and impressive project portfolio. What would you like to explore?",
  ]
  return greetings[Math.floor(Math.random() * greetings.length)]
}

function isGreeting(message: string): boolean {
  const greetingPatterns = [
    "hi",
    "hello",
    "hey",
    "what's up",
    "whats up",
    "greetings",
    "howdy",
    "hi mily",
    "hello mily",
    "hey mily",
  ]
  const normalizedMessage = message.toLowerCase().trim()
  return greetingPatterns.some(
    (pattern) =>
      normalizedMessage === pattern ||
      normalizedMessage.startsWith(`${pattern} `) ||
      normalizedMessage.includes(pattern),
  )
}

function getRandomFallbackAnswer(): string {
  const fallbackAnswers = [
    "I'm Mily, and I'm still learning! I don't have the specific information for that question. Could you try asking about Duy's skills, projects, or certifications?",
    "That's a great question! I'm Mily, Duy's assistant, but I don't have that particular information. Perhaps ask about his technical experience or educational background?",
    "Hmm, I'm Mily and I'm not quite sure how to answer that. I can tell you about Duy's programming languages, certifications, or project portfolio if you'd like!",
    "I'm Mily, and I can only answer questions based on what I know about Duy. Try asking about his cybersecurity experience, work history, or technical skills!",
  ]
  return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)]
}

export default function PortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [chatVisible, setChatVisible] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false) // Track if any message is currently streaming
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const initialBotMessageText =
    "Hi! I'm Mily, Duy's AI assistant. I can tell you all about his skills, projects, and experience. What would you like to know?"

  // Function to generate new random suggestions
  const generateNewSuggestions = useCallback(() => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }, [])

  // Generate initial random suggestions
  useEffect(() => {
    setSuggestions(generateNewSuggestions())
  }, [generateNewSuggestions])

  // Effect for the initial placeholder streaming
  const [placeholder, setPlaceholder] = useState("Ask about Duy...")
  useEffect(() => {
    if (!chatVisible) {
      let currentText = "Ask about Duy"
      let i = 0
      const typingEffect = setInterval(() => {
        if (i < 3) {
          currentText += "."
          i++
        } else {
          currentText = "Ask about Duy"
          i = 0
        }
        setPlaceholder(currentText)
      }, 500)
      return () => clearInterval(typingEffect)
    }
  }, [chatVisible])

  // Check if any message is currently streaming
  useEffect(() => {
    const anyStreaming = messages.some((msg) => msg.isStreaming)
    setIsStreaming(anyStreaming)
  }, [messages])

  // Auto-scroll chatbox to bottom when messages change or when streaming
  useEffect(() => {
    if (chatVisible && scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages, chatVisible])

  // Additional effect to handle streaming updates - scroll during streaming
  useEffect(() => {
    if (isStreaming && chatVisible && scrollAreaRef.current) {
      const scrollInterval = setInterval(() => {
        const scrollElement = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight
        }
      }, 100) // Scroll every 100ms during streaming

      return () => clearInterval(scrollInterval)
    }
  }, [isStreaming, chatVisible])

  // Initial bot message when chat becomes visible
  useEffect(() => {
    if (chatVisible && messages.length === 0 && !isLoading) {
      // Stream initial bot message when chat becomes visible
      let currentText = ""
      const botMessageId = "initial-bot-message"
      setMessages([{ id: botMessageId, text: "", role: "assistant", isStreaming: true }])
      setIsStreaming(true)

      const interval = setInterval(() => {
        if (currentText.length < initialBotMessageText.length) {
          currentText += initialBotMessageText[currentText.length]
          setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, text: currentText } : msg)))
        } else {
          clearInterval(interval)
          setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, isStreaming: false } : msg)))
          setIsStreaming(false)
        }
      }, 50)
      return () => clearInterval(interval)
    }
  }, [chatVisible, messages.length, isLoading])

  const handleSubmit = useCallback(
    async (e?: FormEvent, customMessage?: string) => {
      if (e) e.preventDefault()

      const messageToSend = customMessage || input
      if ((!messageToSend.trim() && !customMessage) || isLoading || isStreaming) return

      // Only show chat after first submission
      if (!chatVisible) {
        setChatVisible(true)
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageToSend,
        role: "user",
      }

      const currentMessages = [...messages, userMessage]
      setMessages(currentMessages)

      setInput("")
      setIsLoading(true)
      setIsInteracting(true)

      try {
        // Prepare history for API
        const history = currentMessages
          .filter((msg) => msg.id !== userMessage.id)
          .map((msg) => ({ role: msg.role, content: msg.text }))

        // Use local search API (current implementation)
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageToSend, history: history }),
        })

        // Too many errors, will fix soon!
        // Alternative Groq API implementation (commented out)
        /*
        const response = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageToSend, history: history }),
        })
        */

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Server responded with status: ${response.status}`)
        }

        const data = await response.json()

        let botResponseText = ""
        const botMessageId = (Date.now() + 1).toString()
        setMessages((prev) => [...prev, { id: botMessageId, text: "", role: "assistant", isStreaming: true }])
        setIsStreaming(true)

        const streamInterval = setInterval(() => {
          if (botResponseText.length < data.answer.length) {
            botResponseText += data.answer[botResponseText.length]
            setMessages((prev) =>
              prev.map((msg) => (msg.id === botMessageId ? { ...msg, text: botResponseText } : msg)),
            )
          } else {
            clearInterval(streamInterval)
            setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, isStreaming: false } : msg)))
            setIsStreaming(false)
          }
        }, 30)
      } catch (error) {
        console.error("Failed to send message:", error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I had a little hiccup. Could you try asking that again?",
          role: "assistant",
        }
        setMessages((prev) => [...prev, errorMessage])
        setIsStreaming(false)
      } finally {
        setIsLoading(false)
        setTimeout(() => setIsInteracting(false), 2000)
        if (chatVisible) inputRef.current?.focus()
      }
    },
    [input, isLoading, chatVisible, messages, isStreaming],
  )

  const handleSuggestionClick = (suggestion: string, index: number) => {
    // Only allow clicking suggestions if not currently streaming
    if (!isStreaming && !isLoading) {
      // Remove the clicked suggestion and replace with a new one
      const availableSuggestions = allSuggestions.filter((s) => !suggestions.includes(s))

      if (availableSuggestions.length > 0) {
        // Pick a random new suggestion from the remaining ones
        const newSuggestion = availableSuggestions[Math.floor(Math.random() * availableSuggestions.length)]

        // Replace the clicked suggestion with the new one
        const newSuggestions = [...suggestions]
        newSuggestions[index] = newSuggestion
        setSuggestions(newSuggestions)
      } else {
        // If no more suggestions available, just remove the clicked one
        const newSuggestions = suggestions.filter((_, i) => i !== index)
        setSuggestions(newSuggestions)
      }

      // Submit the clicked suggestion
      handleSubmit(undefined, suggestion)
    }
  }

  if (!chatVisible) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-4 flex flex-col items-center">
        <SparklesIcon className="h-10 w-10 text-cyan-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Chat with my assistant Mily</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (input.trim() && !isStreaming && !isLoading) {
              handleSubmit(e)
            }
          }}
          className="w-full relative"
        >
          <div
            className={cn(
              "relative rounded-full overflow-hidden",
              isInteracting || isLoading
                ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
                : "bg-gray-800/80",
            )}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => !isLoading && input === "" && setIsInteracting(false)}
          >
            {/* Animated border overlay */}
            {(isInteracting || isLoading) && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60 animate-pulse"></div>
            )}
            <div className="relative flex items-center bg-gray-900/95 rounded-full mx-1 my-1 px-2 py-2">
              <MessageCircleIcon className="h-6 w-6 text-cyan-400 mx-3 flex-shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsInteracting(true)}
                onBlur={() => !isLoading && input === "" && setIsInteracting(false)}
                placeholder={placeholder}
                className="flex-grow bg-transparent border-0 outline-none focus:ring-0 text-white placeholder-gray-400 py-4 px-3 text-lg"
                disabled={isLoading || isStreaming}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="rounded-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50 w-12 h-12 mr-2 flex-shrink-0"
                disabled={isLoading || !input.trim() || isStreaming}
              >
                {isLoading ? <Loader2Icon className="h-6 w-6 animate-spin" /> : <SendHorizonalIcon size={24} />}
              </Button>
            </div>
          </div>
        </form>

        {/* Suggestion chips */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <div className="w-full flex items-center justify-center mb-3 text-sm text-cyan-400">
            <LightbulbIcon className="h-4 w-4 mr-1" />
            <span>Try asking:</span>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion}-${index}`}
              onClick={() => handleSuggestionClick(suggestion, index)}
              className={cn(
                "bg-gray-900/80 text-cyan-300 text-sm py-2 px-4 rounded-full border border-cyan-800/50 transition-colors duration-200",
                isStreaming || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800 hover:border-cyan-600/50 cursor-pointer",
              )}
              disabled={isStreaming || isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto my-12 p-4">
      <Card className="border-0 overflow-hidden bg-gray-900/90 backdrop-blur-md shadow-xl shadow-cyan-900/20 border-cyan-800/30 border w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="h-6 w-6 text-cyan-400 mr-2" />
            <h3 className="text-2xl font-bold text-cyan-400 text-center">Duy's AI Assistant</h3>
          </div>
          <ScrollArea className="h-[400px] w-full pr-4 mb-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex items-end gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && <MilyIcon isGenerating={msg.isStreaming} />}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-3 text-white shadow-md",
                      msg.role === "user"
                        ? "bg-blue-600 rounded-br-none"
                        : "bg-gray-800 rounded-bl-none border border-cyan-800/30",
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                      {msg.isStreaming && <span className="typing-cursor"></span>}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white shadow-md">
                      <UserIcon size={18} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-end gap-2 justify-start">
                  <MilyIcon isGenerating={true} />
                  <div className="max-w-[75%] rounded-xl px-4 py-3 text-white bg-gray-800 rounded-bl-none shadow-md border border-cyan-800/30">
                    <Loader2Icon className="h-5 w-5 animate-spin text-cyan-400" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (input.trim() && !isStreaming && !isLoading) {
                handleSubmit(e)
              }
            }}
            className="relative"
          >
            <div
              className={cn(
                "relative rounded-full overflow-hidden",
                isInteracting || isLoading
                  ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
                  : "bg-gray-800/80",
              )}
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => !isLoading && input === "" && setIsInteracting(false)}
            >
              {/* Animated border overlay */}
              {(isInteracting || isLoading) && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60 animate-pulse"></div>
              )}
              <div className="relative flex items-center bg-gray-900/95 rounded-full mx-1 my-1 px-2 py-2">
                <MessageCircleIcon className="h-6 w-6 text-cyan-400 mx-3 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsInteracting(true)}
                  onBlur={() => !isLoading && input === "" && setIsInteracting(false)}
                  placeholder={isStreaming ? "Mily is typing..." : "Ask anything else..."}
                  className="flex-grow bg-transparent border-0 outline-none focus:ring-0 text-white placeholder-gray-400 py-4 px-3 text-lg"
                  disabled={isLoading || isStreaming}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50 w-12 h-12 mr-2 flex-shrink-0"
                  disabled={isLoading || !input.trim() || isStreaming}
                >
                  {isLoading ? <Loader2Icon className="h-6 w-6 animate-spin" /> : <SendHorizonalIcon size={24} />}
                </Button>
              </div>
            </div>
          </form>

          {/* Suggestion chips in expanded view */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <div className="w-full flex items-center justify-center mb-1 text-xs text-cyan-400">
              <LightbulbIcon className="h-3 w-3 mr-1" />
              <span>Try asking:</span>
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion}-${index}`}
                onClick={() => handleSuggestionClick(suggestion, index)}
                className={cn(
                  "bg-gray-900 text-cyan-300 text-xs py-1 px-2.5 rounded-full border border-cyan-800/50 transition-colors duration-200",
                  isStreaming || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800 hover:border-cyan-600/50 cursor-pointer",
                )}
                disabled={isStreaming || isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
