import styles from './Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* О кооперативе */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>О кооперативе</h3>
            <p className={styles.footerText}>
              Потребительский интернет кооператив «ПЖ-19» — сообщество равных пайщиков, объединившихся для получения доступа к свободному и быстрому интернету.
            </p>
          </div>

          {/* Навигация */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Навигация</h3>
            <nav className={styles.nav}>
              <Link href="#tariff" className={styles.navLink}>Тариф</Link>
              <Link href="#services" className={styles.navLink}>Услуги</Link>
              <Link href="#address" className={styles.navLink}>Проверка адреса</Link>
              <Link href="#cooperative" className={styles.navLink}>Кооператив</Link>
              <Link href="#contacts" className={styles.navLink}>Контакты</Link>
            </nav>
          </div>

          {/* Контакты */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Контакты</h3>
            <div className={styles.contacts}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <a href="mailto:info@pj19.ru" className={styles.contactLink}>info@pj19.ru</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Телефон:</span>
                <a href="tel:+74951234567" className={styles.contactLink}>+7 (495) 123-45-67</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Telegram:</span>
                <a href="https://t.me/PG19CONNECTBOT" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>@PG19CONNECTBOT</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <a href="mailto:a@pg19.ru" className={styles.contactLink}>a@pg19.ru</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© 2026 Потребительский интернет кооператив «ПЖ-19». Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}