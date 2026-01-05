export async function POST(req: Request) {
  const { message } = await req.json()
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })
    
    const data = await response.json()
    const reply = data.choices[0].message.content
    
    return Response.json({ response: reply })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
