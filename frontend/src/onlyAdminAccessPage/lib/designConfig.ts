import { Designs } from './types';

export interface DesignChoiceOption {
  value: string;
  image: string;
}

export interface DesignChoiceSection {
  type: 'choice';
  key: keyof Designs;
  label: string;
  options: DesignChoiceOption[];
}

export interface DesignToggleSection {
  type: 'toggle';
  key: keyof Designs;
  label: string;
  image: string;
}

export type DesignSection = DesignChoiceSection | DesignToggleSection;

export const PLACEHOLDER_IMAGE = '/designs/placeholder.svg';

const option = (value: string): DesignChoiceOption => ({ value, image: PLACEHOLDER_IMAGE });

export const DESIGN_SECTIONS: DesignSection[] = [
  {
    type: 'choice',
    key: 'collar',
    label: 'Collar',
    options: [
      option('Sherwani Collar'),
      option('Kammez Collar'),
      option('Non-Collar'),
      option('Custom'),
    ],
  },
  {
    type: 'choice',
    key: 'pockets',
    label: 'Pockets',
    options: [
      option('1 Front'),
      option('2 Front'),
      option('1 Side'),
      option('2 Side'),
      option('Shalwar Pockets'),
      option('Kali Pocket'),
      option('Custom'),
    ],
  },
  {
    type: 'choice',
    key: 'daman',
    label: 'Daman',
    options: [option('Gol'), option('Square'), option('Custom')],
  },
  {
    type: 'choice',
    key: 'cuff',
    label: 'Cuff',
    options: [option('Square'), option('Round'), option('Double'), option('Custom')],
  },
  {
    type: 'choice',
    key: 'paincha',
    label: 'Paincha',
    options: [option('Katti'), option('Custom')],
  },
  {
    type: 'toggle',
    key: 'silk_thread',
    label: 'Silk Thread',
    image: '/designs/silk-thread.svg',
  },
  {
    type: 'choice',
    key: 'stitching',
    label: 'Stitching',
    options: [
      option('Single Stitching'),
      option('Double Stitching'),
      option('Triple Stitching'),
      option('Custom'),
    ],
  },
  {
    type: 'choice',
    key: 'buttons',
    label: 'Buttons',
    options: [
      option('Normal Button'),
      option('Fancy Button'),
      option('Tich Button'),
      option('Custom'),
    ],
  },
  {
    type: 'choice',
    key: 'buttonhole',
    label: 'Buttonhole',
    options: [
      option('Normal Buttonhole'),
      option('Threaded Buttonhole'),
      option('Custom'),
    ],
  },
  {
    type: 'toggle',
    key: 'designer_suit',
    label: 'Designer Suit',
    image: '/designs/designer-suit.svg',
  },
  {
    type: 'choice',
    key: 'sleeve_pleat',
    label: 'Sleeve Pleat',
    options: [option('Sleeve Pleat'), option('No Pleat'), option('Custom')],
  },
  {
    type: 'toggle',
    key: 'hidden_placket',
    label: 'Hidden Placket',
    image: '/designs/hidden-placket.svg',
  },
  {
    type: 'choice',
    key: 'shalwar_type',
    label: 'Shalwar Type',
    options: [
      option('Normal Shalwar'),
      option('Trouser Shalwar'),
      option('Balochi Shalwar'),
      option('Custom'),
    ],
  },
  {
    type: 'toggle',
    key: 'netted_leg_opening',
    label: 'Netted Leg Opening',
    image: '/designs/netted-leg-opening.svg',
  },
];

export const isCustomOption = (value: string) => value === 'Custom';