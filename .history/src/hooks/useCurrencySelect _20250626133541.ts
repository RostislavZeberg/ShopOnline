import { useState } from 'react';

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

const currencies: Currency[] = [
  { code: 'RUB', name: 'Российский рубль', symbol: '₽' },
  { code: 'BYN', name: 'Белорусский рубль', symbol: 'Br' },
  { code: 'KZT', name: 'Казахстанский тенге', symbol: '₸' },
  { code: 'AMD', name: 'Армянский драм', symbol: '֏' },
  { code: 'KGS', name: 'Кыргызский сом', symbol: 'с' },
  { code: 'UZS', name: 'Узбекский сум', symbol: 'soʻm' },
  { code: 'TJS', name: 'Таджикский сомони', symbol: 'SM' },
];

export const useCurrencySelect = (defaultCurrency: string = 'RUB') => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    () => currencies.find(c => c.code === defaultCurrency) || currencies[0]
  );
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  const handleSelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsOpenCurrency(false);
  };

  return {
    selectedCurrency,
    isOpenCurrency,
    setIsOpenCurrency,
    handleSelect,
    currencies,
  };
};