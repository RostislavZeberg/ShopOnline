'use client';
import Link from "next/link";
import { useCallback, useEffect, type FC } from "react";

import { useProductData } from "@/hooks/useProductData";
import { BtnFavorite } from "@/components/BtnFavorite";
import { IProductTotal } from "@/types/productsTypes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import styles from "./product.module.scss";
import { useCurrencySelect } from "@/hooks/useCurrencySelect ";


interface ProductProps {
  product: IProductTotal;
}

export const Product: FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { checkIsFavorite } = useProductData();
  const currentCurrency = useAppSelector((state) => state.currencySlice.currentCurrency);
  
  const nf = new Intl.NumberFormat();

  const convertPrice = (price: number) => {
    return nf.format(Number((price * currentCurrency.rate).toFixed(0)));
  };


  const { selectedCurrency } = useCurrencySelect()

  console.log("currency:", selectedCurrency.code)

  let isFavorite = checkIsFavorite(product.id);

  const handleToggleCart = useCallback(() => {
    dispatch(addToCart(product.id))
  }, [dispatch]);

  return (
    <li className={styles.item}>
      <div className={styles.item__link}>
        <Link href={`/product/${product.id}`} className={styles.item__link}>
          <div className={styles.item__img}>
            <img
              src={product.image.file.url}
              alt={product.title}
              className={styles.img}
              loading="lazy"
              width={300}
              height={300}
            />
          </div>
          <div className={styles.item__block}>
            <div className={styles.item__descr}>
              <p className={styles['item__price']}>{convertPrice(product.price)} {currentCurrency.symbol}</p>
              <p className={styles['item__category']}>
                Категория: {product.category.title}
              </p>
              <h2 className={styles.item__title}>{product.title}</h2>
              <div className='item__color color'>
                <p className="color__title">Цвет:</p>
                {product.colors.map((color) => (
                  <span
                    key={color.id}
                    className={`color__mark ${color.title === "Белый" ? "color__mark--white" : ""}`}
                    style={{ backgroundColor: color.code }}
                    title={color.title}
                    aria-label={`Цвет: ${color.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>

        <button onClick={handleToggleCart} className="btn-order btn btn-reset" aria-label="Заказать">
          <span className="btn-order__icon" />
          <span>Заказать</span>
        </button>
      </div>
      <BtnFavorite isFavorite={isFavorite} id={product.id} />
    </li>
  )
}