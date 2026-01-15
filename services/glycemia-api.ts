"use server";

import { auth } from "@clerk/nextjs/server";
import {
  GlycemiaFormData,
  GlycemiaRegister,
} from "../app/interfaces/glycemia-register";

const API_URL = process.env.NEXT_PUBLIC_GLYCEMIC_MAP_API_URL;

export async function getAllGlycemiasAction(): Promise<GlycemiaRegister[]> {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}/glycemia`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch glycemias");
  }

  return response.json();
}

export async function createGlycemiaAction(
  form: GlycemiaFormData,
): Promise<GlycemiaRegister> {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const measuredAt = new Date(`${form.date}T${form.hour}:00`);

  const response = await fetch(`${API_URL}/glycemia`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      glycemia: Number(form.glycemia),
      meal: form.meal,
      observation: form.observation ?? null,
      measuredAt: measuredAt.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create glycemia");
  }

  return response.json();
}

export async function deleteGlycemiaAction(id: number) {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}/glycemia/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete glycemia");
  }
}
