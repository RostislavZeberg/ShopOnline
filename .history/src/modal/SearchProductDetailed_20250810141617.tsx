import styles from '@/styles/header.module.scss'

export const SearchProductDetailed = () => {
  return (
    <form className={styles['search-detailed']}>
      <label htmlFor="">
        <input type="text" />
      </label>
      <label htmlFor="">
        <input type="text" />
      </label>
      <label htmlFor="">
        <input type="text" />
      </label>
    </form>
  )
}