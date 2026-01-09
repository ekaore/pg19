import styles from './TariffBlock.module.css'

export default function TariffBlock() {
  return (
    <section id="tariff" className={styles.tariffBlock}>
      <div className={styles.container}>
        <div className={styles.tariffCard}>
          {/* Левая часть с ценой и основными характеристиками */}
          <div className={styles.leftSection}>
            <div className={styles.priceSection}>
              <div className={styles.priceLabel}>ЕЖЕМЕСЯЧНАЯ ПЛАТА</div>
              <div className={styles.price}>
                <span className={styles.priceValue}>699</span>
                <span className={styles.priceCurrency}>₽/мес</span>
              </div>
            </div>
            
            {/* Основные характеристики */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <div className={styles.featureValue}>До 1000 Мбит/с</div>
                  <div className={styles.featureLabel}>Гигабитная скорость</div>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 2L12 7L7 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <div className={styles.featureValue}>191 ТВ канал</div>
                  <div className={styles.featureLabel}>Включено бесплатно</div>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <div className={styles.featureValue}>Подключение бесплатно</div>
                </div>
              </div>
            </div>
            
            {/* Кнопка подключения */}
            <button className={styles.connectButton}>
              <span>Подключить</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Разделитель */}
          <div className={styles.divider}></div>

          {/* Правая часть с детальной информацией */}
          <div className={styles.rightSection}>
            <div className={styles.detailsSection}>
              <h3 className={styles.detailsTitle}>Что входит в тариф</h3>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Скорость до 1 Гбит/с
                </li>
                <li className={styles.detailItem}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Цифровое ТВ 191 канал
                </li>
                <li className={styles.detailItem}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  До 10 устройств одновременно
                </li>
                <li className={styles.detailItem}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Скачивание 1 ГБ за 20 секунд
                </li>
                <li className={styles.detailItem}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Подключение бесплатно
                </li>
              </ul>
              
              <p className={styles.description}>
                Стабильное подключение для всей семьи: одновременно работают до 10 устройств — ПК, ноутбуки, смартфоны, планшеты и ТВ-приставки. Файл размером 1 ГБ скачивается примерно за 20 секунд*.
              </p>
              <p className={styles.footnote}>
                * Реальная скорость зависит от вашего оборудования и условий линии.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

