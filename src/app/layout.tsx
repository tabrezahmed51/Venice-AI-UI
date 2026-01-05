import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Venice AI - Chat with Dolphin-Mistral',
  description: 'Modern AI Agent Workspace powered by OpenRouter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
