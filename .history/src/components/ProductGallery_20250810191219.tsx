'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: Array<{
    file: {
      url: string;
    };
    alt?: string;
  }>;
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.main_image}>
        <Image
          src={images[activeIndex].file.url}
          alt={images[activeIndex].alt || 'Изображение товара'}
          width={600}
          height={600}
          className={styles.image}
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === activeIndex ? styles.active : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Показать изображение ${index + 1}`}
            >
              <Image
                src={img.file.url}
                alt={img.alt || `Изображение товара ${index + 1}`}
                width={80}
                height={80}
                className={styles.thumbnail_img}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};