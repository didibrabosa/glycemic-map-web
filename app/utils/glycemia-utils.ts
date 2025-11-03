import { GlycemiaResult } from '../interfaces/glycemia-register';
import { RESULT_COLORS } from './glycemia-constants';

export function getResultColor(result: GlycemiaResult): string {
  return RESULT_COLORS[result];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
