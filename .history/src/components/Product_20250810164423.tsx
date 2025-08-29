import { useProductData } from "@/hooks/useProductData";
import { IProductWithCategory } from "@/types/interface";
import Link from "next/link";
import { type FC } from "react";
import { BtnFavorite } from "./BtnFavorite";

interface ProductProps {
  product: IProductWithCategory;
}

export const Product: FC<ProductProps> = ({ product }) => {
  const { getCategoryName, checkIsFavorite } = useProductData();
  const isFavorite = checkIsFavorite(product.id);

  return (
    <li className='products-list__item item'>
      <Link href={`/product/${product.id}`} className="item__link">
        <div className="item__img">
          <img
            src={product.image.file.url}
            alt={product.title}
            className='img'
            loading="lazy"
            width={300}
            height={300}
          />
        </div>
        <div className="item__block">
          <div className='item__descr'>
            <h2 className="item__title">{product.title}</h2>
            <p className="item__price">Цена: {product.price} ₽</p>
            <p className="item__category">
              Категория: {getCategoryName(product.categoryId)}
            </p>
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
          <button className="btn-order btn btn-reset" aria-label="Заказать">
            <span className="btn-order__icon" />
            <span>Заказать</span>
          </button>
        </div>
      </Link>
      <BtnFavorite isFavorite={isFavorite} id={product.id} />
    </li>
  )
}