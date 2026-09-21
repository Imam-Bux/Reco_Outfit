export const MEASUREMENT_LABELS = {
  length: 'Length',
  shoulder: 'Shoulder',
  sleeves: 'Sleeves',
  collar: 'Collar',
  chest: 'Chest',
  waist: 'Waist (Kamar)',
  hip: 'Hip',
  takti: 'Takti',
  armhole: 'Arm Hole',
  bicep: 'Bicep',
  kalai: 'Kalai (Sleeve Open)',
  cuff: 'Cuff',
  patti: 'Patti',
  patti_width: 'Patti Width',
  losing_chest: 'Losing Chest',
  losing_hip: 'Losing Hip',
  losing_waist: 'Losing Waist',
  shalwar_length: 'Shalwar Length',
  shalwar_gair: 'Shalwar Gair',
  shalwar_width: 'Shalwar Width',
  leg_opening: 'Leg Opening',
};

export const DESIGN_SECTIONS = {
  collar: { label: 'Collar', type: 'choice' },
  pockets: { label: 'Pockets', type: 'choice' },
  daman: { label: 'Daman', type: 'choice' },
  cuff: { label: 'Cuff', type: 'choice' },
  paincha: { label: 'Paincha', type: 'choice' },
};

export const buildDesignText = (design, section) => {
  if (!design) return null;
  const parts = [];
  if (section.type === 'toggle') {
    if (design.enabled === true || design.enabled === 'true') parts.push('Yes');
  } else if (design.selected) {
    parts.push(design.selected);
  }
  if (design.customText && String(design.customText).trim()) {
    parts.push(String(design.customText).trim());
  }
  if (parts.length === 0) return null;
  return parts;
};