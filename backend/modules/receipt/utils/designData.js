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
  elbow: 'Elbow (Bicep)',
  kalai: 'Kalai (Sleeve Open)',
  cuff: 'Cuff',
  patti: 'Patti',
  patti_width: 'Patti Width',
  losing_chest: 'Losing Chest',
  losing_hip: 'Losing Hip',
  losing_waist: 'Losing Waist',
  shalwar_length: 'Shalwar Length',
  shalwar_gair: 'Shalwar Gair',
  asan: 'Asan (Shalwar Width)',
  paicha: 'Paicha (Leg Opening)',
};

export const DESIGN_SECTIONS = {
  collar: { label: 'Collar', type: 'choice' },
  pockets: { label: 'Pockets', type: 'choice' },
  daman: { label: 'Daman', type: 'choice' },
  cuff: { label: 'Cuff', type: 'choice' },
  paincha: { label: 'Paincha', type: 'choice' },
  silk_thread: { label: 'Silk Thread', type: 'toggle' },
  stitching: { label: 'Stitching', type: 'choice' },
  buttons: { label: 'Buttons', type: 'choice' },
  buttonhole: { label: 'Buttonhole', type: 'choice' },
  designer_suit: { label: 'Designer Suit', type: 'toggle' },
  sleeve_pleat: { label: 'Sleeve Pleat', type: 'choice' },
  hidden_placket: { label: 'Hidden Placket', type: 'toggle' },
  shalwar_type: { label: 'Shalwar Type', type: 'choice' },
  netted_leg_opening: { label: 'Netted Leg Opening', type: 'toggle' },
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