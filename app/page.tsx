'use client';

import { useEffect, useState } from "react";
import GlycemiaForm from "./components/GlycemiaForm";
import GlycemiaList from "./components/GlycemiaList";
import { GlycemiaRegister } from "./interfaces/glycemia-register";
import { deleteGlycemia, getAllGlycemias } from "../services/glycemia-api";

export default function Home() {
  const [registers, setRegisters] = useState<GlycemiaRegister[]>([]);


  useEffect(() => {
    async function loadData() {
      const data = await getAllGlycemias();
      setRegisters(data);
    }
    loadData();
  }, []);

  
  const handleAddRegister = (newRegister: GlycemiaRegister) => {
    setRegisters(prev => [...prev, newRegister]);
  };

  const handleDeleteRegister = async (glycemiaId: number) => {
    await deleteGlycemia(glycemiaId);
    setRegisters(prev => prev.filter(register => register.glycemiaId !== glycemiaId));
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