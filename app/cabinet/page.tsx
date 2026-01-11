'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

type LoginMethod = 'phone' | 'contract' | 'telegram' | 'email'

export default function CabinetPage() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone')
  const [phone, setPhone] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

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

  const handleGetCode = () => {
    console.log('Получение кода для:', phone)
    // Здесь будет логика получения SMS кода
  }

  const handleLogin = () => {
    console.log('Вход:', { loginMethod, phone, contractNumber, password, email })
    // Здесь будет логика входа
  }

  const handleTelegramLogin = () => {
    console.log('Вход через Telegram')
    // Здесь будет логика входа через Telegram
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Левая панель */}
        <div className={styles.sidebar}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.logoColor1}></div>
              <div className={styles.logoColor2}></div>
              <div className={styles.logoColor3}></div>
            </div>
            <span className={styles.logoText}>ПЖ19</span>
          </Link>
          
          <h1 className={styles.sidebarTitle}>Вход в личный кабинет</h1>
          <p className={styles.sidebarSubtitle}>Выберите способ входа</p>
          
          <div className={styles.methodsList}>
            <button
              className={`${styles.methodItem} ${loginMethod === 'phone' ? styles.methodItemActive : ''}`}
              onClick={() => setLoginMethod('phone')}
            >
              <div className={styles.methodIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22 20.4923 21.7893 21.0411 21.4142 21.4161C21.0391 21.7912 20.4904 22.002 19.918 22.002C15.418 21.992 11.0659 20.5961 7.46376 18.0067C4.04571 15.6188 1.45319 12.3748 0.0529785 8.66322C-0.0174245 8.09863 0.0957716 7.52679 0.336131 7.00981C0.576491 6.49283 0.936697 6.04785 1.38 5.71201L4.31 3.52201C4.75856 3.18574 5.30847 3.00206 5.875 3.00201C6.44153 3.00196 6.99144 3.18554 7.44 3.52201L10.37 6.14201C10.8186 6.47848 11.1413 6.95031 11.2881 7.48159C11.4349 8.01287 11.3976 8.5744 11.182 9.08201L9.73 12.352C11.2796 14.8307 13.6193 16.7082 16.35 17.642L19.62 16.012C20.1298 15.7963 20.6931 15.7591 21.2251 15.9064C21.7571 16.0538 22.2292 16.3775 22.565 16.827L22.58 16.852H22.59L22.6 16.872C22.775 17.085 22.898 17.337 22.958 17.606C23.018 17.875 23.014 18.153 22.945 18.42C22.876 18.687 22.745 18.936 22.562 19.146C22.379 19.356 22.15 19.522 21.89 19.632L19.98 20.492L19.96 20.502L19.94 20.512C19.73 20.597 19.5 20.642 19.268 20.642H18.92L16 18.862L13.08 20.642H12.732C12.5 20.642 12.27 20.597 12.06 20.512L12.04 20.502L12.02 20.492L10.11 19.632C9.85 19.522 9.621 19.356 9.438 19.146C9.255 18.936 9.124 18.687 9.055 18.42C8.986 18.153 8.982 17.875 9.042 17.606C9.102 17.337 9.225 17.085 9.4 16.872L9.41 16.852H9.42L9.43 16.832C9.765 16.3825 10.0877 15.9107 10.434 15.459L11.182 14.232C11.3976 13.7244 11.4349 13.1629 11.2881 12.6316C11.1413 12.1003 10.8186 11.6285 10.37 11.292L7.44 8.67201C6.99144 8.33554 6.44153 8.15196 5.875 8.15201C5.30847 8.15206 4.75856 8.33574 4.31 8.67201L1.38 10.862C0.936697 11.1979 0.576491 11.6428 0.336131 12.1598C0.0957716 12.6768 -0.0174245 13.2486 0.0529785 13.8132C1.45319 17.5248 4.04571 20.7688 7.46376 23.1567C11.0659 25.7461 15.418 27.142 19.918 27.152C20.4904 27.152 21.0391 26.9412 21.4142 26.5661C21.7893 26.1911 22 25.6423 22 25.07V22.07C22 21.4977 21.7893 20.9489 21.4142 20.5739C21.0391 20.1988 20.4904 19.988 19.918 19.988Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.methodContent}>
                <div className={styles.methodName}>Телефон</div>
                <div className={styles.methodDescription}>SMS код</div>
              </div>
            </button>

            <button
              className={`${styles.methodItem} ${loginMethod === 'contract' ? styles.methodItemActive : ''}`}
              onClick={() => setLoginMethod('contract')}
            >
              <div className={styles.methodIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.methodContent}>
                <div className={styles.methodName}>Договор</div>
                <div className={styles.methodDescription}>Номер и пароль</div>
              </div>
            </button>

            <button
              className={`${styles.methodItem} ${loginMethod === 'telegram' ? styles.methodItemActive : ''}`}
              onClick={() => setLoginMethod('telegram')}
            >
              <div className={styles.methodIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5L2 12.5L9 13.5M21 5L15 21L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.methodContent}>
                <div className={styles.methodName}>Telegram</div>
                <div className={styles.methodDescription}>Быстрый вход</div>
              </div>
            </button>

            <button
              className={`${styles.methodItem} ${loginMethod === 'email' ? styles.methodItemActive : ''}`}
              onClick={() => setLoginMethod('email')}
            >
              <div className={styles.methodIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.methodContent}>
                <div className={styles.methodName}>Email</div>
                <div className={styles.methodDescription}>Email и пароль</div>
              </div>
            </button>
          </div>
        </div>

        {/* Правая часть - форма входа */}
        <div className={styles.content}>
          {loginMethod === 'phone' && (
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Вход по телефону</h2>
              <p className={styles.formSubtitle}>Введите номер телефона для получения кода подтверждения</p>
              
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
                Получить код
              </button>
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
                  onChange={(e) => setContractNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contractPassword" className={styles.label}>Пароль</label>
                <input
                  type="password"
                  id="contractPassword"
                  className={styles.input}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                <input
                  type="password"
                  id="emailPassword"
                  className={styles.input}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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

