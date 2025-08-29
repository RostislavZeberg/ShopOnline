import { ProductsList } from '../../components/ProductsList';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';


export const PageMain = () => {
  useDocumentTitle("Главная страница", "Описание главной страницы");

  return (
    <ProductsList />
  );
};