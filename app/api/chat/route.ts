import { NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"
import Fuse from "fuse.js"

interface QnaItem {
  question: string
  answer: string | string[]
}

interface QnaData {
  portfolio_qna: QnaItem[]
}

// Cache for the Fuse instance and Q&A data
let fuseInstance: Fuse<QnaItem> | null = null
let qnaData: QnaItem[] = []

// Initialize the Fuse.js instance and knowledge base
async function initializeData() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "data", "qna.json")
    const fileContents = await fs.readFile(jsonPath, "utf-8")
    const data = JSON.parse(fileContents) as QnaData
    qnaData = data.portfolio_qna

    // Initialize Fuse.js with more lenient settings
    fuseInstance = new Fuse(qnaData, {
      keys: ["question"],
      includeScore: true,
      threshold: 0.6, // Higher threshold = more lenient matching (0-1)
      minMatchCharLength: 2,
      ignoreLocation: true, // Ignore where in the string the match occurs
      findAllMatches: true, // Find all matches in the string
      useExtendedSearch: true, // Enable extended search
    })

    console.log("Data initialized successfully. Total Q&A items:", qnaData.length)
  } catch (error) {
    console.error("Failed to initialize data:", error)
    qnaData = []
    fuseInstance = null
  }
}

// Call initialization immediately
initializeData()

// Helper functions
function getRandomFallbackAnswer(): string {
  const fallbackAnswers = [
    "I'm Mily, and I'm still learning! I don't have the specific information for that question. Could you try asking about Duy's skills, projects, or certifications?",
    "That's a great question! I'm Mily, Duy's assistant, but I don't have that particular information. Perhaps ask about his technical experience or educational background?",
    "Hmm, I'm Mily and I'm not quite sure how to answer that. I can tell you about Duy's programming languages, certifications, or project portfolio if you'd like!",
    "I'm Mily, and I can only answer questions based on what I know about Duy. Try asking about his cybersecurity experience, work history, or technical skills!",
  ]
  return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)]
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

// Extract keywords from a message
function extractKeywords(message: string): string[] {
  // Remove common stop words and punctuation
  const stopWords = [
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "in",
    "on",
    "at",
    "to",
    "for",
    "with",
    "about",
    "of",
    "by",
    "that",
    "this",
    "these",
    "those",
    "what",
    "which",
    "who",
    "whom",
    "whose",
    "when",
    "where",
    "why",
    "how",
    "do",
    "does",
    "did",
    "has",
    "have",
    "had",
    "can",
    "could",
    "will",
    "would",
    "should",
    "shall",
    "may",
    "might",
    "must",
    "me",
    "my",
    "mine",
    "your",
    "yours",
    "his",
    "her",
    "hers",
    "its",
    "our",
    "ours",
    "their",
    "theirs",
  ]

  // Convert to lowercase, remove punctuation, and split into words
  const words = message
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word))

  return [...new Set(words)] // Remove duplicates
}

// Enhanced search function
function getAnswer(message: string): string {
  if (!fuseInstance || !qnaData || !message) {
    console.log("Data not available, using random fallback")
    return getRandomFallbackAnswer()
  }

  try {
    // First try: Direct fuzzy search
    const searchResults = fuseInstance.search(message)
    console.log(`Search: Found ${searchResults.length} potential matches for query: "${message}"`)

    if (searchResults.length > 0 && searchResults[0].score < 0.4) {
      // Good match found (lower score = better match)
      const bestMatch = searchResults[0]
      console.log(`Search: Good match found (score: ${bestMatch.score}):`, bestMatch.item.question)

      let answer = bestMatch.item.answer
      if (Array.isArray(answer)) {
        answer = answer[Math.floor(Math.random() * answer.length)]
      }
      return answer
    }

    // Second try: Keyword-based search
    const keywords = extractKeywords(message)
    console.log("Search: Extracted keywords:", keywords)

    if (keywords.length > 0) {
      // Look for specific important keywords
      const importantKeywords = [
        "certification",
        "certifications",
        "certified",
        "cert",
        "certs",
        "education",
        "skill",
        "skills",
        "experience",
        "project",
        "projects",
        "work",
        "background",
        "programming",
        "language",
        "languages",
        "framework",
        "frameworks",
        "tool",
        "tools",
      ]

      const foundImportantKeywords = keywords.filter((kw) =>
        importantKeywords.some((ik) => kw.includes(ik) || ik.includes(kw)),
      )

      console.log("Search: Found important keywords:", foundImportantKeywords)

      if (foundImportantKeywords.length > 0) {
        // Try to find questions that contain these important keywords
        for (const keyword of foundImportantKeywords) {
          const keywordResults = qnaData.filter((item) => item.question.toLowerCase().includes(keyword))

          if (keywordResults.length > 0) {
            console.log(`Search: Found ${keywordResults.length} matches for keyword "${keyword}"`)
            const selectedItem = keywordResults[0]
            console.log("Search: Selected question:", selectedItem.question)

            let answer = selectedItem.answer
            if (Array.isArray(answer)) {
              answer = answer[Math.floor(Math.random() * answer.length)]
            }
            return answer
          }
        }
      }

      // If no important keywords matched, try all keywords
      for (const keyword of keywords) {
        if (keyword.length < 4) continue // Skip very short keywords

        const keywordResults = qnaData.filter((item) => item.question.toLowerCase().includes(keyword))

        if (keywordResults.length > 0) {
          console.log(`Search: Found ${keywordResults.length} matches for keyword "${keyword}"`)
          const selectedItem = keywordResults[0]
          console.log("Search: Selected question:", selectedItem.question)

          let answer = selectedItem.answer
          if (Array.isArray(answer)) {
            answer = answer[Math.floor(Math.random() * answer.length)]
          }
          return answer
        }
      }
    }

    // Third try: Use the best fuzzy match even if it's not great
    if (searchResults.length > 0) {
      const bestMatch = searchResults[0]
      console.log(`Search: Using best available match (score: ${bestMatch.score}):`, bestMatch.item.question)

      let answer = bestMatch.item.answer
      if (Array.isArray(answer)) {
        answer = answer[Math.floor(Math.random() * answer.length)]
      }
      return answer
    }

    console.log("Search: No matches found, using random fallback")
    return getRandomFallbackAnswer()
  } catch (error) {
    console.error("Error in search:", error)
    return getRandomFallbackAnswer()
  }
}

export async function POST(request: Request) {
  console.log("API route /api/chat received a request.")

  try {
    const { message, history = [] } = await request.json()
    console.log("Received message:", message)

    if (!message || typeof message !== "string") {
      console.warn("Invalid message format received.")
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    // Initialize data if not already done
    if (!fuseInstance && qnaData.length === 0) {
      await initializeData()
    }

    // Handle greetings
    if (isGreeting(message)) {
      console.log("Detected greeting, returning predefined response")
      const greetingResponse = getGreetingResponse()
      console.log("Greeting response:", greetingResponse)
      return NextResponse.json({ answer: greetingResponse })
    }

    console.log("Not a greeting, proceeding with enhanced search logic")

    // Use the enhanced search
    const answer = getAnswer(message)
    console.log("Search complete, returning answer")

    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ answer: getRandomFallbackAnswer() })
  }
}

// Ensure the API route is not cached
export const dynamic = "force-dynamic"
