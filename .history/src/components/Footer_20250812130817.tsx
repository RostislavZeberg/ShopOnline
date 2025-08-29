import styles from '@/styles/footer.module.scss'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles['footer__bottom']}>
          <p className={styles['footer__bottom-span']}>
            <span>© ShopOnline 2004–2025.</span>
            <span> Все права защищены.</span>
          </p>
          <div className={styles.footer__social}>
            <div className={styles['footer__social-icon']}>
              <Link
                href={'https://github.com/RostislavZeberg?tab=repositories'}
                target="_blank" rel="noopener noreferrer"
                className={styles['footer__social-icon--vk']}>
              </Link>
            </div>
            <div className={styles['footer__social-icon']}>
              <Link
                href={'https://github.com/RostislavZeberg?tab=repositories'}
                target="_blank" rel="noopener noreferrer"
                className={styles['footer__social-icon--ok']}>
              </Link>
            </div>
            <div className={styles['footer__social-icon']}>
              <Link
                href={'https://github.com/RostislavZeberg?tab=repositories'}
                target="_blank" rel="noopener noreferrer"
                className={styles['footer__social-icon--tg']}>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}