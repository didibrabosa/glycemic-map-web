import { GlycemiaResult } from '../interfaces/glycemia-register';
import { HYPOGLYCEMIA_THRESHOLD, HYPERGLYCEMIA_THRESHOLD, RESULT_COLORS } from './glycemia-constants';

export function getGlycemicResult(value: number): GlycemiaResult {
  
  if (value < HYPOGLYCEMIA_THRESHOLD) {
    return 'Hypoglycemia';
  } else if (value < HYPERGLYCEMIA_THRESHOLD) {
    return 'Normal';
  } else {
    return 'Hyperglycemia';}
}

export function getResultColor(result: GlycemiaResult): string {
  return RESULT_COLORS[result];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}