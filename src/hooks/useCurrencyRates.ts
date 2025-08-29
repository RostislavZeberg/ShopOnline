import { useState, useEffect } from 'react';

type CurrencyRate = {
  code: string;
  value: number;
};

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const data = await response.json();
        
        const rubRates = [
          { code: 'RUB', value: 1 },
          { code: 'BYN', value: data.Valute.BYN?.Value / data.Valute.BYN?.Nominal || 0 },
          { code: 'KZT', value: data.Valute.KZT?.Value / data.Valute.KZT?.Nominal || 0 },
          { code: 'AMD', value: data.Valute.AMD?.Value / data.Valute.AMD?.Nominal || 0 },
          { code: 'KGS', value: data.Valute.KGS?.Value / data.Valute.KGS?.Nominal || 0 },
          { code: 'UZS', value: data.Valute.UZS?.Value / data.Valute.UZS?.Nominal || 0 },
          { code: 'TJS', value: data.Valute.TJS?.Value / data.Valute.TJS?.Nominal || 0 },
        ];

        setRates(rubRates);
      } catch (err) {
        setError('Не удалось загрузить курсы валют');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertPrice = (price: number, fromCurrency: string, toCurrency: string): number | undefined => {
    if (fromCurrency === toCurrency) return price;
    
    const fromRate = rates.find(rate => rate.code === fromCurrency)?.value;
    const toRate = rates.find(rate => rate.code === toCurrency)?.value;
    
    if (fromRate === undefined || toRate === undefined) return undefined;
    
    return (price * fromRate) / toRate;
  };

  return { rates, loading, error, convertPrice };
};