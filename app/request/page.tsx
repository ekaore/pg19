'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

function RequestForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const address = searchParams.get('address') || ''
  const isAvailable = searchParams.get('available') === 'true'

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    address: address,
    tariff: 'Гигабитный интернет - 699 ₽/мес',
    connectionDate: '',
    comments: ''
  })

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь можно добавить логику отправки формы
    console.log('Отправка заявки:', formData)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    router.push('/')
  }

  const formatPhone = (value: string): string => {
    // Удаляем все символы, кроме цифр
    const numbers = value.replace(/\D/g, '')
    
    // Если номер начинается с 8, заменяем на 7
    let phoneNumbers = numbers
    if (phoneNumbers.startsWith('8')) {
      phoneNumbers = '7' + phoneNumbers.slice(1)
    }
    
    // Если номер не начинается с 7, добавляем 7
    if (phoneNumbers.length > 0 && !phoneNumbers.startsWith('7')) {
      phoneNumbers = '7' + phoneNumbers
    }
    
    // Ограничиваем до 11 цифр (7 + 10 цифр)
    phoneNumbers = phoneNumbers.slice(0, 11)
    
    // Форматируем: +7 (XXX) XXX-XX-XX
    if (phoneNumbers.length === 0) {
      return ''
    }
    
    if (phoneNumbers.length <= 1) {
      return '+7'
    }
    
    if (phoneNumbers.length <= 4) {
      return `+7 (${phoneNumbers.slice(1)}`
    }
    
    if (phoneNumbers.length <= 7) {
      return `+7 (${phoneNumbers.slice(1, 4)}) ${phoneNumbers.slice(4)}`
    }
    
    if (phoneNumbers.length <= 9) {
      return `+7 (${phoneNumbers.slice(1, 4)}) ${phoneNumbers.slice(4, 7)}-${phoneNumbers.slice(7)}`
    }
    
    return `+7 (${phoneNumbers.slice(1, 4)}) ${phoneNumbers.slice(4, 7)}-${phoneNumbers.slice(7, 9)}-${phoneNumbers.slice(9, 11)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const formatted = formatPhone(value)
      setFormData({
        ...formData,
        phone: formatted
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем удаление при нажатии Backspace или Delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return
    }
    // Разрешаем навигацию
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'].includes(e.key)) {
      return
    }
    // Разрешаем Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
      return
    }
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Ссылка "Вернуться на главную" */}
        <Link href="/" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Вернуться на главную</span>
        </Link>

        {/* Заголовок и подзаголовок */}
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>Оставить заявку на подключение</h1>
          <p className={styles.subtitle}>Заполните форму, и мы свяжемся с вами в ближайшее время для уточнения деталей подключения</p>
        </div>

        <div className={styles.contentCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Фамилия, Имя, Отчество */}
            <div className={styles.nameRow}>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Фамилия <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={styles.input}
                  placeholder="Введите фамилию"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  Имя <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={styles.input}
                  placeholder="Введите имя"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="middleName" className={styles.label}>
                  Отчество
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  className={styles.input}
                  placeholder="Введите отчество"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Номер телефона и Email */}
            <div className={styles.contactRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Номер телефона <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyDown={handlePhoneKeyDown}
                  maxLength={18}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="example@mail.ru"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Адрес подключения */}
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                Адрес подключения <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={styles.input}
                placeholder="Город, улица, дом"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Тариф и Желаемая дата подключения */}
            <div className={styles.dateRow}>
              <div className={styles.formGroup}>
                <label htmlFor="tariff" className={styles.label}>
                  Тариф
                </label>
                <input
                  type="text"
                  id="tariff"
                  name="tariff"
                  className={styles.input}
                  value={formData.tariff}
                  readOnly
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="connectionDate" className={styles.label}>
                  Желаемая дата подключения
                </label>
                <input
                  type="date"
                  id="connectionDate"
                  name="connectionDate"
                  className={styles.input}
                  value={formData.connectionDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Дополнительные комментарии */}
            <div className={styles.formGroup}>
              <label htmlFor="comments" className={styles.label}>
                Дополнительные комментарии
              </label>
              <textarea
                id="comments"
                name="comments"
                className={styles.textarea}
                placeholder="Оставьте комментарии, если они есть"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Кнопка отправки */}
            <button type="submit" className={styles.submitButton}>
              <span>Отправить заявку</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Модальное окно успешной отправки */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.modalIconContainer}>
              <div className={styles.modalIconSuccess}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <h3 className={styles.modalTitle}>Заявка успешно отправлена!</h3>
            
            <p className={styles.modalText}>
              Спасибо за вашу заявку! Мы получили ваши данные и свяжемся с вами в ближайшее время для уточнения деталей подключения.
            </p>
            
            <div className={styles.modalButtonContainer}>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                <span>Понятно</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div className={styles.page}><div className={styles.container}><div className={styles.contentCard}><p>Загрузка...</p></div></div></div>}>
      <RequestForm />
    </Suspense>
  )
}

