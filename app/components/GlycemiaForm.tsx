'use client';

import { useState } from 'react';
import { GlycemiaFormData, GlycemiaRegister } from '../interfaces/glycemia-register';
import { getGlycemicResult, generateId } from '../utils/glycemia-utils';

interface GlycemiaFormProps {
  onSubmit: (register: GlycemiaRegister) => void;
}

export default function GlycemiaForm({ onSubmit }: GlycemiaFormProps) {
  const [form, setForm] = useState<GlycemiaFormData>({
    glycemia: '',
    date: '',
    hour: '',
    observations: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: keyof GlycemiaFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.glycemia && form.date && form.hour) {
      const glycemiaValue = parseInt(form.glycemia);
      const result = getGlycemicResult(glycemiaValue);
      
      const newRegister: GlycemiaRegister = {
        id: generateId(),
        glycemia: form.glycemia,
        date: form.date,
        hour: form.hour,
        observations: form.observations,
        result,
        timestamp: Date.now()
      };
      
      onSubmit(newRegister);
      
      setForm({
        glycemia: '',
        date: '',
        hour: '',
        observations: ''
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-6">Register New Glycemia</h2>
      
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md" role="alert">
          Glycemia registered successfully!
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="glycemia" className="block text-sm font-medium mb-2">
          Glycemia (mg/dL)
        </label>
        <input
          type="number"
          id="glycemia"
          value={form.glycemia}
          onChange={(e) => handleInputChange('glycemia', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          placeholder="e.g., 120"
          min="20"
          max="800"
          aria-label="Glycemia level in milligrams per deciliter"
          title="Enter your glycemia level"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={form.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          aria-label="Date of glycemia measurement"
          title="Enter the date of glycemia measurement"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="hour" className="block text-sm font-medium mb-2">
          Hour
        </label>
        <input
          type="time"
          id="hour"
          value={form.hour}
          onChange={(e) => handleInputChange('hour', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          aria-label="Time of glycemia measurement"
          title="Enter the hour of glycemia measurement"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="observations" className="block text-sm font-medium mb-2">
          Observations
        </label>
        <textarea
          id="observations"
          value={form.observations}
          onChange={(e) => handleInputChange('observations', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          placeholder="Optional notes about this measurement..."
          rows={3}
          aria-label="Additional observations about the glycemia measurement"
          title="Enter the observation glycemia measurement"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Submit glycemia registration"
      >
        Register Glycemia
      </button>
    </form>
  );
}