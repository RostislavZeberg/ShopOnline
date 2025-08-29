import { ProductsList } from "@/components/ProductsList/ProductsList";
import { AuthForm } from "@/modal/AuthForm/AuthForm";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const isBackground = useSelector((state: RootState) => state.backgroundSlice.isBackground);
  return (
    <main className="container">
      <ProductsList />
      <AuthForm />
      {isBackground && <div className="background"></div>}
    </main>
  );
}
