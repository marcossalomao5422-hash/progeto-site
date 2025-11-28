
import React from 'react';
import { CATEGORIES } from '../types';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface CategoriesPageProps {
  categoryImages: Record<string, string>;
  onNavigate: (view: any) => void;
}

// Subcategorias simuladas para dar aparência de marketplace real
const SUB_CATEGORIES: Record<string, string[]> = {
  "Tecnologia": ["Celulares e Smartphones", "Notebooks", "Acessórios", "Tablets", "Impressoras"],
  "Moda": ["Roupas Femininas", "Roupas Masculinas", "Calçados", "Bolsas", "Relógios"],
  "Casa": ["Móveis", "Decoração", "Cama, Mesa e Banho", "Utilidades Domésticas", "Ferramentas"],
  "Esportes": ["Futebol", "Fitness", "Ciclismo", "Camping", "Roupas Esportivas"],
  "Brinquedos": ["Bonecas", "Carrinhos", "Jogos de Tabuleiro", "LEGO", "Educativos"],
  "Beleza": ["Maquiagem", "Perfumes", "Cuidados com a Pele", "Cabelo", "Barba"],
  "Games": ["PlayStation", "Xbox", "Nintendo", "Jogos PC", "Cadeiras Gamer"],
  "Livros": ["Romance", "Autoajuda", "Negócios", "HQs e Mangás", "Infantis"]
};

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ categoryImages, onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Departamentos</h1>
        <p className="text-gray-500">Explore todos os produtos do ALFAN por categoria.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <div 
            key={idx} 
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
            onClick={() => onNavigate('home')} // Em um app real, filtraria a home
          >
            {/* Imagem de Capa da Categoria */}
            <div className="h-40 w-full overflow-hidden relative">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
               <img 
                 src={categoryImages[cat] || "https://picsum.photos/400/200"} 
                 alt={cat} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
                {cat}
                <ChevronRight className="text-gray-300 group-hover:text-black transition-colors" size={20}/>
              </h2>
              
              <ul className="space-y-2 mb-6 flex-1">
                {SUB_CATEGORIES[cat]?.map((sub, i) => (
                  <li key={i} className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center gap-1">
                     {sub}
                  </li>
                )) || <li className="text-sm text-gray-400">Ver produtos...</li>}
              </ul>

              <button className="text-sm font-bold text-black flex items-center gap-2 group-hover:gap-3 transition-all">
                Ver tudo em {cat} <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Banner Promocional Inferior */}
      <div className="mt-12 bg-black text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Venda na categoria certa</h2>
            <p className="text-gray-300 mb-6">Lojistas que categorizam seus produtos corretamente vendem até 3x mais. Acesse o painel e otimize seus anúncios.</p>
            <button 
              onClick={() => onNavigate('sell')}
              className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors"
            >
               Começar a Vender
            </button>
         </div>
         <div className="hidden md:block">
            {/* Elemento visual abstrato */}
            <div className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center">
               <div className="w-20 h-20 bg-white/10 rounded-full"></div>
            </div>
         </div>
      </div>
    </div>
  );
};