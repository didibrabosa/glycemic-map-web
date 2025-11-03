export type GlycemiaResult = 'Hypoglycemia' | 'Normal' | 'Hyperglycemia';

export interface GlycemiaRegister {
  id: string;
  glycemia: string;
  date: string;
  hour: string;
  observations?: string;
  result: GlycemiaResult;
  timestamp: number;
}

export interface GlycemiaFormData {
  glycemia: string;
  date: string;
  hour: string;
  observations: string;
}