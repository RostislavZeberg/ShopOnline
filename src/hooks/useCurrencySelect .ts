import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrency } from "@/store/slices/currencySlice";
import { currencies } from "@/constants/currencies";
import { useState } from 'react';

export const useCurrencySelect = () => {
  const dispatch = useAppDispatch();
  const currentCurrency = useAppSelector((state) => state.currencySlice.currentCurrency);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  const handleSelect = (currency: typeof currencies[0]) => {
    dispatch(setCurrency(currency));
    setIsOpenCurrency(false);
  };

  return {
    selectedCurrency: currentCurrency,
    isOpenCurrency,
    setIsOpenCurrency,
    handleSelect,
    currencies,
  };
};