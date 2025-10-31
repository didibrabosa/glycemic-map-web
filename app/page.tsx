'use client';

import GlycemiaForm from "./components/GlycemiaForm";
import GlycemiaList from "./components/GlycemiaList";
import { useLocalStorage } from "./hooks/use-local-storage";
import { GlycemiaRegister } from "./interfaces/glycemia-register";

export default function Home() {
  const [registers, setRegisters] = useLocalStorage<GlycemiaRegister[]>('glycemia-registers', []);

  const handleAddRegister = (newRegister: GlycemiaRegister) => {
    setRegisters(prev => [...prev, newRegister]);
  };

  const handleDeleteRegister = (id: string) => {
    setRegisters(prev => prev.filter(register => register.id !== id));
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Glycemic Map</h1>

        <GlycemiaForm onSubmit={handleAddRegister} />

        <GlycemiaList registers={registers} onDelete={handleDeleteRegister} />
      </div>
    </div>
  );
}