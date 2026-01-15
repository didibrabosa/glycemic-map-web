"use client";

import { useState } from "react";
import { GlycemiaFormData } from "../interfaces/glycemia-register";

interface GlycemiaFormProps {
  onSubmit: (formData: GlycemiaFormData) => Promise<void>;
}

export default function GlycemiaForm({ onSubmit }: GlycemiaFormProps) {
  const [form, setForm] = useState<GlycemiaFormData>({
    glycemia: "",
    date: "",
    hour: "",
    meal: "",
    observation: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  function handleInputChange(field: keyof GlycemiaFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      await onSubmit(form);

      setForm({
        glycemia: "",
        date: "",
        hour: "",
        meal: "",
        observation: "",
      });

      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Failed to register glycemia");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-xl font-semibold mb-6">Register New Glycemia</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          Glycemia registered successfully!
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="glycemia" className="block text-sm font-medium mb-2">
          Glycemia (mg/dL)
        </label>
        <input
          id="glycemia"
          type="number"
          value={form.glycemia}
          onChange={(e) => handleInputChange("glycemia", e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-700"
          min="20"
          max="999"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium mb-2">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-700"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hour" className="block text-sm font-medium mb-2">
          Hour
        </label>
        <input
          id="hour"
          type="time"
          value={form.hour}
          onChange={(e) => handleInputChange("hour", e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-700"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="meal" className="block text-sm font-medium mb-2">
          Meal
        </label>
        <input
          id="meal"
          type="text"
          value={form.meal}
          onChange={(e) => handleInputChange("meal", e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-700"
          maxLength={50}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="observation" className="block text-sm font-medium mb-2">
          Observation
        </label>
        <textarea
          id="observation"
          value={form.observation}
          onChange={(e) => handleInputChange("observation", e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-700"
          rows={3}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Register Glycemia"}
      </button>
    </form>
  );
}
