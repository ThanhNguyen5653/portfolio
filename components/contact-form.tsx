"use client"
import { useForm, ValidationError } from "@formspree/react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SendIcon } from "lucide-react"

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mzzgzkzg")

  if (state.succeeded) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
          <SendIcon className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
        <p className="text-gray-400 text-lg">Thanks for reaching out! I&apos;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Simplified background - removed heavy blur and animations */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl"></div>

      <div className="relative bg-black/90 border border-white/20 rounded-2xl p-8 sm:p-10 shadow-xl hover:border-cyan-400/40 transition-colors duration-200">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Get In Touch</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium text-lg">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              required
              className="bg-black/60 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-lg p-4 h-14 rounded-xl transition-colors duration-150 hover:bg-black/80"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white font-medium text-lg">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Your message..."
              required
              className="bg-black/60 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-lg p-4 rounded-xl transition-colors duration-150 hover:bg-black/80 resize-none"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm" />
          </div>

          <Button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            {state.submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <SendIcon className="h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
