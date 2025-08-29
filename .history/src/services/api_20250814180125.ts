import axios from 'axios'

import { IProductWithCategory, IProductBase, IProductTotal } from '@/types/productsTypes';

const API_URL = 'https://vue-study.skillbox.cc'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор для добавления accessKey к запросам
api.interceptors.request.use(config => {
  // Работаем только в браузере
  if (typeof window !== 'undefined') {
    const accessKey = localStorage.getItem('accessKey');
    if (accessKey) {
      config.headers.Authorization = `Bearer ${accessKey}`;
    }
  }
  return config;
})

export const getProducts = async (params = {}) => {
  const response = await api.get('/api/products', { params })
  return response.data.items
}

export const getProductById = async (id: number) => {
  const response = await api.get(`/api/products/${id}`)
  return response.data
}

export const getCategories = async () => {
  const response = await api.get('/api/productCategories')
  return response.data.items
}

export const getColors = async () => {
  const response = await api.get('/api/colors')
  return response.data.items
}

export const getCart = async () => {
  const response = await api.get('/api/baskets')
  return response.data
}

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post('/api/baskets/products', {
    productId,
    quantity,
  })
  return response.data
}

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.put('/api/baskets/products', {
    productId,
    quantity,
  })
  return response.data
}

export const removeFromCart = async (productId: string) => {
  const response = await api.delete('/api/baskets/products', {
    data: { productId },
  })
  return response.data
}

export const createOrder = async (orderData: {
  name: string
  address: string
  phone: string
  email: string
  comment?: string
}) => {
  const response = await api.post('/api/orders', orderData)
  return response.data
}

export const fetchProductsWithCategories = async (): Promise<IProductTotal[]> => {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories()
    ]);

    return products.map((product: { id: number; }) => {
      // Находим полную информацию о продукте, включая categoryId
      return getProductById(product.id).then(fullProduct => {
        const category = categories.find((cat: { id: number; }) => cat.id === fullProduct.category.id);
        
        if (!category) {
          console.warn(`Category not found for product ${product.id}`, {
            productCategoryId: fullProduct.category.id,
            availableCategories: categories.map(c => c.id)
          });
        }

        return {
          ...product,
          category: category || {
            id: fullProduct.category.id,
            title: 'Unknown category',
            slug: 'unknown'
          }
        };
      });
    });
  } catch (error) {
    console.error('Error fetching products with categories:', error);
    throw error;
  }
};

export const getAccessKey = async () => {
  const response = await api.get('/api/users/accessKey')
  return response.data.accessKey
}

export default api