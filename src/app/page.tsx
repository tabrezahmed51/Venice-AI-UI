cat > src/app/page.tsx << 'EOF'
'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    })
    const data = await res.json()
    setMessages([...messages, { role: 'user', content: input }, data])
    setInput('')
  }

  return (
    <div className="flex h-screen flex-col bg-black p-4">
      <h1 className="text-2xl font-bold text-white mb-4">🤖 Venice AI</h1>
      <div className="flex-1 overflow-y-auto mb-4 border border-white/20 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 bg-white/10 text-white border border-white/20"
          placeholder="Ask Venice AI..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white">Send</button>
      </div>
    </div>
  )
}
EOF
