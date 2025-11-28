import React, { useState } from 'react';
import { Product, Order, Question } from '../types';
import { Package, DollarSign, MessageCircle, Box, ChevronRight, CheckCircle, Clock, AlertCircle, TrendingUp, Store } from 'lucide-react';

interface SellerDashboardProps {
  products: Product[];
  onNavigate: (view: any) => void;
}

// Mock Data for Dashboard
const MOCK_ORDERS: Order[] = [
  { id: '#ALF-9921', customerName: 'João Silva', date: 'Hoje, 10:30', status: 'pending', total: 249.90, paymentMethod: 'pix', items: [] },
  { id: '#ALF-9920', customerName: 'Maria Oliveira', date: 'Ontem, 14:20', status: 'shipping', total: 89.90, paymentMethod: 'credit', items: [] },
  { id: '#ALF-9918', customerName: 'Carlos Souza', date: '23/10', status: 'delivered', total: 1200.00, paymentMethod: 'credit', items: [] },
];

const MOCK_QUESTIONS: Question[] = [
  { id: 'q1', productId: '1', user: 'Ana P.', text: 'O produto é original? Vem com nota fiscal?', date: 'Há 1 hora' },
  { id: 'q2', productId: '2', user: 'Roberto M.', text: 'Tem garantia de quanto tempo?', date: 'Há 3 horas' },
];

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ products, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'questions'>('overview');

  const myProducts = products.filter(p => p.seller === 'Sua Loja (Logista)' || p.seller === 'ALFAN Oficial'); // Simulando produtos do usuário

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Store size={28} /> Painel do Lojista
          </h1>
          <p className="text-gray-500">Gerencie suas vendas, estoque e reputação.</p>
        </div>
        <button 
          onClick={() => onNavigate('sell')}
          className="bg-black text-white px-6 py-2 rounded-md font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Box size={18} /> Novo Anúncio
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center gap-3 ${activeTab === 'overview' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <TrendingUp size={18} /> Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center gap-3 ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <Package size={18} /> Pedidos <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 rounded-full">2</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center gap-3 ${activeTab === 'products' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <Box size={18} /> Meus Produtos
          </button>
          <button 
            onClick={() => setActiveTab('questions')}
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center gap-3 ${activeTab === 'questions' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <MessageCircle size={18} /> Perguntas <span className="ml-auto bg-blue-500 text-white text-[10px] px-1.5 rounded-full">2</span>
          </button>
          <button 
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center gap-3 bg-white text-gray-600 hover:bg-gray-50`}
          >
            <DollarSign size={18} /> Financeiro
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">Vendas Hoje</div>
                  <div className="text-2xl font-bold text-gray-900">R$ 1.240,00</div>
                  <div className="text-green-600 text-xs mt-2 flex items-center gap-1"><TrendingUp size={12}/> +15% vs ontem</div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">A Liberar (Mercado Pago)</div>
                  <div className="text-2xl font-bold text-gray-900">R$ 4.850,00</div>
                  <div className="text-gray-400 text-xs mt-2">Próximo repasse: 25/10</div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">Reputação</div>
                  <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                     Gold <CheckCircle size={20} />
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                     <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Últimas Atividades</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-50">
                    <div className="bg-green-100 p-2 rounded-full text-green-700"><DollarSign size={16}/></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Venda aprovada #ALF-9921</p>
                      <p className="text-xs text-gray-500">Há 15 minutos • R$ 249,90</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-50">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700"><MessageCircle size={16}/></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nova pergunta em "Tênis Running"</p>
                      <p className="text-xs text-gray-500">Há 1 hora</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
               <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                 <h3 className="font-bold">Gerenciar Pedidos</h3>
                 <div className="text-xs text-gray-500">Mostrando últimos 30 dias</div>
               </div>
               <div className="divide-y divide-gray-100">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col md:flex-row items-center justify-between gap-4">
                       <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'shipping' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                             <Package size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                               <span className="font-bold text-gray-900">{order.id}</span>
                               <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{order.customerName}</span>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                               <span>{order.date}</span> • <span>{order.paymentMethod.toUpperCase()}</span>
                            </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-right">
                             <div className="font-bold text-gray-900">R$ {order.total.toFixed(2)}</div>
                             <div className={`text-xs font-bold uppercase ${order.status === 'pending' ? 'text-yellow-600' : order.status === 'shipping' ? 'text-blue-600' : 'text-green-600'}`}>
                                {order.status === 'pending' ? 'Pendente de Envio' : order.status === 'shipping' ? 'Em Trânsito' : 'Entregue'}
                             </div>
                          </div>
                          <button className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800">
                             {order.status === 'pending' ? 'Imprimir Etiqueta' : 'Ver Detalhes'}
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* QUESTIONS TAB */}
          {activeTab === 'questions' && (
             <div className="space-y-4">
                {MOCK_QUESTIONS.map(q => (
                  <div key={q.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-gray-900">{q.user} perguntou:</span>
                        <span className="text-xs text-gray-500">{q.date}</span>
                     </div>
                     <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded">{q.text}</p>
                     
                     <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Escreva sua resposta..." 
                          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold">
                           Responder
                        </button>
                     </div>
                     <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                        <Clock size={10} /> Tempo médio de resposta: 15 min (Isso ajuda sua reputação!)
                     </p>
                  </div>
                ))}
             </div>
          )}

           {/* PRODUCTS TAB */}
           {activeTab === 'products' && (
             <div className="bg-white rounded-lg border border-gray-200">
                 <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold">Estoque Ativo ({myProducts.length})</h3>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {myProducts.length > 0 ? myProducts.map(p => (
                      <div key={p.id} className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <img src={p.image} className="w-12 h-12 object-contain border border-gray-100 rounded" />
                            <div>
                               <p className="font-medium text-sm text-gray-900 line-clamp-1">{p.title}</p>
                               <p className="text-xs text-gray-500">R$ {p.price.toFixed(2)} • Estoque: {p.stockTotal ? p.stockTotal - (p.stockSold || 0) : 'N/A'}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button className="text-xs font-bold text-blue-600 hover:underline">Editar</button>
                            <button className="text-xs font-bold text-red-600 hover:underline">Pausar</button>
                         </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-gray-500">
                        Você ainda não tem produtos cadastrados.
                      </div>
                    )}
                 </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};
