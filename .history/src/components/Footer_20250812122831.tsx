import styles from '@/styles/footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span>© ShopOnline 2004–2025.</span>
        <span> Все права защищены.</span>
      </p>
      <div className={styles.footer__social}>
        <div className={styles['footer__social-icon']}></div>
      </div>
    </footer>
  )
}