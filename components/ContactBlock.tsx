import styles from './ContactBlock.module.css'

export default function ContactBlock() {
  const contacts = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Бесплатный звонок',
      value: '8 800 222 55 19',
      link: 'tel:88002225519',
      color: '#1976D2'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5L2 12.5L9 13.5M21 5L15 21L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Telegram',
      value: '@PG19CONNECTBOT',
      link: 'https://t.me/PG19CONNECTBOT',
      color: '#0288D1'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Email',
      value: 'a@pg19.ru',
      link: 'mailto:a@pg19.ru',
      color: '#388E3C'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Офис продаж',
      value: 'г. Таганрог, ул. Большая Бульварная, 11',
      subValue: 'Пн-Пт 8:00 - 20:00',
      link: null,
      color: '#F57C00'
    }
  ]

  const locations = [
    'Таганрог',
    'Ростов-на-Дону',
    'Батайск',
    'Неклиновский район'
  ]

  return (
    <section id="contacts" className={styles.contactBlock}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Свяжитесь с нами</h2>
          <p className={styles.subtitle}>Ответим на любые вопросы о подключении</p>
        </div>
        <div className={styles.contactsGrid}>
          {contacts.map((contact, index) => {
            const content = (
              <div className={styles.contactCard}>
                <div className={styles.contactIcon} style={{ backgroundColor: `${contact.color}15`, borderColor: contact.color }}>
                  <div className={styles.contactIconInner} style={{ color: contact.color }}>
                    {contact.icon}
                  </div>
                </div>
                <div className={styles.contactContent}>
                  <h3 className={styles.contactTitle}>{contact.title}</h3>
                  {contact.link ? (
                    <a href={contact.link} className={styles.contactValue} style={{ color: contact.color }} target={contact.link.startsWith('http') ? '_blank' : undefined} rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      {contact.value}
                    </a>
                  ) : (
                    <>
                      <p className={styles.contactValue} style={{ color: contact.color }}>{contact.value}</p>
                      {contact.subValue && (
                        <p className={styles.contactSubValue}>{contact.subValue}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
            return <div key={index}>{content}</div>
          })}
        </div>
        <div className={styles.locationsSection}>
          <h3 className={styles.locationsTitle}>Работаем в:</h3>
          <div className={styles.locationsList}>
            {locations.map((location, index) => (
              <span key={index} className={styles.locationItem}>{location}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

