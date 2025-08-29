export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  title: string;
  price: PriceRange;
  colors: string[];
  categories: string[];
}

export type FilterAction =
  | { type: 'filter/setTitle'; payload: string }
  | { type: 'filter/setPrice'; payload: PriceRange }
  | { type: 'filter/setMinPrice'; payload: number }
  | { type: 'filter/setMaxPrice'; payload: number }
  | { type: 'filter/toggleColor'; payload: string }
  | { type: 'filter/toggleCategory'; payload: string }
  | { type: 'filter/setFilters'; payload: Partial<FilterState> }
  | { type: 'filter/resetFilters' };