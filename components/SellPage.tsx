
import React, { useState } from 'react';
import { generateProductListing } from '../services/geminiService';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Wand2, Loader2, Image as ImageIcon, Link, CheckCircle2, AlertCircle, Camera, Save, Eye, Box, Truck, Zap, X } from 'lucide-react';

interface SellPageProps {
  onAddProduct: (product: Product) => void;
}

export const SellPage: React.FC<SellPageProps> = ({ onAddProduct }) => {
  const [loading, setLoading] = useState(false);
  const [sellerConnected, setSellerConnected] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState(''); // Novo campo Marca
  const [features, setFeatures] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  // New Options State
  const [condition, setCondition] = useState<'new' | 'used'>('new');
  const [stock, setStock] = useState('1');
  const [listingType, setListingType] = useState<'classic' | 'premium'>('classic');
  const [allowPickup, setAllowPickup] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleConnectMercadoPago = () => {
      const width = 600;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      const win = window.open('', 'Connect MP', `width=${width},height=${height},top=${top},left=${left}`);
      if(win) {
          win.document.write('<html><body style="font-family:sans-serif; text-align:center; padding:50px;"><h1>Mercado Pago</h1><p>Conectando sua conta...</p></body></html>');
          setTimeout(() => {
              win.close();
              setSellerConnected(true);
          }, 1500);
      }
  };

  const handleGenerateAI = async () => {
    if (!title) return alert("Por favor, digite pelo menos o nome do produto.");
    
    setLoading(true);
    try {
      const result = await generateProductListing(title, features);
      setDescription(result.description);
      if (!price) setPrice(result.suggestedPrice.toString());
      setCategory(result.category);
    } catch (e) {
      alert("Erro ao gerar com IA. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Simulação de adição de imagem
  const handleAddImage = () => {
    const newImage = `https://picsum.photos/400/400?random=${Date.now()}`;
    setImages([...images, newImage]);
  };

  const getProductObject = (): Product => {
    return {
      id: Date.now().toString(),
      title: title || "Título do Produto",
      price: parseFloat(price) || 0,
      description: description || "Descrição do produto...",
      image: images.length > 0 ? images[0] : `https://picsum.photos/400/400?random=preview`,
      seller: "Sua Loja (Logista)",
      category: category || "Geral",
      shipping: parseFloat(price) > 79 ? 'free' : 'paid',
      rating: 0,
      reviews: 0,
      originalPrice: parseFloat(price) * 1.2,
      condition,
      stockTotal: parseInt(stock) || 1,
      stockSold: 0,
      listingType,
      city: "São Paulo", // Default para preview
      neighborhood: "Centro"
    };
  };

  const handleSaveDraft = () => {
    alert("Rascunho salvo com sucesso! Você pode continuar editando mais tarde.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerConnected) {
        alert("Por favor, conecte sua conta do Mercado Pago para receber seus pagamentos.");
        return;
    }
    onAddProduct(getProductObject());
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-black mb-2">Vender no ALFAN</h2>
        <p className="text-gray-500 mb-8">Preencha os dados abaixo para criar seu anúncio.</p>

        {/* Módulo de Conexão Mercado Pago (Onboarding) */}
        <div className={`mb-8 p-6 rounded-lg border ${sellerConnected ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        {sellerConnected ? (
                            <><CheckCircle2 className="text-green-600" size={20}/> Conta Conectada</>
                        ) : (
                            <><AlertCircle className="text-gray-600" size={20}/> Recebimento das Vendas</>
                        )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 max-w-lg">
                        {sellerConnected 
                            ? "Sua conta do Mercado Pago está ativa. Split de pagamento configurado."
                            : "Para vender, conecte sua conta do Mercado Pago. O dinheiro cai direto na sua conta."
                        }
                    </p>
                </div>
                {!sellerConnected && (
                    <button 
                        onClick={handleConnectMercadoPago}
                        className="bg-[#009EE3] hover:bg-[#0082ba] text-white px-4 py-2 rounded font-bold text-sm transition-colors flex items-center gap-2"
                    >
                        <Link size={16} /> Conectar
                    </button>
                )}
            </div>
        </div>

        <form onSubmit={handleSubmit} className={`space-y-8 ${!sellerConnected ? 'opacity-50 pointer-events-none' : ''}`}>
          
          {/* Seção 1: O que você vai vender? */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">1. O que você vai vender?</h3>
            
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título do Anúncio</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: iPhone 13 Pro Max 256GB Grafite"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none transition font-medium"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Seja claro e inclua marca e modelo.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                        <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                        placeholder="Ex: Celulares"
                        required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marca (Opcional)</label>
                        <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                        placeholder="Ex: Apple, Samsung"
                        />
                    </div>
                </div>
            </div>
          </div>

          {/* Seção 2: Escolher Condição */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">2. Qual a condição do seu produto?</h3>
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => setCondition('new')}
                    className={`flex-1 py-4 rounded-lg border-2 font-bold text-sm transition-all flex flex-col items-center gap-2 ${condition === 'new' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                >
                    <Zap size={20} className={condition === 'new' ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}/>
                    Novo
                </button>
                <button
                    type="button"
                    onClick={() => setCondition('used')}
                    className={`flex-1 py-4 rounded-lg border-2 font-bold text-sm transition-all flex flex-col items-center gap-2 ${condition === 'used' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                >
                    <Box size={20} className={condition === 'used' ? 'text-white' : 'text-gray-400'}/>
                    Usado
                </button>
            </div>
          </div>

          {/* Seção 3: Adicionar Fotos */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">3. Adicionar Fotos</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-md border border-gray-200 overflow-hidden relative group shadow-sm">
                        <img src={img} alt={`Foto ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="text-white hover:text-red-400">
                                <Box size={24}/>
                            </button>
                        </div>
                        {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] text-center py-1">Principal</span>}
                    </div>
                ))}
                {images.length < 6 && (
                    <button 
                        type="button"
                        onClick={handleAddImage}
                        className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors bg-gray-50"
                    >
                        <Camera size={32} />
                        <span className="text-xs font-bold mt-2">Adicionar Foto</span>
                    </button>
                )}
            </div>
            <p className="text-xs text-gray-500">Adicione até 6 fotos. Fotos com fundo branco vendem mais.</p>
          </div>

          {/* Seção 4: Descrição */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">4. Descrição</h3>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-blue-900">
                    <span className="font-bold flex items-center gap-2"><Wand2 size={16}/> Assistente de IA</span>
                    <p className="text-blue-700 text-xs mt-1">Digite características básicas (ex: "Couro legítimo, pouco uso") e a IA escreve para você.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <input 
                        type="text" 
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        placeholder="Características..."
                        className="flex-1 md:w-48 p-2 border border-blue-200 rounded text-sm outline-none focus:border-blue-500 bg-white"
                    />
                    <button
                        type="button"
                        onClick={handleGenerateAI}
                        disabled={loading || !title}
                        className={`px-4 py-2 rounded font-medium text-white flex items-center gap-2 text-xs whitespace-nowrap shadow-sm ${loading || !title ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} />}
                        Escrever
                    </button>
                </div>
            </div>

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-black outline-none text-sm leading-relaxed"
                placeholder="Descreva os detalhes do seu produto, especificações técnicas, medidas, tempo de uso (se usado), etc."
                required
            />
          </div>

          {/* Seção 5: Preço e Estoque */}
          <div className="space-y-4">
             <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">5. Preço e Estoque</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500 font-bold">R$</span>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none font-bold text-xl text-gray-900"
                            placeholder="0,00"
                            required
                        />
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade Disponível</label>
                     <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                        min="1"
                        required
                    />
                </div>
             </div>
          </div>

          {/* Seção 6: Condições de Venda */}
          <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">6. Condições de Venda</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setListingType('classic')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all relative ${listingType === 'classic' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                      <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-900">Anúncio Clássico</span>
                          {listingType === 'classic' && <CheckCircle2 size={20} className="text-black"/>}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Exposição média.</p>
                      <p className="text-xs font-bold text-gray-800">Taxa: 11% por venda</p>
                  </div>

                  <div 
                    onClick={() => setListingType('premium')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all relative ${listingType === 'premium' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                      <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-900 flex items-center gap-1"><Zap size={14} className="text-yellow-500 fill-yellow-500"/> Anúncio Premium</span>
                          {listingType === 'premium' && <CheckCircle2 size={20} className="text-black"/>}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Exposição máxima + Parcelamento sem juros.</p>
                      <p className="text-xs font-bold text-gray-800">Taxa: 16% por venda</p>
                  </div>
              </div>

              <div className="flex items-center gap-2 mt-4 bg-gray-50 p-3 rounded border border-gray-100">
                  <input 
                    type="checkbox" 
                    id="pickup" 
                    checked={allowPickup}
                    onChange={(e) => setAllowPickup(e.target.checked)}
                    className="rounded text-black focus:ring-black w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="pickup" className="text-sm text-gray-700 select-none cursor-pointer flex items-center gap-2">
                      <Truck size={16}/> Permitir que o comprador retire em mãos
                  </label>
              </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-4 sticky bottom-0 bg-white pb-4 z-10">
            <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex-1 py-4 bg-white border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
                <Eye size={20} /> Pré-visualizar
            </button>
            <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 py-4 bg-white border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
                <Save size={20} /> Salvar Rascunho
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 bg-black hover:bg-gray-800 text-white text-lg font-bold rounded-md shadow-lg transition-all transform hover:translate-y-[-1px] flex items-center justify-center gap-2"
            >
              Publicar Agora
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Pré-visualização */}
      {showPreview && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
             <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-2xl">
                <div className="bg-black text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Pré-visualização do Anúncio</h3>
                    <button onClick={() => setShowPreview(false)} className="hover:bg-white/20 p-1 rounded transition-colors"><X size={20}/></button>
                </div>
                <div className="p-6 bg-gray-100">
                    <div className="pointer-events-none">
                        <ProductCard 
                            product={getProductObject()} 
                            onClick={() => {}} 
                            isFavorite={false}
                        />
                    </div>
                </div>
                <div className="p-4 bg-white text-center border-t border-gray-200">
                    <button 
                        onClick={() => setShowPreview(false)}
                        className="w-full py-3 bg-gray-100 text-gray-800 font-bold rounded hover:bg-gray-200 transition-colors"
                    >
                        Fechar e Continuar Editando
                    </button>
                </div>
             </div>
          </div>
      )}

    </div>
  );
};
