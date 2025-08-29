import { FilterState } from "@/types/filterTypes";

export const initialFilterState: FilterState = {
  title: '',
  price: {
    min: 0,
    max: 10000,
  },
  colors: [],
  categories: [],
};