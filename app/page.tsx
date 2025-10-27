'use client';

import { GlycemiaRegister } from './interfaces/glycemia-register';
import GlycemiaForm from './components/GlycemiaForm';
import GlycemiaList from './components/GlycemiaList';
import { useLocalStorage } from './hooks/use-local-storage';

export default function Home() {
  const [registers, setRegisters] = useLocalStorage<GlycemiaRegister[]>('glycemia-registers', []);

  const handleAddRegister = (newRegister: GlycemiaRegister) => {
    setRegisters(prev =>
      [newRegister, ...prev].sort((a, b) =>
        b.timestamp - a.timestamp
      )
    );
  };

  const handleDeleteRegister = (id: string) => {
    setRegisters(prev =>
      prev.filter(register =>
        register.id !== id
      )
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Glycemia Control
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and monitor your blood glucose levels
          </p>
        </header>
        
        <GlycemiaForm 
          onSubmit={handleAddRegister}
        />
        <GlycemiaList 
          registers={registers}
          onDelete={handleDeleteRegister}
        />
      </div>
    </div>
  );
}