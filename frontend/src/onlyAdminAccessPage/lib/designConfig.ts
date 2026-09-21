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

export type DesignSection = DesignChoiceSection;

export const PLACEHOLDER_IMAGE = '/designs/placeholder.svg';

const option = (value: string): DesignChoiceOption => ({ value, image: PLACEHOLDER_IMAGE });

export const DESIGN_SECTIONS: DesignSection[] = [
  {
    type: 'choice',
    key: 'collar',
    label: 'Collar',
    options: [option('Sherwani Collar'), option('Kammez Collar'), option('Non-Collar')],
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
    options: [option('Gol'), option('Square')],
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
];

export const isCustomOption = (value: string) => value === 'Custom';