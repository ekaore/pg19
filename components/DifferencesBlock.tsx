import styles from './DifferencesBlock.module.css'

export default function DifferencesBlock() {
  const providerItems = [
    'Продаёт услуги за прибыль',
    'Ориентирован на инвесторов',
    'Навязывает дополнительные услуги',
    'Клиент не влияет на решения'
  ]

  const cooperativeItems = [
    'Распределяем расходы между участниками',
    'Ответственность перед пайщиками',
    'Не навязываем дополнительные услуги',
    'Один пайщик — один голос'
  ]

  return (
    <section className={styles.differencesBlock}>
      <div className={styles.container}>
        <h2 className={styles.title}>Чем мы отличаемся от обычного провайдера?</h2>
        <div className={styles.comparison}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Обычный провайдер</h3>
            <ul className={styles.list}>
              {providerItems.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <div className={styles.icon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Наш кооператив</h3>
            <ul className={styles.list}>
              {cooperativeItems.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <div className={styles.icon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

