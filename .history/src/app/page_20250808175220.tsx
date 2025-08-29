import { getProducts } from "@/services/api";
import styles from "./page.module.css";

export default function Home() {
  console.log("TEST:", getProducts);

  return (
    <div className={styles.page}>
      MAIN - Shop Online
    </div>
  );
}
