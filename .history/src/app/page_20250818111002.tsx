import { ProductsList } from "@/components/ProductsList/ProductsList";
import { AuthForm } from "@/modal/AuthForm/AuthForm";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthForm = useSelector((state: RootState) => state.authFormSlice.isAuthForm);

  return (
    <main className="container">
      <ProductsList />

      <AuthForm />
    </main>
  );
}
