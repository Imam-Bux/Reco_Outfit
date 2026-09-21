export const MEASUREMENT_KEYS = [
  'length', 'shoulder', 'sleeves', 'collar', 'chest', 'waist', 'hip',
  'takti', 'armhole', 'elbow', 'kalai', 'cuff', 'patti', 'patti_width',
  'losing_chest', 'losing_hip', 'losing_waist',
  'shalwar_length', 'shalwar_gair', 'asan', 'paicha',
];

export const DESIGN_CHOICE_OPTIONS = {
  collar: ['Sherwani Collar', 'Kammez Collar', 'Non-Collar', 'Custom'],
  pockets: [
    '1 Front', '2 Front', '1 Side', '2 Side', 'Shalwar Pockets', 'Kali Pocket', 'Custom',
  ],
  daman: ['Gol', 'Square', 'Custom'],
  cuff: ['Square', 'Round', 'Double', 'Custom'],
  paincha: ['Katti', 'Custom'],
  stitching: ['Single Stitching', 'Double Stitching', 'Triple Stitching', 'Custom'],
  buttons: ['Normal Button', 'Fancy Button', 'Tich Button', 'Custom'],
  buttonhole: ['Normal Buttonhole', 'Threaded Buttonhole', 'Custom'],
  sleeve_pleat: ['Sleeve Pleat', 'No Pleat', 'Custom'],
  shalwar_type: ['Normal Shalwar', 'Trouser Shalwar', 'Balochi Shalwar', 'Custom'],
};

export const DESIGN_TOGGLE_KEYS = [
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

  if (!/^\d+(\.\d+)?$/.test(cleaned)) return undefined;
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
      customText: String(section.customText ?? '').trim(),
    };
  }

  for (const key of DESIGN_TOGGLE_KEYS) {
    const section = designs[key] && typeof designs[key] === 'object' ? designs[key] : {};
    result[key] = {
      enabled: Boolean(section.enabled),
      referenceImage: sanitizeImageUrl(section.referenceImage),
      customText: String(section.customText ?? '').trim(),
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