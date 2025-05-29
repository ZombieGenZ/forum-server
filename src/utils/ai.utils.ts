import { GoogleGenerativeAI } from '@google/generative-ai'
import GeminiAIPrompt from '~/constants/prompt.constants'

const MODEL_NAME = process.env.GEMINI_AI_MODEL_NAME || ''
const API_KEY = process.env.GEMINI_AI_API_KEY || ''
const genAI = new GoogleGenerativeAI(API_KEY)

export const summaryContent = async (content: string) => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME })

  const prompt = GeminiAIPrompt.summary(content)

  const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()

  return text
}
