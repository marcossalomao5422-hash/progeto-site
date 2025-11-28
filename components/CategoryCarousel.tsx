
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryCarouselProps {
  onNavigate: (view: any) => void;
}

const EXTENDED_CATEGORIES = [
  { name: "Roupas Femininas", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=200&q=80" },
  { name: "Casa e Construção", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80" },
  { name: "Roupas Plus Size", img: "https://images.unsplash.com/photo-1596472410313-2d54e4c9c229?auto=format&fit=crop&w=200&q=80" },
  { name: "Beleza", img: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=200&q=80" },
  { name: "Roupas Masculinas", img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=200&q=80" },
  { name: "Sapatos Femininos", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=200&q=80" },
  { name: "Sapatos Masculinos", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=200&q=80" },
  { name: "Moda Infantil", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=200&q=80" },
  { name: "Acessórios", img: "https://images.unsplash.com/photo-1509319117193-518fa19807fa?auto=format&fit=crop&w=200&q=80" },
  { name: "Relógios", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=200&q=80" },
  { name: "Celulares", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80" },
  { name: "Esportes", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80" },
  { name: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=200&q=80" },
  { name: "Brinquedos", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=200&q=80" },
  { name: "Veículos", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=200&q=80" },
  { name: "Saúde", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80" },
  { name: "Áudio", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80" },
  { name: "Bebês", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=200&q=80" },
  { name: "Bolsas", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80" },
  { name: "Pets", img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=200&q=80" },
  { name: "Papelaria", img: "https://images.unsplash.com/photo-1456735190827-d1261f7addb2?auto=format&fit=crop&w=200&q=80" },
  { name: "Computadores", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80" },
  { name: "Games", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=200&q=80" },
];

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 800; // Scroll mais largo
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white my-6 py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Categorias</h2>
        
        <div className="relative group">
          {/* Botão Esquerda */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Lista Scrollável */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          >
            {EXTENDED_CATEGORIES.map((cat, index) => (
              <button 
                key={index}
                onClick={() => onNavigate('categories')}
                className="flex flex-col items-center gap-3 min-w-[100px] w-[100px] group/item transition-transform hover:-translate-y-1"
              >
                <div className="w-[100px] h-[100px] border border-gray-200 rounded-lg overflow-hidden relative bg-gray-50 group-hover/item:border-black group-hover/item:shadow-md transition-all">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-500"
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover/item:text-black line-clamp-2">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Botão Direita */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};