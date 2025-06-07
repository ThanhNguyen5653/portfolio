// import { Groq } from "groq-sdk"
// import { NextResponse } from "next/server"

// Too many errors, will fix soon!

/*
export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    // Prepare conversation history for Groq
    const messages = [
      {
        role: "system",
        content: `You are Duy's AI assistant. You help visitors learn about Duy Nguyen, a cybersecurity and IT professional. 
        Answer questions about his skills, experience, projects, and background based on the information provided.
        Keep responses helpful, professional, and engaging.`
      },
      ...history.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ]

    const completion = await groq.chat.completions.create({
      messages: messages as any,
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 500,
    })

    const answer = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error("Groq API error:", error)
    return NextResponse.json({ 
      error: "Failed to get response from AI assistant",
      details: error.message 
    }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
*/

export async function POST(request: Request) {
  return new Response("Groq integration temporarily disabled", { status: 503 })
}
