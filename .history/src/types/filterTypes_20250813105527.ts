export interface FilterState {
  title: string;
  price: {
    min: number;
    max: number;
  };
  colors: string[];
  categories: string[];
}

export type PriceRange = {
  min: number;
  max: number;
};

export type FilterAction =
  | { type: 'filter/setTitle'; payload: string }
  | { type: 'filter/setPrice'; payload: PriceRange }
  | { type: 'filter/setMinPrice'; payload: number }
  | { type: 'filter/setMaxPrice'; payload: number }
  | { type: 'filter/toggleColor'; payload: string }
  | { type: 'filter/toggleCategory'; payload: string }
  | { type: 'filter/reset' };