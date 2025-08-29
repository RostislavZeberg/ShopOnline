import styles from '@/styles/footer.module.scss'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span>© ShopOnline 2004–2025.</span>
        <span> Все права защищены.</span>
      </p>
      <div className={styles.footer__social}>
        <div className={styles['footer__social-icon']}>
          <Link href={''}>
          
          </Link>
        </div>
        <div className={styles['footer__social-icon']}>
          <Link href={''}>
          </Link>
        </div>
        <div className={styles['footer__social-icon']}>
          <Link href={''}>
          </Link>
        </div>
      </div>
    </footer>
  )
}