import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Olá! Sou o assistente virtual da ALFAN. Posso te ajudar a encontrar produtos, ver status de pedidos ou tirar dúvidas sobre pagamentos. Como posso ajudar hoje?' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemPrompt = `
        Você é o assistente virtual oficial do marketplace ALFAN.
        Seu tom deve ser: Profissional, educado, prestativo e conciso.
        
        Informações sobre o ALFAN para usar nas respostas:
        - Somos um marketplace estilo Mercado Livre/Amazon.
        - Aceitamos Pix (aprovação imediata), Cartão de Crédito (até 12x) e Boleto.
        - Temos entrega Full e Prime (frete grátis em produtos selecionados).
        - O cliente pode rastrear pedidos no menu "Minhas Compras".
        - Para vender, o cliente deve clicar em "Painel do Vendedor".
        
        Se o usuário perguntar sobre um pedido específico, peça o número do pedido.
        Se o usuário pedir recomendação de produtos, dê sugestões genéricas baseadas nas categorias (Tecnologia, Moda, Casa).
        
        Responda sempre em português do Brasil.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + "\n\nUsuário: " + userMsg.text }] }
        ]
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "Desculpe, não consegui processar sua solicitação no momento."
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("Erro no chat:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Desculpe, estou com dificuldades técnicas. Tente novamente mais tarde."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-lg shadow-2xl border border-gray-300 flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-black p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Suporte ALFAN</h3>
                <p className="text-[10px] text-gray-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online agora
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white hover:bg-white/10 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-br-none' 
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'model' && (
                     <div className="flex items-center gap-1 mb-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        <Sparkles size={10} /> IA Assistant
                     </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-black" />
                  <span className="text-xs text-gray-500 font-medium">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-gray-50 border border-gray-300 text-black text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-500"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                isLoading || !inputText.trim() 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <Send size={18} />
            </button>
          </form>
          
          <div className="bg-gray-50 px-3 py-1 text-center border-t border-gray-100">
             <p className="text-[9px] text-gray-400">Protegido por IA Google Gemini</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white w-14 h-14 rounded-full shadow-xl hover:bg-gray-800 transition-all transform hover:scale-110 flex items-center justify-center border-2 border-white"
        aria-label="Abrir Chat de Suporte"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        
        {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        )}
      </button>
    </div>
  );
};