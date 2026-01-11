import styles from './ServicesBlock.module.css'

export default function ServicesBlock() {
  const services = [
    {
      number: '1',
      title: 'Цифровое телевидение',
      features: ['До 285 каналов', 'От 0 ₽ в месяц'],
      color: '#e71461',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <polygon points="10,9 16,12 10,15" fill="currentColor"/>
        </svg>
      )
    },
    {
      number: '2',
      title: 'Видеонаблюдение',
      features: ['Хранение до 30 дней', 'Установка IP-видеокамер'],
      color: '#f4940a',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 4H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '3',
      title: 'Интернет в офис',
      features: ['Скорость до 1000 Мбит/с', 'Независимое оптоволокно', 'Приоритетная поддержка'],
      color: '#214c9a',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="13" width="20" height="7" rx="2.5" stroke="currentColor" strokeWidth="2.2"/>
          <path d="M6 9c3.5-3.5 8.5-3.5 12 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M8.5 11.5c2-2 5-2 7 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="12" cy="16.5" r="1.3" fill="currentColor"/>
        </svg>
      )
    },
    {
      number: '4',
      title: 'Мобильная связь',
      features: ['Безлимитный интернет на смартфоне', 'Звонки и SMS без ограничений', 'Роуминг по РФ включён'],
      color: '#08a146',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  return (
    <section id="services" className={styles.servicesBlock}>
      <div className={styles.container}>
        <h2 className={styles.title}>Добавьте к интернету больше возможностей</h2>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon} style={{ backgroundColor: `${service.color}15`, borderColor: service.color }}>
                  <div className={styles.serviceIconInner} style={{ color: service.color }}>
                    {service.icon}
                  </div>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
              </div>
              <ul className={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className={styles.serviceFeature}>
                    <svg className={styles.checkIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke={service.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={styles.detailsButton}>
                Подробнее
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

