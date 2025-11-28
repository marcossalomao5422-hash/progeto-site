import React from 'react';
import { Search, Package, ChevronRight, MoreVertical, MessageCircle, Truck } from 'lucide-react';

interface PurchasesPageProps {
  onNavigate: (view: any) => void;
}

// Mock de dados de compras passadas do usuário
const MOCK_USER_PURCHASES = [
  {
    id: '#ALF-29384',
    date: '21 de outubro',
    status: 'delivered',
    statusText: 'Entregue',
    items: [
      {
        title: 'Smartphone ALFAN X Pro 256GB Grafite',
        image: 'https://picsum.photos/400/400?random=1',
        quantity: 1,
        price: 2499.90,
        seller: 'ALFAN Oficial'
      }
    ]
  },
  {
    id: '#ALF-10293',
    date: '15 de setembro',
    status: 'delivered',
    statusText: 'Entregue',
    items: [
      {
        title: 'Tênis Running Performance Black',
        image: 'https://picsum.photos/400/400?random=2',
        quantity: 1,
        price: 299.90,
        seller: 'SportLife'
      },
      {
        title: 'Meias Esportivas Pack 3',
        image: 'https://picsum.photos/400/400?random=12',
        quantity: 2,
        price: 29.90,
        seller: 'SportLife'
      }
    ]
  },
  {
    id: '#ALF-00123',
    date: '10 de agosto',
    status: 'cancelled',
    statusText: 'Cancelado',
    items: [
      {
        title: 'Cafeteira Expresso Automática',
        image: 'https://picsum.photos/400/400?random=6',
        quantity: 1,
        price: 450.00,
        seller: 'HomeApp'
      }
    ]
  }
];

export const PurchasesPage: React.FC<PurchasesPageProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Minhas Compras</h1>
        
        <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar em suas compras" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black outline-none shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
         <button className="pb-3 border-b-2 border-black font-bold text-black text-sm whitespace-nowrap">Todas</button>
         <button className="pb-3 border-b-2 border-transparent font-medium text-gray-500 hover:text-black text-sm whitespace-nowrap transition-colors">Em andamento</button>
         <button className="pb-3 border-b-2 border-transparent font-medium text-gray-500 hover:text-black text-sm whitespace-nowrap transition-colors">Canceladas</button>
      </div>

      <div className="space-y-4">
        {MOCK_USER_PURCHASES.map((purchase) => (
           <div key={purchase.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Header do Card */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                 <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-bold text-gray-900 block md:inline md:mr-2">{purchase.date}</span>
                    </div>
                    {purchase.status === 'delivered' ? (
                        <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide flex items-center gap-1">
                            <Truck size={12}/> {purchase.statusText}
                        </span>
                    ) : (
                        <span className="text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
                            {purchase.statusText}
                        </span>
                    )}
                 </div>
                 <div className="text-xs text-gray-500 font-mono">
                    Pedido {purchase.id}
                 </div>
              </div>

              {/* Itens */}
              <div className="p-6">
                 {purchase.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 mb-6 last:mb-0">
                       <div className="w-16 h-16 md:w-20 md:h-20 border border-gray-200 rounded-md bg-white p-1 flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                       </div>
                       <div className="flex-1">
                          <h3 className="text-sm font-bold text-black line-clamp-2 md:line-clamp-1 mb-1">{item.title}</h3>
                          <p className="text-xs text-gray-500 mb-2">{item.quantity}un. • Vendido por {item.seller}</p>
                          
                          <div className="flex gap-4 mt-2">
                             <button 
                                onClick={() => onNavigate('product-detail')} // Simulando ir para o produto
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors"
                             >
                                Comprar novamente
                             </button>
                             <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded text-xs font-bold border border-gray-200 transition-colors hidden md:block">
                                Ver detalhes
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Footer Ações */}
              <div className="px-6 py-3 border-t border-gray-100 bg-white flex justify-between items-center">
                 <button className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <MessageCircle size={14}/> Preciso de ajuda
                 </button>
                 {purchase.status === 'delivered' && (
                     <button className="text-xs text-gray-500 hover:text-black font-medium">
                        Avaliar produto
                     </button>
                 )}
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};
