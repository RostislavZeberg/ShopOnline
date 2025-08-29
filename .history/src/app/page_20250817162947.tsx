import { ProductsList } from "@/components/ProductsList/ProductsList";
import { AuthForm } from "@/modal/AuthForm/AuthForm";

export default function Home() {

  return (
    <main className="container">
      <ProductsList />
      <AuthForm />
    </main>
  );
}
