export type GlycemiaResult = 'Hypoglycemia' | 'Normal' | 'Hyperglycemia';

export interface GlycemiaRegister {
  glycemiaId: number;
  glycemia: number;
  meal: string;
  observation?: string;
  result: GlycemiaResult;
  measuredAt: string;
}

export interface GlycemiaFormData {
  glycemia: string;
  date: string;
  hour: string;
  meal: string;
  observation?: string;
}