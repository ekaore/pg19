'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

type LoginMethod = 'phone' | 'contract' | 'telegram' | 'email'

const ALLOWED_PHONES = [
  '+79001111111',
  '+79002222222',
  '+79003333333'
]

export default function CabinetPage() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone')
  const [phone, setPhone] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    let phoneNumbers = numbers
    
    if (phoneNumbers.startsWith('8')) {
      phoneNumbers = '7' + phoneNumbers.slice(1)
    }
    
    if (phoneNumbers.length > 0 && !phoneNumbers.startsWith('7')) {
      phoneNumbers = '7' + phoneNumbers
    }
    
    phoneNumbers = phoneNumbers.slice(0, 11)
    
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return
    }
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'].includes(e.key)) {
      return
    }
    if (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
      return
    }
  }

  const normalizePhone = (phoneValue: string): string => {
    // Убираем все символы кроме цифр
    const numbers = phoneValue.replace(/\D/g, '')
    // Если начинается с 8, заменяем на 7
    let phoneNumbers = numbers
    if (phoneNumbers.startsWith('8')) {
      phoneNumbers = '7' + phoneNumbers.slice(1)
    }
    // Если не начинается с 7, добавляем 7
    if (phoneNumbers.length > 0 && !phoneNumbers.startsWith('7')) {
      phoneNumbers = '7' + phoneNumbers
    }
    // Форматируем в формат +7XXXXXXXXXX
    return phoneNumbers.length === 11 ? `+${phoneNumbers}` : phoneValue
  }

  const handleGetCode = () => {
    if (!phone.trim()) {
      setErrorMessage('Введите номер телефона')
      setModalType('error')
      setShowModal(true)
      return
    }

    const normalizedPhone = normalizePhone(phone)
    
    if (ALLOWED_PHONES.includes(normalizedPhone)) {
      // Успешный вход
      setModalType('success')
      setShowModal(true)
      // Здесь можно добавить логику перенаправления в личный кабинет
    } else {
      // Номер не разрешен
      setErrorMessage('Данный номер телефона не зарегистрирован в системе')
      setModalType('error')
      setShowModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType(null)
    setErrorMessage('')
    // Очищаем поля при закрытии модального окна после успешного входа
    if (modalType === 'success') {
      setPhone('')
      setContractNumber('')
      setPassword('')
      setEmail('')
      setShowPassword(false)
    }
  }

  // Блокируем скролл при открытом модальном окне
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

  const handleLogin = () => {
    if (loginMethod === 'contract') {
      if (!contractNumber.trim()) {
        setErrorMessage('Введите номер договора')
        setModalType('error')
        setShowModal(true)
        return
      }

      if (!password.trim()) {
        setErrorMessage('Введите пароль')
        setModalType('error')
        setShowModal(true)
        return
      }

      // Проверка номера договора и пароля
      // Для примера: договор "123456" с паролем "password"
      const validContracts: { [key: string]: string } = {
        '123456': 'password',
        '111111': 'pass123',
        '222222': 'pass456'
      }

      if (validContracts[contractNumber] && validContracts[contractNumber] === password) {
        setModalType('success')
        setShowModal(true)
      } else {
        setErrorMessage('Неверный номер договора или пароль')
        setModalType('error')
        setShowModal(true)
      }
    } else if (loginMethod === 'email') {
      if (!email.trim()) {
        setErrorMessage('Введите email')
        setModalType('error')
        setShowModal(true)
        return
      }

      if (!password.trim()) {
        setErrorMessage('Введите пароль')
        setModalType('error')
        setShowModal(true)
        return
      }

      // Проверка email и пароля
      const validEmails: { [key: string]: string } = {
        'test@example.com': 'password',
        'admin@pg19.ru': 'admin123',
        'user@pg19.ru': 'user123'
      }

      if (validEmails[email.toLowerCase()] && validEmails[email.toLowerCase()] === password) {
        setModalType('success')
        setShowModal(true)
      } else {
        setErrorMessage('Неверный email или пароль')
        setModalType('error')
        setShowModal(true)
      }
    }
  }

  const handleTelegramLogin = () => {
    console.log('Вход через Telegram')
    // Здесь будет логика входа через Telegram
  }

  const loginMethods = [
    {
      id: 'phone' as LoginMethod,
      title: 'Телефон',
      description: 'Звонок',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#1976D2'
    },
    {
      id: 'contract' as LoginMethod,
      title: 'Договор',
      description: 'Номер и пароль',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#F57C00'
    },
    {
      id: 'telegram' as LoginMethod,
      title: 'Telegram',
      description: 'Быстрый вход',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5L2 12.5L9 13.5M21 5L15 21L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#0088cc'
    },
    {
      id: 'email' as LoginMethod,
      title: 'Email',
      description: 'Email и пароль',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#388E3C'
    }
  ]

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Левая панель с вкладками */}
        <div className={styles.sidebar}>
          <Link href="/" className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ПЖ19"
              className={styles.logoImage}
            />
          </Link>
          
          <h1 className={styles.sidebarTitle}>Вход в личный кабинет</h1>
          <p className={styles.sidebarSubtitle}>Выберите способ входа</p>
          
          <div className={styles.methodsList}>
            {loginMethods.map((method) => (
            <button
                key={method.id}
                className={`${styles.methodTab} ${loginMethod === method.id ? styles.methodTabActive : ''}`}
                onClick={() => setLoginMethod(method.id)}
                title={`${method.title} - ${method.description}`}
            >
              <div className={styles.methodIcon}>
                  {method.icon}
              </div>
              <div className={styles.methodContent}>
                  <div className={styles.methodName}>{method.title}</div>
                  <div className={styles.methodDescription}>{method.description}</div>
              </div>
            </button>
            ))}
          </div>
        </div>

        {/* Правая часть с формой */}
        <div className={styles.content}>
          {loginMethod === 'phone' && (
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Вход по телефону</h2>
              <p className={styles.formSubtitle}>Введите свой номер телефона, чтобы подтвердить вход звонком.</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Номер телефона</label>
                <input
                  type="tel"
                  id="phone"
                  className={styles.input}
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  maxLength={18}
                />
              </div>

              <button className={styles.submitButton} onClick={handleGetCode}>
                Войти
              </button>
            </div>
          )}

          {/* Модальное окно */}
          {showModal && (
            <div className={styles.modalOverlay} onClick={handleCloseModal}>
              <div className={`${styles.modalContent} ${modalType === 'success' ? styles.modalSuccess : styles.modalError}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={handleCloseModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className={styles.modalIconContainer}>
                  {modalType === 'success' ? (
                    <div className={styles.modalIconSuccess}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.modalIconError}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className={styles.modalTitle}>
                  {modalType === 'success' ? 'Вход выполнен успешно!' : 'Ошибка входа'}
                </h3>
                
                <p className={styles.modalText}>
                  {modalType === 'success' 
                    ? 'Вы успешно вошли в личный кабинет. Перенаправление...' 
                    : errorMessage}
                </p>
                
                <button className={`${styles.modalButton} ${modalType === 'success' ? styles.modalButtonSuccess : styles.modalButtonError}`} onClick={handleCloseModal}>
                  {modalType === 'success' ? 'Перейти в кабинет' : 'Понятно'}
                </button>
              </div>
            </div>
          )}

          {loginMethod === 'contract' && (
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Вход по номеру договора</h2>
              <p className={styles.formSubtitle}>Введите номер договора и пароль для входа</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="contractNumber" className={styles.label}>Номер договора</label>
                <input
                  type="text"
                  id="contractNumber"
                  className={styles.input}
                  placeholder="Введите номер договора"
                  value={contractNumber}
                  onChange={(e) => {
                    // Разрешаем только цифры и ограничиваем до 6 символов
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setContractNumber(value)
                  }}
                  maxLength={6}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contractPassword" className={styles.label}>Пароль</label>
                <div className={styles.passwordInputWrapper}>
                <input
                    type={showPassword ? 'text' : 'password'}
                  id="contractPassword"
                  className={styles.input}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1751 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button className={styles.submitButton} onClick={handleLogin}>
                Войти
              </button>
            </div>
          )}

          {loginMethod === 'telegram' && (
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Войти через Telegram</h2>
              <p className={styles.formSubtitle}>Нажмите кнопку для авторизации через Telegram бота</p>
              
              <button className={styles.telegramButton} onClick={handleTelegramLogin}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5L2 12.5L9 13.5M21 5L15 21L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Войти через Telegram
              </button>
            </div>
          )}

          {loginMethod === 'email' && (
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Вход по email</h2>
              <p className={styles.formSubtitle}>Введите email и пароль для входа в личный кабинет</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="emailPassword" className={styles.label}>Пароль</label>
                <div className={styles.passwordInputWrapper}>
                <input
                    type={showPassword ? 'text' : 'password'}
                  id="emailPassword"
                  className={styles.input}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1751 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button className={styles.submitButton} onClick={handleLogin}>
                Войти
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
