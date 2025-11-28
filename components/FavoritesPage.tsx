
import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

interface FavoritesPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onToggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onNavigate: (view: any) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ products, onProductClick, onToggleFavorite, onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="text-black fill-black" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Meus Favoritos</h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick} 
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Heart size={40} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-2">Sua lista de favoritos está vazia</h3>
           <p className="text-gray-600 mb-6 font-medium">Salve os produtos que você mais gosta para ver depois.</p>
           <button onClick={() => onNavigate('home')} className="bg-black text-white px-8 py-3 rounded-md font-bold">
               Explorar Produtos
           </button>
       </div>
      )}
    </div>
  );
};
