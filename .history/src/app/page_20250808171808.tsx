import { fetchProductsWithCategories } from "@/services/api";
import styles from "./page.module.css";

export default function Home() {
  console.log("fetchProductsWithCategories:", fetchProductsWithCategories())
  return (
    <div className={styles.page}>
      MAIN - Shop Online
    </div>
  );
}
