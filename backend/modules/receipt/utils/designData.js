export const MEASUREMENT_LABELS = {
  length: 'Lent (Length)',
  shoulder: 'Shoulder',
  sleeves: 'Sleeves',
  collar: 'Collar Size',
  chest: 'Chest',
  waist: 'Waist',
  hip: 'Hip',
  half_chest: 'Half Chest',
  losing_chest: 'Losing (Chest)',
  losing_waist: 'Losing (Waist)',
  losing_hip: 'Losing (Hip)',
  armhole: 'Armhole',
  bicap: 'Bicap (Bicep)',
  sleeve_open: 'Sleeve Open',
  cuff_length: 'Cuff Length',
  cuff_width: 'Cuff Width',
  patti_length: 'Patti Length',
  patti_width: 'Patti Width',
  sleeves_round: 'Sleeves Round',
  shalwar_length: 'Shalwar Length',
  shalwar_waist: 'Shalwar Waist',
  shalwar_width: 'Shalwar Width',
  leg_opening: 'Leg Opening',
  half_body_chest: 'Half Body Chest',
};

export const DESIGN_SECTIONS = {
  collar: { label: 'Collar', type: 'choice' },
  front_pocket: { label: 'Front Pocket', type: 'toggle' },
  side_pockets: { label: 'Side Pockets', type: 'choice' },
  shalwar_pocket: { label: 'Shalwar Pocket', type: 'toggle' },
  daman: { label: 'Daman', type: 'choice' },
  cuff: { label: 'Cuff', type: 'choice' },
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
  if (parts.length === 0) return null;
  return parts;
};