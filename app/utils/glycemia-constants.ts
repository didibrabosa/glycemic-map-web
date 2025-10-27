export const HYPOGLYCEMIA_THRESHOLD = 70;
export const HYPERGLYCEMIA_THRESHOLD = 180;

export const GLYCEMIA_RANGES = {
  HYPOGLYCEMIA: { min: 0, max: HYPOGLYCEMIA_THRESHOLD - 1 },
  NORMAL: { min: HYPOGLYCEMIA_THRESHOLD, max: HYPERGLYCEMIA_THRESHOLD - 1 },
  HYPERGLYCEMIA: { min: HYPERGLYCEMIA_THRESHOLD, max: Infinity }
} as const;

export const RESULT_COLORS = {
  Hypoglycemia: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  Normal: 'text-green-600 bg-green-50 dark:bg-green-900/20',
  Hyperglycemia: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
} as const;