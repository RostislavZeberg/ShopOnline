'use client';

import { useState } from 'react';
import Image from 'next/image';

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
      }}>
        <Image
          src={images[activeIndex].file.url}
          alt={images[activeIndex].alt || 'Изображение товара'}
          fill
          style={{
            objectFit: 'contain'
          }}
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}>
          {images.map((img, index) => (
            <button
              key={index}
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: index === activeIndex ? '2px solid #007bff' : '1px solid #ddd',
                cursor: 'pointer',
                flexShrink: 0,
                backgroundColor: '#f5f5f5'
              }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Показать изображение ${index + 1}`}
            >
              <Image
                src={img.file.url}
                alt={img.alt || `Изображение товара ${index + 1}`}
                fill
                style={{
                  objectFit: 'contain'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};