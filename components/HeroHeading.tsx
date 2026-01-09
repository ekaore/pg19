import styles from './HeroHeading.module.css'

export default function HeroHeading() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <span className={styles.line1}>
            <span className={styles.whiteText}>ИНТЕРНЕТ</span>{' '}
            <span className={styles.orangeText}>ПЖ19</span>{' '}
            <span className={styles.whiteText}>КОТОРЫЙ ЖДАЛИ ВСЕ</span>
          </span>
          <p className={styles.subtitle}>
            Быстрый и стабильный интернет для дома и бизнеса
          </p>
        </h1>
      </div>
      
      {/* Соединительная линия */}
      <div className={styles.connectionWrapper}>
        <div className={styles.connectionLine}></div>
      </div>
    </section>
  )
}

