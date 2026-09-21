export interface MeasurementFieldConfig {
  key: string;
  label: string;
  type: 'text';
  category: 'top' | 'shalwar' | 'allowance';
}

export const MEASUREMENT_FIELDS: MeasurementFieldConfig[] = [
  { key: 'length', label: 'Length', type: 'text', category: 'top' },
  { key: 'shoulder', label: 'Shoulder', type: 'text', category: 'top' },
  { key: 'sleeves', label: 'Sleeves', type: 'text', category: 'top' },
  { key: 'collar', label: 'Collar', type: 'text', category: 'top' },
  { key: 'chest', label: 'Chest', type: 'text', category: 'top' },
  { key: 'waist', label: 'Waist (Kamar)', type: 'text', category: 'top' },
  { key: 'hip', label: 'Hip', type: 'text', category: 'top' },
  { key: 'takti', label: 'Takti', type: 'text', category: 'top' },
  { key: 'armhole', label: 'Arm Hole', type: 'text', category: 'top' },
  { key: 'bicep', label: 'Bicep', type: 'text', category: 'top' },
  { key: 'kalai', label: 'Kalai (Sleeve Open)', type: 'text', category: 'top' },
  { key: 'cuff', label: 'Cuff', type: 'text', category: 'top' },
  { key: 'patti', label: 'Patti', type: 'text', category: 'top' },
  { key: 'patti_width', label: 'Patti Width', type: 'text', category: 'top' },
  { key: 'losing_chest', label: 'Losing Chest', type: 'text', category: 'allowance' },
  { key: 'losing_hip', label: 'Losing Hip', type: 'text', category: 'allowance' },
  { key: 'losing_waist', label: 'Losing Waist', type: 'text', category: 'allowance' },
  { key: 'shalwar_length', label: 'Shalwar Length', type: 'text', category: 'shalwar' },
  { key: 'shalwar_gair', label: 'Shalwar Gair', type: 'text', category: 'shalwar' },
  { key: 'shalwar_width', label: 'Shalwar Width', type: 'text', category: 'shalwar' },
  { key: 'paicha', label: 'Paicha', type: 'text', category: 'shalwar' },
];

export const MEASUREMENT_GROUPS: { key: 'top' | 'shalwar' | 'allowance'; title: string }[] = [
  { key: 'top', title: 'Upper Garment' },
  { key: 'allowance', title: 'Loose Allowance' },
  { key: 'shalwar', title: 'Shalwar / Lower' },
];

export const MEASUREMENT_KEYS: string[] = MEASUREMENT_FIELDS.map((f) => f.key);

export type MeasurementSnapshotValue = Record<string, string>;

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

  if (!/^\d+(\.\d+)?$/.test(cleaned)) return undefined;
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
    const raw = String(snapshot[key] ?? '').trim();
    if (raw === '') continue;
    result[key] = raw;
  }
  return result;
}