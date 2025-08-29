"use client"
import { useCurrencySelect } from "@/hooks/useCurrencySelect ";

export const CurrencySelection = () => {
  const {
    selectedCurrency,
    isOpenCurrency,
    setIsOpenCurrency,
    handleSelect,
    currencies,
  } = useCurrencySelect('RUB');

  return (
    <div className="top__item country">
      <div
        className="country__show show"
        onMouseEnter={() => setIsOpenCurrency(true)}
      >
        <img className='show__icon' src={`/icon_country-${selectedCurrency.code}.svg`} alt="Флаг страны" />
        <span className="show__code">{selectedCurrency.code}</span>
      </div>

      {isOpenCurrency && (
        <div
          className="country__list list"
          onMouseEnter={() => setIsOpenCurrency(true)}
          onMouseLeave={() => setIsOpenCurrency(false)}
        >
          <h2 className='list__title'>Валюта</h2>
          {currencies.map((currency) => (
            <div
              onClick={() => handleSelect(currency)}
              className='list__item item'
              key={currency.code}
            >
              <div className="item__block">
                <img className='item__icon' src={`/images/icon_country-${currency.code}.svg`} alt="Флаг страны" />
                <span className="item__code">{currency.code}</span>
                <span className="item__name">{currency.name}</span>
              </div>
              <div className={selectedCurrency.code === currency.code ? "item__mark" : "item__mark-none"}>✓</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}