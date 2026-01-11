'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import styles from './AddressCheckBlock.module.css'

// Dynamically import the entire map to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Загрузка карты...</div>
})

const ADDRESSES = [
  'Таганрог, ул. Петровская, д. 19',
  'Таганрог, ул. Чехова, д. 22',
  'Таганрог, ул. Фрунзе, д. 15',
  'Таганрог, ул. Греческая, д. 10',
  'Таганрог, ул. Ленина, д. 25'
]

const MAP_ADDRESSES = [
  'Таганрог, ул. Александровская, д. 12',
  'Таганрог, ул. Айвазовского, д. 7',
  'Таганрог, ул. Лизы Волошиной, д. 15',
  'Таганрог, ул. Мариупольское шоссе, д. 50',
  'Таганрог, ул. Транспортная, д. 22',
  'Таганрог, ул. Восточная, д. 19',
  'Таганрог, ул. Театральная, д. 8',
  'Таганрог, ул. Инструментальная, д. 11',
  'Таганрог, ул. Бакинская, д. 5',
  'Таганрог, ул. Виноградная, д. 3',
  'Таганрог, ул. Вишневая, д. 6',
  'Таганрог, ул. Водопроводная, д. 9',
  'Таганрог, ул. Богдана Хмельницкого, д. 14'
]

export default function AddressCheckBlock() {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  // Taganrog coordinates: 47.2364, 38.8969
  const [mapCenter, setMapCenter] = useState<[number, number]>([47.2364, 38.8969])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddress(value)

    if (value.trim() === '') {
      setFilteredAddresses([])
      setShowDropdown(false)
      return
    }

    const lowerValue = value.toLowerCase()
    
    // Если введен "Таганрог", показать все адреса
    if (lowerValue === 'таганрог') {
      setFilteredAddresses(ADDRESSES)
      setShowDropdown(true)
    } else {
      // Фильтруем адреса по введенному тексту
      const filtered = ADDRESSES.filter(addr => 
        addr.toLowerCase().includes(lowerValue)
      )
      setFilteredAddresses(filtered)
      setShowDropdown(filtered.length > 0)
    }
  }

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress)
    setShowDropdown(false)
    setFilteredAddresses([])
  }

  const handleCheck = () => {
    if (!address.trim()) {
      return
    }
    
    setShowDropdown(false)
    
    // Случайно выбираем доступность подключения
    const available = Math.random() >= 0.5
    setIsAvailable(available)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSubmitRequest = () => {
    // Переход на страницу заявки с параметрами
    const params = new URLSearchParams({
      address: address,
      available: isAvailable.toString()
    })
    router.push(`/request?${params.toString()}`)
  }

  const handleMarkerClick = () => {
    // Выбираем случайный адрес из списка
    const randomAddress = MAP_ADDRESSES[Math.floor(Math.random() * MAP_ADDRESSES.length)]
    setAddress(randomAddress)
    
    // Случайно выбираем доступность подключения
    const available = Math.random() >= 0.5
    setIsAvailable(available)
    setShowModal(true)
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
    <section id="address-check" className={styles.addressCheckBlock}>
      <div className={styles.container}>
        <div className={styles.contentCard}>
          <h2 className={styles.title}>Проверьте возможность подключения по вашему адресу</h2>
          <div className={styles.formContainer}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputGroup}>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.input}
                  placeholder="Введите город, улицу, дом"
                  value={address}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (filteredAddresses.length > 0) {
                      setShowDropdown(true)
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCheck()
                    }
                  }}
                />
                <button className={styles.checkButton} onClick={handleCheck}>
                  Проверить
                </button>
              </div>
              {showDropdown && filteredAddresses.length > 0 && (
                <div ref={dropdownRef} className={styles.dropdown}>
                  {filteredAddresses.map((addr, index) => (
                    <div
                      key={index}
                      className={styles.dropdownItem}
                      onClick={() => handleAddressSelect(addr)}
                    >
                      {addr}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.mapContainer}>
            <MapComponent 
              center={mapCenter} 
              onMarkerDrag={(coordinates) => {
                setMapCenter(coordinates)
              }}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={`${styles.modalContent} ${isAvailable ? styles.modalContentSuccess : styles.modalContentWarning}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.modalIconContainer}>
              {isAvailable ? (
                <div className={styles.modalIconSuccess}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className={styles.modalIconWarning}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
            
            <h3 className={`${styles.modalTitle} ${isAvailable ? styles.modalTitleSuccess : styles.modalTitleWarning}`}>
              {isAvailable ? 'Подключение доступно!' : 'Подключение недоступно'}
            </h3>
            
            <div className={styles.modalAddress}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.addressIcon}>
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{address}</span>
            </div>
            
            <p className={styles.modalText}>
              {isAvailable 
                ? 'На этом адресе доступно подключение. Мы можем подключить интернет по указанному адресу. Свяжитесь с нами для уточнения деталей подключения.'
                : 'На этом адресе недоступно подключение. Для данного адреса требуется дополнительная проверка возможности подключения. Наш специалист свяжется с вами для уточнения деталей.'}
            </p>
            
            <button className={`${styles.modalButton} ${isAvailable ? styles.modalButtonSuccess : styles.modalButtonWarning}`} onClick={handleSubmitRequest}>
              <span>Оставить заявку</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
