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

export const DESIGN_SECTIONS: DesignSection[] = [
  {
    type: 'choice',
    key: 'collar',
    label: 'Collar',
    options: [
      { value: 'Ben', image: '/designs/ben.svg' },
      { value: 'Half Ben', image: '/designs/half-ben.svg' },
      { value: 'Collar', image: '/designs/collar.svg' },
      { value: 'French Collar', image: '/designs/french-collar.svg' },
    ],
  },
  {
    type: 'toggle',
    key: 'front_pocket',
    label: 'Front Pocket',
    image: '/designs/front-pocket.svg',
  },
  {
    type: 'choice',
    key: 'side_pockets',
    label: 'Side Pockets',
    options: [
      { value: 'Single Side Pocket', image: '/designs/single-side-pocket.svg' },
      { value: 'Double Side Pocket', image: '/designs/double-side-pocket.svg' },
    ],
  },
  {
    type: 'toggle',
    key: 'shalwar_pocket',
    label: 'Shalwar Pocket',
    image: '/designs/shalwar-pocket.svg',
  },
  {
    type: 'choice',
    key: 'daman',
    label: 'Daman',
    options: [
      { value: 'Round Daman', image: '/designs/round-daman.svg' },
      { value: 'Square Daman', image: '/designs/square-daman.svg' },
    ],
  },
  {
    type: 'choice',
    key: 'cuff',
    label: 'Cuff',
    options: [
      { value: 'Simple Cuff', image: '/designs/simple-cuff.svg' },
      { value: 'Simple Round Cuff', image: '/designs/simple-round-cuff.svg' },
      { value: 'Simple Sleeve', image: '/designs/simple-sleeve.svg' },
    ],
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
      { value: 'Single Stitching', image: '/designs/single-stitching.svg' },
      { value: 'Double Stitching', image: '/designs/double-stitching.svg' },
      { value: 'Triple Stitching', image: '/designs/triple-stitching.svg' },
    ],
  },
  {
    type: 'choice',
    key: 'buttons',
    label: 'Buttons',
    options: [
      { value: 'Normal Button', image: '/designs/normal-button.svg' },
      { value: 'Fancy Button', image: '/designs/fancy-button.svg' },
      { value: 'Tich Button', image: '/designs/tich-button.svg' },
    ],
  },
  {
    type: 'choice',
    key: 'buttonhole',
    label: 'Buttonhole',
    options: [
      { value: 'Normal Buttonhole', image: '/designs/normal-buttonhole.svg' },
      { value: 'Threaded Buttonhole', image: '/designs/threaded-buttonhole.svg' },
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
    options: [
      { value: 'Sleeve Pleat', image: '/designs/sleeve-pleat.svg' },
      { value: 'No Pleat', image: '/designs/no-pleat.svg' },
    ],
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
      { value: 'Normal Shalwar', image: '/designs/normal-shalwar.svg' },
      { value: 'Trouser Shalwar', image: '/designs/trouser-shalwar.svg' },
      { value: 'Balochi Shalwar', image: '/designs/balochi-shalwar.svg' },
    ],
  },
  {
    type: 'toggle',
    key: 'netted_leg_opening',
    label: 'Netted Leg Opening',
    image: '/designs/netted-leg-opening.svg',
  },
];