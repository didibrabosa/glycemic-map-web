'use client';

import { useState } from 'react';

type GlycemieResult = 'Hipoglicemia' | 'Normal' | 'Hiperglicemia';

interface GlycemieRegister {
  glycemie: string;
  date: string;
  hour: string;
  observations: string;
  result: GlycemieResult;
  id: string;
}

export default function Home() {
  const [glycemie, setGlycemie] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [observations, setObservations] = useState('');
  const [register, setRegisters] = useState<GlycemieRegister[]>([]);

  const getGlycemicResult = (value: number): GlycemieResult => {
    if (value < 70) return 'Hipoglicemia';
    if (value >= 70 && value <= 179) return 'Normal';
    return 'Hiperglicemia';
  };

  const getResultColor = (result: GlycemieResult): string => {
    switch (result) {
      case 'Hipoglicemia':
        return 'text-blue-600 dark:text-blue-400';
      case 'Normal':
        return 'text-green-600 dark:text-green-400';
      case 'Hiperglicemia':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (glycemie && date && hour) {
      const glycemicValue = parseFloat(glycemie);
      const result = getGlycemicResult(glycemicValue);

      const newRegister: GlycemieRegister = {
        glycemie,
        date,
        hour,
        observations,
        result,
        id: Date.now().toString(),
      };

      setRegisters([...register, newRegister]);

      setGlycemie('');
      setDate('');
      setHour('');
      setObservations('');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Glycemic Map
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
        >
          <div className="mb-4">
            <label
              htmlFor="glycemie"
              className="block text-sm font-medium mb-2"
            >
              Glycemie (mg/dL)
            </label>
            <input
              type="number"
              id="glycemie"
              value={glycemie}
              onChange={(e) => setGlycemie(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              placeholder="Ex: 120"
              min="1"
              max="999"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="hour"
              className="block text-sm font-medium mb-2"
            >
              Hour
            </label>
            <input
              type="time"
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="observations"
              className="block text-sm font-medium mb-2"
            >
              Observation
            </label>
            <textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 resize-none"
              placeholder="Ex: Fasting, Postprandial, Postexercise..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Register Glycemie
          </button>
        </form>

        {register.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Registers</h2>
            <div className="space-y-4">
              {register.map((record) => (
                <div
                  key={record.id}
                  className="border-b pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">
                        {record.glycemie} mg/dL
                      </span>
                      <span className={`text-sm font-medium ${getResultColor(record.result)}`}>
                        {record.result}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                      <br />
                      {record.hour}
                    </span>
                  </div>
                  {record.observations && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300 italic">
                        {record.observations}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}