
import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMVPBlueprint = async (idea: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview', // Switched to flash for better reliability in sandbox
    contents: `Act as a CTO and Product Architect. Create a detailed MVP blueprint for this idea: ${idea}. Include: 1. Tech Stack, 2. Core Features, 3. Development Phases, and 4. Potential AI Integrations. Format with clear headings and Markdown.`,
    config: {
      temperature: 0.8,
    }
  });
  return response.text;
};

export const generateConceptVisual = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A futuristic, professional product concept visualization of: ${prompt}. Cinematic lighting, studio quality, 8k, sleek and modern design aesthetic.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const getUniversalInsights = async (query: string, lat?: number, lng?: number) => {
  const ai = getAI();
  
  const toolConfig: any = {};
  if (lat && lng) {
    toolConfig.retrievalConfig = {
      latLng: { latitude: lat, longitude: lng }
    };
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Conduct a deep research analysis on: ${query}. 
    Use real-time data to provide market trends and competitor snapshots.
    
    CRITICAL: You MUST include a JSON block at the VERY END of your response (after all text) in the following format so I can render a chart. 
    The JSON should represent a relevant trend or comparison related to the query (e.g., market growth, interest over time, or competitor pricing).
    
    Format:
    ---DATA_START---
    {
      "chartTitle": "Title of the Trend",
      "data": [
        {"name": "Label 1", "value": 100},
        {"name": "Label 2", "value": 150}
      ]
    }
    ---DATA_END---
    
    Make the data realistic based on your research.`,
    config: {
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
      toolConfig
    },
  });

  return {
    text: response.text,
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const startGeneralChat = () => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the Propbotix Core AI. You are a world-class expert in AI implementation, software engineering, and business strategy. Your goal is to help users conceptualize and build any AI-powered system or prototype."
    }
  });
};
