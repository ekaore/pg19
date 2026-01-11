'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const navItems = [
    { label: 'Тариф', href: '#tariff', id: 'tariff' },
    { label: 'Услуги', href: '#services', id: 'services' },
    { label: 'Подключение', href: '#address-check', id: 'address-check' },
    { label: 'О кооперативе', href: '#cooperative', id: 'cooperative' },
    { label: 'Контакты', href: '#contacts', id: 'contacts' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    // Если мы не на главной странице, сначала переходим на главную
    if (!isHomePage && href.startsWith('#')) {
      e.preventDefault()
      window.location.href = `/${href}`
      return
    }

    // Если на главной странице, плавно прокручиваем к блоку
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип слева */}
        <div className={styles.logo}>
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ПЖ19"
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Навигационное меню по центру */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link 
                  href={item.href} 
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Телефон и кнопка справа */}
        <div className={styles.rightSection}>
          <a href="tel:88002225519" className={styles.phone}>
            8 800 222 55 19
          </a>
          <Link href="/cabinet" className={styles.cabinetButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Личный кабинет
          </Link>
        </div>
      </div>
    </header>
  )
}

