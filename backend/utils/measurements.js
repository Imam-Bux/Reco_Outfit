const DECIMAL_REGEX = /^\d+(\.\d+)?$/;

export const MEASUREMENT_KEYS = [
  'length', 'shoulder', 'sleeves', 'collar', 'chest', 'waist', 'hip',
  'half_chest', 'losing_chest', 'losing_waist', 'losing_hip', 'armhole',
  'bicap', 'sleeve_open', 'cuff_length', 'cuff_width', 'patti_length',
  'patti_width', 'sleeves_round', 'shalwar_length', 'shalwar_waist',
  'shalwar_width', 'leg_opening', 'half_body_chest',
];

export const DESIGN_CHOICE_OPTIONS = {
  collar: ['Ben', 'Half Ben', 'Collar', 'French Collar'],
  side_pockets: ['Single Side Pocket', 'Double Side Pocket'],
  daman: ['Round Daman', 'Square Daman'],
  cuff: ['Simple Cuff', 'Simple Round Cuff', 'Simple Sleeve'],
  stitching: ['Single Stitching', 'Double Stitching', 'Triple Stitching'],
  buttons: ['Normal Button', 'Fancy Button', 'Tich Button'],
  buttonhole: ['Normal Buttonhole', 'Threaded Buttonhole'],
  sleeve_pleat: ['Sleeve Pleat', 'No Pleat'],
  shalwar_type: ['Normal Shalwar', 'Trouser Shalwar', 'Balochi Shalwar'],
};

export const DESIGN_TOGGLE_KEYS = [
  'front_pocket',
  'shalwar_pocket',
  'silk_thread',
  'designer_suit',
  'hidden_placket',
  'netted_leg_opening',
];

export const parseDecimal = (input) => {
  if (input === null || input === undefined || input === '') return undefined;
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : undefined;
  }
  const raw = String(input).trim();
  const cleaned = raw.replace(/,/g, '.');

  const mixed = /^(\d+)\s+(\d+)\/(\d+)$/.exec(cleaned);
  if (mixed) {
    const denominator = Number(mixed[3]);
    return denominator
      ? Number(mixed[1]) + Number(mixed[2]) / denominator
      : undefined;
  }

  const fraction = /^(\d+)\/(\d+)$/.exec(cleaned);
  if (fraction) {
    const denominator = Number(fraction[2]);
    return denominator ? Number(fraction[1]) / denominator : undefined;
  }

  if (!DECIMAL_REGEX.test(cleaned)) return undefined;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : undefined;
};

// Only accept http(s) URLs for reference images.
const sanitizeImageUrl = (value) => {
  const url = String(value ?? '').trim();
  return /^https?:\/\//i.test(url) ? url : '';
};

export const sanitizeMeasurementSnapshot = (snapshot) => {
  const result = {};
  if (!snapshot || typeof snapshot !== 'object') return result;
  for (const key of MEASUREMENT_KEYS) {
    if (!(key in snapshot)) continue;
    const raw = String(snapshot[key] ?? '').trim();
    if (raw === '') continue;
    if (parseDecimal(raw) === undefined) continue;
    result[key] = raw;
  }
  return result;
};

export const sanitizeDesigns = (designs) => {
  if (!designs || typeof designs !== 'object') return {};
  const result = {};

  for (const key of Object.keys(DESIGN_CHOICE_OPTIONS)) {
    const section = designs[key] && typeof designs[key] === 'object' ? designs[key] : {};
    const selected = String(section.selected ?? '');
    result[key] = {
      selected: DESIGN_CHOICE_OPTIONS[key].includes(selected) ? selected : '',
      referenceImage: sanitizeImageUrl(section.referenceImage),
    };
  }

  for (const key of DESIGN_TOGGLE_KEYS) {
    const section = designs[key] && typeof designs[key] === 'object' ? designs[key] : {};
    result[key] = {
      enabled: Boolean(section.enabled),
      referenceImage: sanitizeImageUrl(section.referenceImage),
    };
  }

  return result;
};

export const sanitizeOrderItems = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    garment: String(item.garment ?? '').trim(),
    quantity: Math.max(1, Number(item.quantity) || 1),
    clothColour: String(item.clothColour ?? '').trim(),
    specialInstructions: String(item.specialInstructions ?? '').trim(),
    price: Math.max(0, Number(item.price) || 0),
    karigarRate: Math.max(0, Number(item.karigarRate) || 0),
    referenceImages: Array.isArray(item.referenceImages)
      ? item.referenceImages.map(sanitizeImageUrl).filter(Boolean)
      : [],
    measurementSnapshot: sanitizeMeasurementSnapshot(item.measurementSnapshot),
    designs: sanitizeDesigns(item.designs),
  }));
};