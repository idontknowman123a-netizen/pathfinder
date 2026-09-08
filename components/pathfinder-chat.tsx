'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Send, Bot } from 'lucide-react'
import { generateReply, type ChatContext } from '@/lib/chat-engine'

const suggestions = [
  '💰 Mức lương bao nhiêu?',
  '📈 Nhu cầu thị trường hiện nay?',
  '🎓 Tôi nên học ngành gì?',
  '🧠 Tôi có phù hợp với nghề này không?',
  '🛠 Cần kỹ năng gì?',
  '🚀 Lộ trình phát triển?',
  '🌍 Có cơ hội làm việc ở nước ngoài không?',
  '⚠️ Khó khăn của nghề là gì?',
]

type ChatMessage = { id: string; role: 'user' | 'assistant'; text: string }

let messageCounter = 0
const nextId = () => `m${Date.now()}-${messageCounter++}`

export function PathfinderChat({ context }: { context: ChatContext }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const send = (text: string) => {
    const value = text.trim()
    if (!value || typing) return
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: value }])
    setInput('')
    setTyping(true)

    // Generate the answer locally, then reveal it after a short, natural pause
    // so it feels like Pathfinder AI is thinking and typing a reply.
    const reply = generateReply(value, context)
    const delay = Math.min(1500, 550 + reply.length * 2.5)
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: reply }])
      setTyping(false)
    }, delay)
  }

  return (
    <section className="flex h-[640px] flex-col overflow-hidden rounded-[2rem] border border-[#dbe4e8] bg-white shadow-xl shadow-[#102a43]/5">
      <header className="flex items-center gap-3 border-b border-[#eef2f0] bg-[#102a43] px-6 py-5 text-[#f6f5ef]">
        <span className="grid size-10 place-items-center rounded-2xl bg-[#ff8066] text-[#102a43]">
          <Sparkles className="size-5" />
        </span>
        <div>
          <h3 className="font-semibold">Pathfinder AI</h3>
          <p className="text-xs text-[#b9d6d1]">
            Trợ lý định hướng • đang tư vấn về {context.careerName || 'nghề nghiệp'}
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-[#b9d6d1]">
          <span className="size-2 rounded-full bg-[#7fdcc7]" />
          Trực tuyến
        </span>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
        {messages.length === 0 && (
          <div className="rounded-3xl bg-[#f4f7f5] p-5 text-sm leading-6 text-[#4a6473]">
            <div className="mb-2 flex items-center gap-2 font-semibold text-[#102a43]">
              <Bot className="size-4 text-[#2e8277]" />
              Xin chào! Mình là Pathfinder AI 👋
            </div>
            Mình đã biết bạn đang xem nghề <strong>{context.careerName}</strong> và hồ sơ MBTI{' '}
            <strong>{context.mbti}</strong> của bạn. Cứ hỏi mình bất cứ điều gì về nghề này nhé — hoặc chọn nhanh một
            câu gợi ý bên dưới.
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.role === 'user'
          return (
            <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-6 ${
                  isUser
                    ? 'rounded-br-lg bg-[#102a43] text-[#f6f5ef]'
                    : 'rounded-bl-lg bg-[#f4f7f5] text-[#28414f]'
                }`}
              >
                {message.text}
              </div>
            </div>
          )
        })}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-3xl rounded-bl-lg bg-[#f4f7f5] px-4 py-4">
              <span className="flex gap-1.5">
                <span className="size-2 animate-bounce rounded-full bg-[#9cc6c0]" />
                <span className="size-2 animate-bounce rounded-full bg-[#9cc6c0] [animation-delay:150ms]" />
                <span className="size-2 animate-bounce rounded-full bg-[#9cc6c0] [animation-delay:300ms]" />
              </span>
              <span className="text-xs text-[#7c96a3]">Pathfinder AI đang suy nghĩ...</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#eef2f0] px-4 py-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={typing}
              className="whitespace-nowrap rounded-full border border-[#dbe4e8] bg-[#f6f5ef] px-3.5 py-2 text-xs font-medium text-[#3f5b6a] transition hover:border-[#9cc6c0] hover:bg-white disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2"
        >
          <label className="sr-only" htmlFor="pf-chat-input">
            Nhập câu hỏi cho Pathfinder AI
          </label>
          <input
            id="pf-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Hỏi Pathfinder AI về nghề này..."
            className="flex-1 rounded-full border border-[#dbe4e8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9cc6c0] placeholder:text-[#9aadb5]"
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            aria-label="Gửi câu hỏi"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ff8066] text-[#102a43] transition hover:bg-[#ff977f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
