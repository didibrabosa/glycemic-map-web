'use client';

import { GlycemiaRegister } from '../interfaces/glycemia-register';
import { getResultColor, formatDate } from '../utils/glycemia-utils';

interface GlycemiaListProps {
  registers: GlycemiaRegister[];
  onDelete?: (id: string) => void;
}

export default function GlycemiaList({ registers, onDelete }: GlycemiaListProps) {
  if (registers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500 dark:text-gray-400">No glycemia records yet. Add your first measurement!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Glycemia Records ({registers.length})</h2>
      <div className="space-y-4">
        {registers.map((register) => (
          <div key={register.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-2xl">{register.glycemia}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">mg/dL</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getResultColor(register.result)}`}>
                  {register.result}
                </span>
              </div>
              {onDelete && (
                <button
                  onClick={() => onDelete(register.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  aria-label={`Delete glycemia record of ${register.glycemia} mg/dL`}
                >
                  Delete
                </button>
              )}
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{formatDate(register.date)} at {register.hour}</span>
            </div>
            
            {register.observations && (
              <div className="text-sm text-gray-700 dark:text-gray-300 italic">
                {register.observations}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}