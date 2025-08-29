import { ProductsList } from "@/components/ProductsList";
import { fetchProductsWithCategories } from "@/services/api";
// import styles from "./page.module.css";

export default async function Home() {

  const productsList = await fetchProductsWithCategories();
  console.log("TEST:", productsList);

  return (
    // <div className={styles.page}>
    //   MAIN - Shop Online
    // </div>
    <ProductsList/>
  );
}
