import React from 'react';
import { Product } from '../types';
import { ShieldCheck, Check, X, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ products }) => {
  // Simulando produtos pendentes de aprovação
  const pendingProducts = products.slice(0, 2).map(p => ({...p, status: 'pending_approval' as const}));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck size={28} /> Painel Administrativo
        </h1>
        <p className="text-gray-500">Curadoria de produtos e aprovação de vendedores.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-100">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <AlertTriangle className="text-yellow-500" size={20}/> Aprovações Pendentes
           </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {pendingProducts.map((product) => (
             <div key={product.id} className="p-6 flex flex-col md:flex-row gap-6">
                <img src={product.image} className="w-32 h-32 object-contain border border-gray-200 rounded-md bg-gray-50" />
                
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{product.title}</h3>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Aguardando Revisão</span>
                   </div>
                   
                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                   
                   <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                         <span className="text-gray-500">Vendedor:</span> <span className="font-medium">{product.seller}</span>
                      </div>
                      <div>
                         <span className="text-gray-500">Preço:</span> <span className="font-medium">R$ {product.price.toFixed(2)}</span>
                      </div>
                      <div>
                         <span className="text-gray-500">Categoria:</span> <span className="font-medium">{product.category}</span>
                      </div>
                      <div>
                         <span className="text-gray-500">Localização:</span> <span className="font-medium">{product.neighborhood || 'Não informado'} - {product.city || 'SP'}</span>
                      </div>
                   </div>

                   <div className="flex gap-3 mt-auto">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2">
                         <Check size={16} /> Aprovar Produto
                      </button>
                      <button className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded font-bold text-sm flex items-center gap-2">
                         <X size={16} /> Rejeitar
                      </button>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
