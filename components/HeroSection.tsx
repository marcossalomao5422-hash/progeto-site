import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'OFERTA DO DIA',
    title: 'Tecnologia Essencial',
    subtitle: 'Descontos de até 40% em produtos selecionados.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    cta: 'Ver ofertas'
  },
  {
    id: 2,
    tag: 'NOVA COLEÇÃO',
    title: 'Estilo Urbano',
    subtitle: 'Roupas e calçados com o melhor do streetwear.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    cta: 'Comprar agora'
  },
  {
    id: 3,
    tag: 'CASA INTELIGENTE',
    title: 'Conforto & Tech',
    subtitle: 'Automatize sua casa com os melhores dispositivos.',
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=1600&q=80',
    cta: 'Descobrir'
  },
  {
    id: 4,
    tag: 'ESPORTES',
    title: 'Alta Performance',
    subtitle: 'Equipamentos para levar seu treino ao próximo nível.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
    cta: 'Ver equipamentos'
  }
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="w-full bg-gray-100 mb-6 shadow-sm border-b border-gray-200 group relative">
      <div className="container mx-auto px-4 md:px-0 h-64 md:h-[420px] relative overflow-hidden md:rounded-b-lg">
        
        {/* Slides */}
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
             {/* Background Image with Gradient Overlay */}
            <div className="relative w-full h-full">
                <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center">
                     <div className="container mx-auto px-8 md:px-16">
                        <div className="max-w-xl text-white animate-in slide-in-from-left-10 duration-700 fade-in">
                            <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-bold rounded mb-4 tracking-widest uppercase border border-gray-200">
                                {slide.tag}
                            </span>
                            <h1 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="text-gray-200 text-lg md:text-xl mb-8 font-medium drop-shadow-md max-w-md leading-relaxed">
                                {slide.subtitle}
                            </p>
                            <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm uppercase tracking-wide">
                                {slide.cta}
                            </button>
                        </div>
                     </div>
                </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators (Pagination - Andes Style) */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
           <ul className="flex items-center gap-3">
               {SLIDES.map((_, index) => (
                   <li key={index}>
                       <button
                           onClick={() => goToSlide(index)}
                           className={`transition-all duration-300 rounded-full focus:outline-none shadow-sm ${
                               currentSlide === index 
                                 ? 'w-2.5 h-2.5 bg-white scale-110' 
                                 : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                           }`}
                           aria-label={`Ir para slide ${index + 1}`}
                       />
                   </li>
               ))}
           </ul>
        </div>

        {/* Navigation Arrows */}
        <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-lg"
        >
            <ChevronLeft size={24} />
        </button>
        <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-lg"
        >
            <ChevronRight size={24} />
        </button>

      </div>
    </div>
  );
};