
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { SellPage } from './components/SellPage';
import { CheckoutPage } from './components/CheckoutPage';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CategoriesPage } from './components/CategoriesPage';
import { CategoryCarousel } from './components/CategoryCarousel';
import { PurchasesPage } from './components/PurchasesPage';
import { AuthPage } from './components/AuthPage';
import { AIChat } from './components/AIChat';
import { FavoritesPage } from './components/FavoritesPage';
import { Product, CartItem, ViewState, CATEGORIES, Coupon, Notification, Question } from './types';
import { Star, ShieldCheck, ChevronRight, Minus, Plus, Trash2, ArrowLeft, Store, Zap, Clock, Ticket, Award, Lock, Share2, Heart, Info, ThumbsUp, Truck, MapPin, CheckCircle, ShoppingBag, MessageCircle, Send, DollarSign, Filter } from 'lucide-react';

// --- CONSTANTS ---
// Moved outside so it can be passed to CategoriesPage easily
const CATEGORY_IMAGES: Record<string, string> = {
  "Tecnologia": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80",
  "Moda": "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80",
  "Casa": "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=300&q=80",
  "Esportes": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80",
  "Brinquedos": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=300&q=80",
  "Beleza": "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=300&q=80",
  "Games": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=300&q=80",
  "Livros": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80"
};

// --- COMPONENTS INTERNOS ---

// 3. PRODUCT DETAIL (Enhanced with Q&A and Local Delivery)
const ProductDetail: React.FC<{ 
    product: Product; 
    onAddToCart: (p: Product) => void;
    onBuyNow: (p: Product) => void;
    onBack: () => void;
    isFavorite: boolean;
    onToggleFavorite: (e: React.MouseEvent, p: Product) => void;
}> = ({ product, onAddToCart, onBuyNow, onBack, isFavorite, onToggleFavorite }) => {
    
    // Simulação de Perguntas e Respostas
    const [questionText, setQuestionText] = useState('');
    const [questions, setQuestions] = useState<Question[]>([
        {id: '1', productId: product.id, user: 'Mario', text: 'Tem pronta entrega?', answer: 'Sim, envio imediato!', date: 'Há 2 dias'},
        {id: '2', productId: product.id, user: 'Lucia', text: 'É original?', answer: 'Produto 100% original com nota fiscal.', date: 'Há 5 dias'},
    ]);

    const handleSendQuestion = () => {
        if(!questionText.trim()) return;
        const newQ: Question = {
            id: Date.now().toString(),
            productId: product.id,
            user: 'Você',
            text: questionText,
            date: 'Agora'
        };
        setQuestions([newQ, ...questions]);
        setQuestionText('');
    };

    // Simulação de Cálculo de Entrega Local
    const isLocal = product.city === 'São Paulo'; // Assumindo usuário em SP
    const deliveryDate = isLocal ? 'Hoje' : 'Sexta-feira';

    return (
        <div className="container mx-auto px-4 py-6">
            <button onClick={onBack} className="flex items-center gap-1 text-gray-600 hover:text-black mb-4 font-bold text-sm">
                <ArrowLeft size={16} /> Voltar aos resultados
            </button>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                {/* Image Section */}
                <div className="md:col-span-5 relative group">
                    <img src={product.image} alt={product.title} className="w-full rounded-md object-contain max-h-[500px] border border-gray-100" />
                    <button 
                        onClick={(e) => onToggleFavorite(e, product)}
                        className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md border border-gray-200 transition-all ${isFavorite ? 'bg-white text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                    >
                        <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                </div>

                {/* Info Section (Center) */}
                <div className="md:col-span-4 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline cursor-pointer">
                        Visite a loja da {product.seller}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-yellow-500">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
                             ))}
                        </div>
                        <span className="text-gray-600 text-sm hover:text-black cursor-pointer font-medium">{product.reviews} avaliações de clientes</span>
                    </div>

                    <div className="border-t border-b border-gray-100 py-4 my-2">
                         <div className="flex items-baseline gap-2">
                             <span className="text-sm text-gray-600">R$</span>
                             <span className="text-4xl font-light text-gray-900">{Math.floor(product.price)}</span>
                             <span className="text-sm text-gray-600">{product.price.toFixed(2).split('.')[1]}</span>
                         </div>
                         {product.originalPrice && (
                             <div className="text-sm text-gray-500 mt-1 font-medium">
                                 De: <span className="line-through">R$ {product.originalPrice.toFixed(2)}</span>
                             </div>
                         )}
                         <div className="text-sm text-gray-800 mt-2 font-bold">
                            em até 10x R$ {(product.price / 10).toLocaleString('pt-BR', {minimumFractionDigits: 2})} sem juros
                         </div>
                    </div>

                    <div className="space-y-3 text-sm">
                         <div className="flex items-start gap-3">
                             <div className="mt-1"><ShieldCheck size={18} className="text-gray-800"/></div>
                             <div>
                                 <p className="font-bold text-gray-900">Garantia ALFAN</p>
                                 <p className="text-gray-600">Receba o produto que está esperando ou devolvemos seu dinheiro.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-3">
                             <div className="mt-1"><Award size={18} className="text-gray-800"/></div>
                             <div>
                                 <p className="font-bold text-gray-900">Vendedor {product.sellerLevel === 'platinum' ? 'Platinum' : 'Verificado'}</p>
                                 <p className="text-gray-600">+1000 vendas nos últimos 60 dias.</p>
                             </div>
                         </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-bold text-gray-900 mb-2">Sobre este item</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Buy Box (Right - Amazon Style) */}
                <div className="md:col-span-3">
                    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white sticky top-24">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                             R$ {product.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </div>
                        
                        {product.isPrime && (
                             <div className="flex items-center gap-1 text-sm text-gray-900 font-bold mb-4 bg-gray-100 p-2 rounded border border-gray-200">
                                 <Truck size={16} /> <span className="text-blue-700">Prime</span> <span className="text-gray-600 font-normal">Entrega GRÁTIS</span>
                             </div>
                        )}

                        {/* Local Delivery Info */}
                        <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                             <div className="flex items-center gap-1 mb-1">
                                <MapPin size={14} className="text-black"/> 
                                <span className="font-bold text-gray-900">Enviar para São Paulo</span>
                             </div>
                             <div className="pl-5">
                                <span className={isLocal ? "text-green-700 font-bold" : "text-black font-bold"}>
                                    Chega {deliveryDate}
                                </span>
                                {isLocal && <span className="text-xs bg-green-100 text-green-800 px-1 ml-2 rounded font-bold border border-green-200">FULL</span>}
                                <div className="text-xs text-gray-600 mt-0.5 font-medium">Vendido de: {product.neighborhood}, {product.city}</div>
                             </div>
                        </div>

                        <div className="text-lg text-green-700 font-bold mb-4">
                            Em estoque
                        </div>

                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => onAddToCart(product)}
                                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full font-bold transition-colors shadow-md"
                            >
                                Adicionar ao Carrinho
                            </button>
                            <button 
                                onClick={() => onBuyNow(product)}
                                className="w-full bg-white border-2 border-black hover:bg-gray-50 text-black py-3 rounded-full font-bold transition-colors"
                            >
                                Comprar Agora
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Section (Pergunte ao Vendedor) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                 <h3 className="text-xl font-bold text-gray-900 mb-6">Perguntas e Respostas</h3>
                 
                 <div className="flex gap-4 mb-8">
                     <input 
                       type="text" 
                       value={questionText}
                       onChange={(e) => setQuestionText(e.target.value)}
                       placeholder="Escreva sua dúvida..." 
                       className="flex-1 border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-black text-gray-900"
                     />
                     <button 
                        onClick={handleSendQuestion}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md font-bold transition-colors flex items-center gap-2"
                     >
                        <Send size={18}/> Perguntar
                     </button>
                 </div>

                 <div className="space-y-6">
                     <h4 className="font-bold text-gray-900">Últimas perguntas</h4>
                     {questions.map(q => (
                         <div key={q.id} className="text-sm">
                             <div className="flex items-center gap-2 mb-1">
                                 <MessageCircle size={14} className="text-gray-500"/>
                                 <span className="text-gray-900 font-bold">{q.text}</span>
                             </div>
                             {q.answer ? (
                                 <div className="flex items-center gap-2 pl-6 text-gray-700">
                                     <div className="w-0.5 h-3 bg-gray-300"></div>
                                     <span>{q.answer} <span className="text-xs text-gray-500 ml-1 font-medium">{q.date}</span></span>
                                 </div>
                             ) : (
                                 <div className="pl-6 text-xs text-gray-500 italic">Aguardando resposta...</div>
                             )}
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
}

// 4. MAIN APP COMPONENT

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Location Filter State
  const [locationFilter, setLocationFilter] = useState<string>('');
  
  // Price Filter State
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({ min: 0, max: 3000 });

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    {id: '1', title: 'Venda Aprovada', message: 'Você vendeu 1x Smartphone X Pro', read: false, type: 'sale', date: 'Hoje'},
    {id: '2', title: 'Pedido Enviado', message: 'Seu pedido #9920 está a caminho', read: true, type: 'system', date: 'Ontem'}
  ]);

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('product-detail');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    handleNavigate('checkout');
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
    handleNavigate('home');
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const handlePlaceOrder = () => {
    setCart([]);
    handleNavigate('order-confirmed');
    // Simulate new notification
    setTimeout(() => {
        setNotifications(prev => [{
            id: Date.now().toString(),
            title: 'Compra Confirmada',
            message: 'Seu pedido foi recebido com sucesso!',
            read: false,
            type: 'system',
            date: 'Agora'
        }, ...prev]);
    }, 2000);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter Products by Location AND Price
  const filteredProducts = products.filter(p => {
    const matchesLocation = locationFilter 
      ? (p.city === locationFilter || p.neighborhood === locationFilter)
      : true;
    
    const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;

    return matchesLocation && matchesPrice;
  });

  // Se a view for AUTH, renderizar apenas a AuthPage em tela cheia (sem Header/Footer)
  if (view === 'auth') {
    return <AuthPage onLoginSuccess={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header 
        cartCount={cartCount} 
        onNavigate={handleNavigate} 
        onSearch={() => {}}
        notifications={notifications}
      />

      <main className="flex-1 pb-10">
        {view === 'home' && (
          <>
            <HeroSection />
            
            {/* NOVO: Category Carousel substitui a grid antiga */}
            <CategoryCarousel onNavigate={handleNavigate} />

            <div className="container mx-auto px-4">
              
              {/* Location Filter Bar */}
              <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 mb-4 flex items-center gap-4 overflow-x-auto">
                 <span className="font-bold text-gray-900 text-sm whitespace-nowrap flex items-center gap-1">
                    <MapPin size={16}/> Filtrar por Localização:
                 </span>
                 <button 
                    onClick={() => setLocationFilter('')}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap font-medium ${!locationFilter ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400'}`}
                 >
                    Todos
                 </button>
                 <button 
                    onClick={() => setLocationFilter('São Paulo')}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap font-medium ${locationFilter === 'São Paulo' ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400'}`}
                 >
                    São Paulo (Capital)
                 </button>
                 <button 
                    onClick={() => setLocationFilter('Osasco')}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap font-medium ${locationFilter === 'Osasco' ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400'}`}
                 >
                    Osasco
                 </button>
                 <button 
                    onClick={() => setLocationFilter('Vila Madalena')}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap font-medium ${locationFilter === 'Vila Madalena' ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400'}`}
                 >
                    Vila Madalena
                 </button>
              </div>

              {/* Price Filter Section */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-6">
                 <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="font-bold text-gray-900 text-sm whitespace-nowrap flex items-center gap-1 min-w-[120px]">
                       <Filter size={16}/> Filtrar Preço:
                    </span>
                    
                    <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
                        {/* Range Slider for Max Price */}
                        <div className="flex-1 w-full flex items-center gap-3">
                            <span className="text-xs font-medium text-gray-500">Até</span>
                            <input 
                              type="range" 
                              min="0" 
                              max="5000" 
                              step="50"
                              value={priceRange.max} 
                              onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                        </div>

                        {/* Numeric Inputs */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">R$</span>
                                <input 
                                  type="number" 
                                  value={priceRange.min}
                                  onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                                  className="w-24 pl-7 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:border-black outline-none"
                                  placeholder="Mín"
                                />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">R$</span>
                                <input 
                                  type="number" 
                                  value={priceRange.max}
                                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 0})}
                                  className="w-24 pl-7 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:border-black outline-none"
                                  placeholder="Máx"
                                />
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              <div className="mb-8">
                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="text-black" size={20}/> 
                    {locationFilter ? `Produtos em ${locationFilter}` : 'Recomendados para você'}
                 </h2>
                 {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onClick={handleProductClick} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                        ))}
                    </div>
                 ) : (
                    <div className="text-center py-10 bg-white border border-gray-200 rounded-md">
                        <p className="text-gray-600 font-medium">Nenhum produto encontrado com estes filtros.</p>
                        <button onClick={() => {setLocationFilter(''); setPriceRange({min:0, max: 10000})}} className="text-blue-700 font-bold text-sm mt-2 hover:underline">Limpar Filtros</button>
                    </div>
                 )}
              </div>
            </div>
          </>
        )}

        {view === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onBuyNow={handleBuyNow}
            onBack={() => handleNavigate('home')} 
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {view === 'sell' && (
          <SellPage onAddProduct={handleAddProduct} />
        )}
        
        {view === 'seller-dashboard' && (
          <SellerDashboard products={products} onNavigate={handleNavigate} />
        )}

        {view === 'admin-dashboard' && (
          <AdminDashboard products={products} />
        )}

        {view === 'categories' && (
          <CategoriesPage categoryImages={CATEGORY_IMAGES} onNavigate={handleNavigate} />
        )}

        {view === 'purchases' && (
          <PurchasesPage onNavigate={handleNavigate} />
        )}

        {view === 'favorites' && (
           <FavoritesPage 
             products={products.filter(p => favorites.includes(p.id))}
             onProductClick={handleProductClick}
             onToggleFavorite={handleToggleFavorite}
             onNavigate={handleNavigate}
           />
        )}

        {view === 'checkout' && (
          <CheckoutPage 
             cart={cart} 
             total={cartTotal} 
             onPlaceOrder={handlePlaceOrder}
             onBack={() => handleNavigate('cart')}
          />
        )}

        {view === 'order-confirmed' && (
           <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <CheckCircle size={64} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h1>
              <p className="text-gray-700 mb-8 max-w-md font-medium">
                Obrigado por comprar no ALFAN. Enviamos um e-mail com os detalhes do seu pedido. O código de rastreamento estará disponível em breve.
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8 w-full max-w-md shadow-sm">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Número do Pedido</p>
                  <p className="text-2xl font-mono font-bold text-black">#ALF-{Math.floor(Math.random() * 1000000)}</p>
              </div>
              <button 
                onClick={() => handleNavigate('home')}
                className="bg-black text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-gray-800 transition-colors"
              >
                Continuar Comprando
              </button>
           </div>
        )}

        {view === 'cart' && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Carrinho ({cartCount} itens)</h2>
            
            {cart.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                       <ShoppingBag size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h3>
                   <p className="text-gray-600 mb-6 font-medium">Descubra milhares de produtos incríveis no ALFAN.</p>
                   <button onClick={() => handleNavigate('home')} className="bg-black text-white px-8 py-3 rounded-md font-bold">
                       Começar a comprar
                   </button>
               </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 flex gap-4">
                                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded border border-gray-100" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                                        <p className="text-xs text-gray-600 mt-1 font-medium">Vendido por: {item.seller}</p>
                                        <div className="text-xs text-green-700 mt-1 font-bold">Em estoque</div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600"><Minus size={16}/></button>
                                            <span className="font-bold w-4 text-center text-gray-900">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600"><Plus size={16}/></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1">
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right min-w-[100px]">
                                    <div className="text-lg font-bold text-gray-900">
                                        R$ {(item.price * item.quantity).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        R$ {item.price.toFixed(2)} un.
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumo do pedido</h3>
                            <div className="space-y-3 text-sm text-gray-700 mb-6 font-medium">
                                <div className="flex justify-between">
                                    <span>Produtos ({cartCount})</span>
                                    <span>R$ {cartTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frete</span>
                                    <span className="text-green-700 font-bold">Grátis</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>R$ {cartTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleNavigate('checkout')}
                                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-md font-bold text-lg transition-colors mb-3"
                            >
                                Finalizar Compra
                            </button>
                            <button onClick={() => handleNavigate('home')} className="w-full bg-white border border-black text-black py-3 rounded-md font-bold transition-colors">
                                Escolher mais produtos
                            </button>
                            <div className="mt-6 flex justify-center gap-2">
                                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">VISA</div>
                                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">MC</div>
                                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">PIX</div>
                                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">BOLETO</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        )}
      </main>

      {/* AI Chat Widget */}
      <AIChat />

      <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4 text-gray-200">Conheça-nos</h4>
              <ul className="space-y-2 text-sm text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer">Sobre o ALFAN</li>
                <li className="hover:text-white cursor-pointer">Carreiras</li>
                <li className="hover:text-white cursor-pointer">Imprensa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-200">Ganhe Dinheiro</h4>
              <ul className="space-y-2 text-sm text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer">Venda no ALFAN</li>
                <li className="hover:text-white cursor-pointer">Seja um entregador</li>
                <li className="hover:text-white cursor-pointer">Associados</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-200">Pagamento</h4>
              <ul className="space-y-2 text-sm text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer">Cartões de crédito</li>
                <li className="hover:text-white cursor-pointer">Pix</li>
                <li className="hover:text-white cursor-pointer">Boleto</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-200">Ajuda</h4>
              <ul className="space-y-2 text-sm text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer">Rastrear Pedidos</li>
                <li className="hover:text-white cursor-pointer">Trocas e Devoluções</li>
                <li className="hover:text-white cursor-pointer">Fale Conosco</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium">
             <div className="flex items-center gap-4 mb-4 md:mb-0">
                <span className="font-bold text-xl tracking-tighter text-white">ALFAN</span>
                <span>© 2024 ALFAN Tecnologia Ltda.</span>
             </div>
             <div className="flex gap-4">
                <span className="cursor-pointer hover:text-white">Termos de Uso</span>
                <span className="cursor-pointer hover:text-white">Privacidade</span>
                <span className="cursor-pointer hover:text-white">Acessibilidade</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// MOCK PRODUCTS UPDATED WITH LOCATIONS
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Smartphone ALFAN X Pro 256GB Grafite - Câmera 108MP',
    price: 2499.90,
    originalPrice: 3299.90,
    image: 'https://picsum.photos/400/400?random=1',
    description: 'O Smartphone ALFAN X Pro redefine a fotografia móvel. Com sensor de 108MP, processador de última geração e bateria para o dia todo. Tela AMOLED de 120Hz para fluidez incrível.',
    seller: 'ALFAN Oficial',
    sellerLevel: 'platinum',
    category: 'Tecnologia',
    shipping: 'free',
    rating: 4.8,
    reviews: 1240,
    isPrime: true,
    isFlashDeal: true,
    stockSold: 850,
    stockTotal: 1000,
    city: 'São Paulo',
    neighborhood: 'Centro'
  },
  {
    id: '2',
    title: 'Tênis Running Performance Black Edition',
    price: 299.90,
    originalPrice: 499.90,
    image: 'https://picsum.photos/400/400?random=2',
    description: 'Conforto e estilo para sua corrida. Tecnologia de amortecimento avançada e tecido respirável.',
    seller: 'SportLife',
    sellerLevel: 'gold',
    category: 'Esportes',
    shipping: 'paid',
    rating: 4.5,
    reviews: 85,
    isFlashDeal: true,
    stockSold: 45,
    stockTotal: 100,
    city: 'Osasco',
    neighborhood: 'Centro'
  },
  {
    id: '3',
    title: 'Fones de Ouvido Bluetooth Noise Cancelling',
    price: 199.90,
    originalPrice: 299.90,
    image: 'https://picsum.photos/400/400?random=3',
    description: 'Isolamento acústico perfeito. Bateria de 30 horas.',
    seller: 'AudioTech',
    sellerLevel: 'standard',
    category: 'Tecnologia',
    shipping: 'free',
    rating: 4.2,
    reviews: 320,
    isPrime: true,
    city: 'São Paulo',
    neighborhood: 'Vila Madalena'
  },
  {
    id: '4',
    title: 'Smartwatch Series 5 Preto',
    price: 899.00,
    originalPrice: 1200.00,
    image: 'https://picsum.photos/400/400?random=4',
    description: 'Monitore sua saúde com estilo. GPS integrado e resistente à água.',
    seller: 'TechStore',
    category: 'Tecnologia',
    shipping: 'free',
    rating: 4.7,
    reviews: 500,
    isFlashDeal: true,
    stockSold: 400,
    stockTotal: 450,
    city: 'Campinas',
    neighborhood: 'Cambuí'
  },
  {
    id: '5',
    title: 'Cadeira Gamer Ergonômica Black',
    price: 850.00,
    originalPrice: 1100.00,
    image: 'https://picsum.photos/400/400?random=5',
    description: 'Conforto para longas horas de jogo ou trabalho. Design ergonômico e ajuste de altura.',
    seller: 'GamerZone',
    sellerLevel: 'gold',
    category: 'Games',
    shipping: 'paid',
    rating: 4.9,
    reviews: 120,
    city: 'São Paulo',
    neighborhood: 'Moema'
  },
  {
    id: '6',
    title: 'Cafeteira Expresso Automática Inox',
    price: 450.00,
    originalPrice: 600.00,
    image: 'https://picsum.photos/400/400?random=6',
    description: 'Café fresquinho todo dia. Pressão de 15 bar e vaporizador de leite.',
    seller: 'HomeApp',
    category: 'Casa',
    shipping: 'free',
    rating: 4.3,
    reviews: 210,
    isFlashDeal: true,
    stockSold: 180,
    stockTotal: 200,
    city: 'Osasco',
    neighborhood: 'Vila Yara'
  }
];

export default App;