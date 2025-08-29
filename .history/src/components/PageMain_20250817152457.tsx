import { AuthForm } from "@/modal/AuthForm/AuthForm";
import { ProductsList } from "../components/ProductsList/ProductsList";

export const PageMain = () => {

  return (
    <>
      <ProductsList />
      <AuthForm />
    </>
  );
};