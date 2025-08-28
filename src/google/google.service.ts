import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || '';

@Injectable()
export class GoogleService {
  private ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  async runGemini(text: string): Promise<string> {
    if (!text) return '';
    try {
      const response = await this.ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: text,
      });

      return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
