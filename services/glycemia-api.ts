import { GlycemiaFormData, GlycemiaRegister } from "../app/interfaces/glycemia-register";

const API_URL = process.env.NEXT_PUBLIC_GLYCEMIC_MAP_API_URL;

export async function createGlycemia(form: GlycemiaFormData): Promise<GlycemiaRegister> {
  const mesureAt = new Date(`${form.date}T${form.hour}:00`);

  const payload = {
    glycemia: Number(form.glycemia),
    meal: form.meal,
    observation: form.observation || null,
    mesureAt: mesureAt.toISOString()
  };

  const response = await fetch(`${API_URL}/glycemia`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create glycemia record");
  }

  return response.json();
}

export async function getAllGlycemias(): Promise<GlycemiaRegister[]> {
  const response = await fetch(`${API_URL}/glycemia`, { method: "GET"});

  if (!response.ok) {
    throw new Error("Failed to get all glycemias records");
  }

  return response.json()
}

export async function deleteGlycemia(glycemiaId: number): Promise<void> {
  const response = await fetch(`${API_URL}/glycemia/${glycemiaId}`, { method: "DELETE" });

  if (!response.ok) throw new Error("Failed to delete glycemia");
}
