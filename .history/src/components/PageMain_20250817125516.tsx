import { AuthForm } from "@/modal/AuthForm";
import { ProductsList } from "../components/ProductsList/ProductsList";

export const PageMain = () => {

  return (
    <>
      <ProductsList />
      <AuthForm />
    </>
  );
};