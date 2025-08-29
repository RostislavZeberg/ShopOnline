import styles from '@/styles/footer.module.scss'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <ul className={`${styles['footer__top']} list-reset`}>
          <li className={styles['footer__top-item']}>
            <ul className={`${styles['footer__top-item--info']} list-reset`}>
              <h2 className={styles['footer__top-item--title']}>
                Покупателям
              </h2>
              <li className={styles['footer__top-item--descr']}>
Частые вопросы
              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
            </ul>
          </li>
          <li className={styles['footer__top-item']}>
            <ul className={`${styles['footer__top-item--info']} list-reset`}>
              <h2 className={styles['footer__top-item--title']}>
                Продавцам и партнёрам
              </h2>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
            </ul>
          </li>
          <li className={styles['footer__top-item']}>
            <ul className={`${styles['footer__top-item--info']} list-reset`}>
              <h2 className={styles['footer__top-item--title']}>
                Наши проекты
              </h2>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
            </ul>
          </li>
          <li className={styles['footer__top-item']}>
            <ul className={`${styles['footer__top-item--info']} list-reset`}>
              <h2 className={styles['footer__top-item--title']}>
                Компания
              </h2>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
              <li className={styles['footer__top-item--descr']}>

              </li>
            </ul>
          </li>
        </ul>
        <div className={styles['footer__bottom']}>
          <p className={styles['footer__bottom-span']}>
            <span>© ShopOnline 2004–2025.&nbsp;</span>
            <span>Все права защищены.</span>
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