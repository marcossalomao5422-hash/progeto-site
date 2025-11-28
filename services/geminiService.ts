import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a persuasive product description based on a title and basic features.
 */
export const generateProductListing = async (productName: string, features: string): Promise<{ description: string; suggestedPrice: number; category: string }> => {
  try {
    const prompt = `
      Você é um assistente especialista em e-commerce para vendedores do Mercado Livre.
      Crie um anúncio atraente para um produto.
      
      Produto: ${productName}
      Características básicas: ${features}
      
      Retorne APENAS um objeto JSON (sem markdown, sem code block) com as seguintes chaves:
      - description: Um texto de vendas persuasivo, destacando benefícios (máximo 300 caracteres).
      - suggestedPrice: Um preço numérico sugerido em BRL (apenas o número) razoável para este item.
      - category: A melhor categoria simples (uma palavra) para este item (ex: Tecnologia, Moda, Casa).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");

    return JSON.parse(text);
  } catch (error) {
    console.error("Erro ao gerar descrição:", error);
    return {
      description: "Produto de alta qualidade, novo na caixa. Ótima oportunidade de compra.",
      suggestedPrice: 99.90,
      category: "Geral"
    };
  }
};