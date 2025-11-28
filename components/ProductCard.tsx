
import React from 'react';
import { Product } from '../types';
import { Heart, Truck, Crown } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isFavorite, onToggleFavorite }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full group border border-gray-200 relative overflow-hidden"
    >
      {/* Badges Overlay */}
      <div className="absolute top-0 left-0 z-10 p-2 flex flex-col gap-1 items-start">
         {product.isPrime && (
             <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border border-gray-300">
                 <Crown size={10} fill="black" /> PRIME
             </span>
         )}
      </div>

      <div className="relative pt-[100%] overflow-hidden border-b border-gray-50">
        <img 
          src={product.image} 
          alt={product.title} 
          onClick={(e) => {
            e.stopPropagation();
            onClick(product);
          }}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 grayscale-[20%] group-hover:grayscale-0"
        />
        
        <button 
            onClick={(e) => onToggleFavorite && onToggleFavorite(e, product)}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all shadow-md z-10 border border-gray-100 ${isFavorite ? 'bg-white text-red-500 opacity-100' : 'bg-white/90 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'}`}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="mb-1">
             {product.shipping === 'free' && (
                <span className="bg-gray-100 text-gray-800 text-[9px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-1 mr-1 border border-gray-200">
                    <Truck size={10} /> FRETE GRÁTIS
                </span>
            )}
            {product.sellerLevel === 'platinum' && (
                <span className="bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    INDICADO
                </span>
            )}
        </div>

        <h3 className="text-black text-xs md:text-sm font-medium leading-snug mb-2 line-clamp-2 min-h-[2.5em]">
          {product.title}
        </h3>
        
        <div className="mt-auto">
          {product.originalPrice && (
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 line-through">
                R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                {discount > 0 && (
                    <span className="bg-black text-white text-[10px] font-bold px-1 rounded">
                        -{discount}%
                    </span>
                )}
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg md:text-xl font-bold text-black">
              R$ <span className="text-xl md:text-2xl">{Math.floor(product.price)}</span>
              <span className="text-xs align-top">,{product.price.toFixed(2).split('.')[1]}</span>
            </span>
          </div>

          <div className="text-[10px] text-gray-800 font-medium mb-2">
            em 12x R$ {(product.price / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          
          {product.reviews > 0 && (
              <div className="text-[10px] text-gray-800 mt-1 font-medium">
                  {product.reviews} vendidos
              </div>
          )}
        </div>
      </div>
    </div>
  );
};
