import { useLoadShopData } from '../../hooks/useLoadShopData';
import { useAppSelector } from '../../store/hooks';
import { Product } from '../Product';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

export const ProductsList = () => {
  useLoadShopData();
  
  const { 
    items: products, 
    loading: productsLoading, 
    error: productsError 
  } = useAppSelector((state) => state.products);
  
  const { 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useAppSelector((state) => state.categories);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul className='main__products products-list list-reset'>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};