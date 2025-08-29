import { getProducts } from "@/services/api";
import styles from "./page.module.css";

export default async function Home() {

  const productsList = await getProducts();
  console.log("TEST:", productsList);

  return (
    <div className={styles.page}>
      MAIN - Shop Online
    </div>
  );
}
