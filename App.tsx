import React, { useState } from 'react';
import { generateStrategy } from './services/geminiService';
import StrategyForm from './components/StrategyForm';
import StrategyDisplay from './components/StrategyDisplay';
import PricingWall from './components/PricingWall';
import { UserInputs, StrategyResponse } from './types';
import { Rocket, Unlock } from 'lucide-react';

const App: React.FC = () => {
  const [strategyData, setStrategyData] = useState<StrategyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Payment State - Set to false to enable paywall by default
  const [isPremium, setIsPremium] = useState(false);

  const handleFormSubmit = async (inputs: UserInputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateStrategy(inputs);
      setStrategyData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStrategyData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* 3D Moving Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0 transform perspective-1000 rotate-x-12 scale-150 origin-top"></div>

      {/* Ambient Lighting Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 px-4 py-8 md:py-12">
        
        {/* Navbar / Brand */}
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transform rotate-3">
                <Rocket className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
                Leverage<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Builder</span>
            </h1>
          </div>
          
          {isPremium && (
             <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400">
                <Unlock className="w-3 h-3" /> PRO UNLOCKED
             </div>
          )}
        </div>

        <main className="container mx-auto max-w-6xl">
          {error && (
            <div className="max-w-2xl mx-auto mb-8 bg-red-900/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3 animate-bounce">
              <span className="text-xl">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Conditional Rendering based on Payment Status */}
          {!isPremium ? (
             <PricingWall onUnlock={() => setIsPremium(true)} />
          ) : (
             // App Logic when Unlocked
             !strategyData ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
                <div className="text-center mb-10 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
                    Build Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 filter drop-shadow-lg">
                        High-Leverage Asset
                    </span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed font-light">
                    Generate a brutal, data-backed execution plan to reach $5k/mo with <strong className="text-white">zero investment</strong>. 
                    Leverage AI to find the perfect strategy for your skills.
                    </p>
                </div>
                <StrategyForm onSubmit={handleFormSubmit} isLoading={loading} />
                </div>
            ) : (
                <StrategyDisplay data={strategyData} onReset={handleReset} />
            )
          )}
        </main>

        <footer className="mt-20 text-center text-slate-600 text-sm pb-8 relative z-10">
          <p>&copy; {new Date().getFullYear()} LeverageBuilder. Generated strategies are for informational purposes.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;