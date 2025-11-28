import React, { useState } from 'react';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Sign Up (false) and Login (true)
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login/cadastro
    setTimeout(() => {
        onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Image Container */}
        <div 
            className="absolute inset-0 z-0 opacity-40"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1000px] flex items-center justify-center p-4">
            
            {/* Left Side (Branding - Optional, visible on larger screens) */}
            <div className="hidden lg:flex flex-col text-white mr-16 max-w-sm">
                <h1 className="text-6xl font-extrabold tracking-tighter mb-4">ALFAN</h1>
                <p className="text-xl font-medium text-gray-200">
                    A plataforma de compras mais completa para você. Venda, compre e conecte-se.
                </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white w-full max-w-[400px] rounded-lg shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
                
                {/* Header */}
                <div className="px-8 pt-8 pb-4">
                    <h2 className="text-2xl font-medium text-gray-900">
                        {isLogin ? 'Login' : 'Cadastrar'}
                    </h2>
                </div>

                {/* Form Body */}
                <div className="px-8 flex-1 flex flex-col">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <input 
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-sm"
                                type="text" 
                                placeholder="Número de telefone" 
                                autoComplete="tel" 
                                name="phone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <input 
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-sm"
                                type="password" 
                                placeholder="Senha" 
                                autoComplete="current-password" 
                                name="password" 
                                maxLength={16} 
                                aria-label="Insira a senha" 
                                aria-invalid="false" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            className={`w-full py-3 rounded text-white font-medium text-sm transition-all shadow-md uppercase tracking-wide ${phone && password ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'}`}
                            disabled={!phone || !password}
                        >
                            {isLogin ? 'ENTRAR' : 'CADASTRAR'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs text-gray-400 uppercase font-medium">OU</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-4 mb-6">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded hover:bg-gray-50 transition-colors">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5" />
                             <span className="text-sm text-gray-700">Facebook</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded hover:bg-gray-50 transition-colors">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                             <span className="text-sm text-gray-700">Google</span>
                        </button>
                    </div>

                    {/* Terms */}
                    <div className="text-[11px] text-center text-gray-500 mt-auto mb-6 px-4 leading-tight">
                        Ao se inscrever, você concorda com as políticas do ALFAN <br/>
                        <a href="#" className="text-black font-bold hover:underline">Termos de serviço</a> & <a href="#" className="text-black font-bold hover:underline">Política de privacidade</a>
                    </div>
                </div>

                {/* Footer Switcher */}
                <div className="bg-gray-50 py-4 text-center text-sm text-gray-600 border-t border-gray-100">
                    {isLogin ? (
                        <>Novo no ALFAN? <button onClick={() => setIsLogin(false)} className="text-black font-bold hover:underline ml-1">Cadastrar</button></>
                    ) : (
                        <>Tem uma conta? <button onClick={() => setIsLogin(true)} className="text-black font-bold hover:underline ml-1">Entre</button></>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};