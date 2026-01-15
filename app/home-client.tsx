"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import GlycemiaForm from "./components/GlycemiaForm";
import GlycemiaList from "./components/GlycemiaList";

import {
  GlycemiaFormData,
  GlycemiaRegister,
} from "./interfaces/glycemia-register";
import {
  createGlycemiaAction,
  deleteGlycemiaAction,
  getAllGlycemiasAction,
} from "../services/glycemia-api";

export default function HomeClient() {
  const [registers, setRegisters] = useState<GlycemiaRegister[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllGlycemiasAction();

        setRegisters(data);
      } catch (error) {
        console.error(error);

        setError("Failed to load glycemia records");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAddRegister(formData: GlycemiaFormData): Promise<void> {
    try {
      const newRegister = await createGlycemiaAction(formData);

      setRegisters((prev) => [newRegister, ...prev]);
    } catch (error) {
      console.error(error);

      alert("Failed to create glycemia record");
    }
  }

  async function handleDeleteRegister(glycemiaId: number): Promise<void> {
    try {
      await deleteGlycemiaAction(glycemiaId);

      setRegisters((prev) => prev.filter((r) => r.glycemiaId !== glycemiaId));
    } catch (err) {
      console.error(err);

      alert("Failed to delete glycemia record");
    }
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <SignedIn>
        <div className="min-h-screen p-8 bg-background">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-center">
              Glycemic Map
            </h1>

            {error && (
              <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
            )}

            <GlycemiaForm onSubmit={handleAddRegister} />

            <GlycemiaList
              registers={registers}
              onDelete={handleDeleteRegister}
            />
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
