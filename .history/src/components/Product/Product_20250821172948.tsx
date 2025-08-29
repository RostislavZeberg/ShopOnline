'use client';
import Link from "next/link";
import { useCallback, type FC } from "react";

import { useProductData } from "@/hooks/useProductData";
import { BtnFavorite } from "@/components/BtnFavorite";
import { IProductTotal } from "@/types/productsTypes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./product.module.scss";
import { toggleCart } from "@/store/slices/cartSlice";

interface ProductProps {
  product: IProductTotal;
}

export const Product: FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { checkIsFavorite } = useProductData();
  let isFavorite = checkIsFavorite(product.id);

  const cartIds = useAppSelector((state) => state.cartSlice);

  console.log("cartIds:", cartIds)

  const handleToggleCart = useCallback(() => {
    dispatch(toggleCart(product.id));
  }, [dispatch]);

  return (
    <li className={styles.item}>
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
            <p className={styles['item__price']}>{product.price} ₽</p>
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
          <button onClick={handleToggleCart} className="btn-order btn btn-reset" aria-label="Заказать">
            <span className="btn-order__icon" />
            <span>Заказать</span>
          </button>
        </div>
      </Link>
      <BtnFavorite isFavorite={isFavorite} id={product.id} />
    </li>
  )
}