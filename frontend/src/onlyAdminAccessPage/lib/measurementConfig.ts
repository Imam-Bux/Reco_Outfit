export interface MeasurementFieldConfig {
  key: string;
  label: string;
  type: 'number';
  inputType: 'decimal';
  step: 'any';
  category: 'top' | 'shalwar' | 'allowance';
}

export const MEASUREMENT_FIELDS: MeasurementFieldConfig[] = [
  { key: 'length', label: 'Lent (Length)', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'shoulder', label: 'Shoulder', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'sleeves', label: 'Sleeves', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'collar', label: 'Collar Size', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'chest', label: 'Chest', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'waist', label: 'Waist', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'hip', label: 'Hip', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'half_chest', label: 'Half Chest', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'losing_chest', label: 'Losing (Chest Loose Allowance)', type: 'number', inputType: 'decimal', step: 'any', category: 'allowance' },
  { key: 'losing_waist', label: 'Losing (Waist Loose Allowance)', type: 'number', inputType: 'decimal', step: 'any', category: 'allowance' },
  { key: 'losing_hip', label: 'Losing (Hip Loose Allowance)', type: 'number', inputType: 'decimal', step: 'any', category: 'allowance' },
  { key: 'armhole', label: 'Armhole', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'bicap', label: 'Bicap (Bicep)', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'sleeve_open', label: 'Sleeve Open', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'cuff_length', label: 'Cuff Length', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'cuff_width', label: 'Cuff Width', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'patti_length', label: 'Patti Length', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'patti_width', label: 'Patti Width', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'sleeves_round', label: 'Sleeves Round', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'half_body_chest', label: 'Half Body Chest', type: 'number', inputType: 'decimal', step: 'any', category: 'top' },
  { key: 'shalwar_length', label: 'Shalwar Length', type: 'number', inputType: 'decimal', step: 'any', category: 'shalwar' },
  { key: 'shalwar_waist', label: 'Shalwar Waist', type: 'number', inputType: 'decimal', step: 'any', category: 'shalwar' },
  { key: 'shalwar_width', label: 'Shalwar Width', type: 'number', inputType: 'decimal', step: 'any', category: 'shalwar' },
  { key: 'leg_opening', label: 'Leg Opening', type: 'number', inputType: 'decimal', step: 'any', category: 'shalwar' },
];

export const MEASUREMENT_GROUPS: { key: 'top' | 'shalwar' | 'allowance'; title: string }[] = [
  { key: 'top', title: 'Upper Garment' },
  { key: 'shalwar', title: 'Shalwar / Lower' },
  { key: 'allowance', title: 'Loose Allowance' },
];

export const MEASUREMENT_KEYS: string[] = MEASUREMENT_FIELDS.map((f) => f.key);

export const DECIMAL_REGEX = /^\d+(\.\d+)?$/;

export interface MeasurementSnapshotValue {
  [key: string]: number;
}

export function parseDecimalInput(input: unknown): number | undefined {
  if (input === null || input === undefined || input === '') return undefined;
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : undefined;
  }
  const raw = String(input).trim();
  const cleaned = raw.replace(/,/g, '.');

  const mixed = /^(\d+)\s+(\d+)\/(\d+)$/.exec(cleaned);
  if (mixed) {
    const whole = Number(mixed[1]);
    const numerator = Number(mixed[2]);
    const denominator = Number(mixed[3]);
    return denominator ? whole + numerator / denominator : undefined;
  }

  const fraction = /^(\d+)\/(\d+)$/.exec(cleaned);
  if (fraction) {
    const numerator = Number(fraction[1]);
    const denominator = Number(fraction[2]);
    return denominator ? numerator / denominator : undefined;
  }

  if (!DECIMAL_REGEX.test(cleaned)) return undefined;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : undefined;
}

export function sanitizeMeasurementSnapshot(
  snapshot?: Record<string, unknown> | null
): MeasurementSnapshotValue {
  const result: MeasurementSnapshotValue = {};
  if (!snapshot || typeof snapshot !== 'object') return result;
  for (const key of MEASUREMENT_KEYS) {
    if (!(key in snapshot)) continue;
    const parsed = parseDecimalInput(snapshot[key]);
    if (parsed !== undefined) result[key] = parsed;
  }
  return result;
}