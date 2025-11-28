import React, { useState } from 'react';
import { CartItem } from '../types';
import { CreditCard, QrCode, Barcode, MapPin, Truck, ShieldCheck, Lock, ChevronRight, Loader2 } from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onPlaceOrder: () => void;
  onBack: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, total, onPlaceOrder, onBack }) => {
  const [step, setStep] = useState<1 | 2>(1); // 1: Endereço, 2: Pagamento
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  // Address State
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    uf: ''
  });

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAddress(prev => ({ ...prev, cep: value }));

    if (value.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setAddress(prev => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            uf: data.uf
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  // Simulação de delay no pagamento
  const handleFinalize = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPlaceOrder();
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <button onClick={onBack} className="hover:text-black">Carrinho</button>
        <ChevronRight size={14} />
        <span className="font-bold text-black">Pagamento</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLUNA ESQUERDA - FORMULÁRIOS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* ETAPA 1: ENDEREÇO */}
          <div className={`bg-white p-6 rounded-lg border ${step === 1 ? 'border-black ring-1 ring-black' : 'border-gray-200 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold flex items-center gap-2">
                 <MapPin className="text-gray-900" size={20} /> 1. Endereço de Entrega
               </h2>
               {step === 2 && (
                 <button onClick={() => setStep(1)} className="text-sm text-blue-600 font-medium hover:underline">Alterar</button>
               )}
            </div>
            
            <div className={step === 2 ? 'hidden' : 'block'}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="md:col-span-2 relative">
                  <label className="block text-xs font-bold text-gray-700 mb-1">CEP</label>
                  <input 
                    type="text" 
                    placeholder="00000-000" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none" 
                    required 
                    maxLength={9}
                    value={address.cep}
                    onChange={handleCepChange}
                  />
                  {loadingCep && (
                    <div className="absolute right-3 top-8">
                        <Loader2 className="animate-spin text-gray-400" size={20} />
                    </div>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rua / Avenida</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Av. Paulista" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none" 
                    required 
                    value={address.street}
                    onChange={(e) => handleChange('street', e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Número</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none" 
                    required 
                    value={address.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Bairro</label>
                  <input 
                    type="text" 
                    placeholder="Bairro" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none" 
                    required 
                    value={address.neighborhood}
                    onChange={(e) => handleChange('neighborhood', e.target.value)}
                  />
                </div>
                 <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Cidade / UF</label>
                  <input 
                    type="text" 
                    placeholder="São Paulo - SP" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none bg-white font-bold text-gray-900" 
                    required 
                    readOnly
                    value={address.city && address.uf ? `${address.city} - ${address.uf}` : ''}
                  />
                </div>
                <div className="md:col-span-2 mt-2">
                   <button type="submit" className="bg-black text-white px-6 py-3 rounded font-bold text-sm hover:bg-gray-800 transition-colors">
                     Salvar e Continuar
                   </button>
                </div>
              </form>
            </div>
            
            {step === 2 && (
                <div className="text-sm text-gray-600 pl-7">
                    {address.street}, {address.number} - {address.neighborhood}, {address.city} - {address.uf} <br/>
                    <span className="text-green-600 font-bold text-xs flex items-center gap-1 mt-1"><Truck size={12}/> Chega até Sexta-feira</span>
                </div>
            )}
          </div>

          {/* ETAPA 2: PAGAMENTO */}
          <div className={`bg-white p-6 rounded-lg border ${step === 2 ? 'border-black ring-1 ring-black' : 'border-gray-200 opacity-60 pointer-events-none'}`}>
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <CreditCard className="text-gray-900" size={20} /> 2. Método de Pagamento
                </h2>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <span>PROCESSADO POR</span>
                    <span className="text-[#009EE3]">MERCADO PAGO</span>
                </div>
             </div>

             {step === 2 && (
               <div>
                  {/* SELEÇÃO DE MÉTODO */}
                  <div className="flex flex-col md:flex-row gap-3 mb-6">
                      <button 
                        onClick={() => setPaymentMethod('credit')}
                        className={`flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === 'credit' ? 'border-[#009EE3] bg-blue-50/20 text-[#009EE3]' : 'border-gray-200 hover:border-gray-400'}`}
                      >
                          <CreditCard size={24} />
                          <span className="font-bold text-sm text-gray-900">Cartão</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('pix')}
                        className={`flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === 'pix' ? 'border-[#009EE3] bg-blue-50/20 text-[#009EE3]' : 'border-gray-200 hover:border-gray-400'}`}
                      >
                          <QrCode size={24} />
                          <span className="font-bold text-sm text-gray-900">Pix</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('boleto')}
                        className={`flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === 'boleto' ? 'border-[#009EE3] bg-blue-50/20 text-[#009EE3]' : 'border-gray-200 hover:border-gray-400'}`}
                      >
                          <Barcode size={24} />
                          <span className="font-bold text-sm text-gray-900">Boleto</span>
                      </button>
                  </div>

                  {/* CONTEÚDO DO MÉTODO */}
                  <div className="p-4 bg-gray-50 rounded border border-gray-100 mb-6">
                      {paymentMethod === 'credit' && (
                          <div className="space-y-4 max-w-md">
                              <div>
                                  <label className="block text-xs font-bold text-gray-700 mb-1">Número do Cartão</label>
                                  <div className="relative">
                                     <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none bg-white" />
                                     <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-gray-700 mb-1">Validade</label>
                                      <input type="text" placeholder="MM/AA" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none bg-white" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                                      <input type="text" placeholder="123" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none bg-white" />
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-gray-700 mb-1">Nome no Cartão</label>
                                  <input type="text" placeholder="Como impresso no cartão" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black outline-none bg-white" />
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                  <input type="checkbox" id="installments" className="rounded text-black focus:ring-black" />
                                  <label htmlFor="installments" className="text-sm text-gray-700">Parcelar em 12x de R$ {(total/12).toLocaleString('pt-BR', {minimumFractionDigits: 2})} sem juros</label>
                              </div>
                          </div>
                      )}
                      
                      {paymentMethod === 'pix' && (
                          <div className="text-center py-4">
                              <div className="bg-white p-4 inline-block rounded shadow-sm mb-4">
                                <QrCode size={120} className="mx-auto" />
                              </div>
                              <p className="font-bold text-gray-900">O código Pix será gerado na próxima tela.</p>
                              <p className="text-sm text-gray-500 mt-2">Aprovação em segundos via Mercado Pago.</p>
                          </div>
                      )}

                      {paymentMethod === 'boleto' && (
                           <div className="text-center py-4">
                               <Barcode size={64} className="mx-auto text-gray-400 mb-2" />
                               <p className="font-bold text-gray-900">O boleto será gerado após a confirmação.</p>
                               <p className="text-sm text-gray-500 mt-2">Processado pelo Mercado Pago. Compensação em até 48h.</p>
                           </div>
                      )}
                  </div>

                  <button 
                    onClick={handleFinalize}
                    disabled={loading}
                    className="w-full bg-[#009EE3] hover:bg-[#0082ba] text-white py-4 rounded font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                      {loading ? 'Processando com Mercado Pago...' : `Pagar R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`}
                      {!loading && <ShieldCheck size={20} />}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                      <Lock size={10} /> Compra Garantida ALFAN via Mercado Pago
                  </p>
               </div>
             )}
          </div>
        </div>

        {/* COLUNA DIREITA - RESUMO */}
        <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Resumo do Pedido</h3>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-3">
                            <div className="w-12 h-12 flex-shrink-0 bg-gray-50 border border-gray-100 rounded overflow-hidden">
                                <img src={item.image} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium text-gray-900 line-clamp-2">{item.title}</p>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-500">Qtd: {item.quantity}</span>
                                    <span className="text-xs font-bold">R$ {(item.price * item.quantity).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Frete</span>
                        <span className="text-green-600 font-bold">Grátis</span>
                    </div>
                    {paymentMethod === 'pix' && (
                         <div className="flex justify-between text-green-700">
                            <span>Desconto Pix (5%)</span>
                            <span>- R$ {(total * 0.05).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <div className="text-right">
                        <span className="block font-bold text-2xl text-gray-900">
                            R$ {(paymentMethod === 'pix' ? total * 0.95 : total).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </span>
                        <span className="text-xs text-gray-500">em até 12x sem juros</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};