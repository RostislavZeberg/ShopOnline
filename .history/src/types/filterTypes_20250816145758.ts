export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  title?: string;
  price: PriceRange;
  colors: string[];
  categories: string[]; 
}
