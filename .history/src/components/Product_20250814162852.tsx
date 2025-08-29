'use client';
import Link from "next/link";
import { type FC } from "react";

import { useProductData } from "@/hooks/useProductData";
import { BtnFavorite } from "./BtnFavorite";
import { IProductTotal } from "@/types/productsTypes";
import styles from "@/styles/products-list.module.scss";

interface ProductProps {
  product: IProductTotal;
}

export const Product: FC<ProductProps> = ({ product }) => {
  const { getCategoryName, checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(product.id);

  return (
    <li className={styles.item}>
      <Link href={`/product/${product.id}`} className={styles.item__link}>
        <div className={styles.item__img}>
          {product.image?.file?.url && (
            <img
              src={product.image.file.url}
              alt={product.title}
              className={styles.img}
              loading="lazy"
              width={300}
              height={300}
            />
          )}
        </div>
        <div className={styles.item__block}>
          <div className={styles.item__descr}>
            <p className={styles.item__price}>{product.price} ₽</p>
            <p className={styles.item__category}>
              Категория: {getCategoryName(product.category.id)}
            </p>
            <h2 className={styles.item__title}>{product.title}</h2>
            <div className={styles.item__color}>
              <p className={styles.item__colorTitle}>Цвет:</p>
              {product.colors.map((color) => (
                <span
                  key={color.id}
                  className={`${styles.item__colorMark} ${
                    color.title === "Белый" ? styles.item__colorMarkWhite : ""
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.title}
                  aria-label={`Цвет: ${color.title}`}
                />
              ))}
            </div>
          </div>
          <button className={`${styles.item__btn} btn-reset`} aria-label="Заказать">
            <span className={styles.item__btnIcon} />
            <span>Заказать</span>
          </button>
        </div>
      </Link>
      <BtnFavorite isFavorite={isFavorite} id={product.id} />
    </li>
  );
};