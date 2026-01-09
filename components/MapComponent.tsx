'use client'

import { useEffect, useRef, useState } from 'react'

interface MapComponentProps {
  center: [number, number]
}

declare global {
  interface Window {
    ymaps: any
    __YMAPS_LOADING__?: boolean
    __YMAPS_LOADED__?: boolean
  }
}

export default function MapComponent({ center }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const placemarkRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current || !isMounted) return

      try {
        mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
          center: center,
          zoom: 13,
          controls: ['zoomControl', 'fullscreenControl']
        })

        // Добавляем маркер
        placemarkRef.current = new window.ymaps.Placemark(center, {}, {
          preset: 'islands#blueDotIcon'
        })
        mapInstanceRef.current.geoObjects.add(placemarkRef.current)
        setIsLoaded(true)
      } catch (error) {
        console.error('Ошибка инициализации карты:', error)
      }
    }

    // Если ymaps уже загружен, сразу инициализируем карту
    if (window.__YMAPS_LOADED__ && window.ymaps && window.ymaps.ready) {
      window.ymaps.ready(initMap)
      return () => {
        isMounted = false
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.destroy()
          } catch (e) {
            // Игнорируем ошибки при уничтожении
          }
          mapInstanceRef.current = null
          placemarkRef.current = null
        }
      }
    }

    // Удаляем все старые скрипты Яндекс.Карт
    const allScripts = document.querySelectorAll('script[src*="api-maps.yandex.ru"]')
    allScripts.forEach(script => script.remove())

    // Если скрипт уже загружается, ждем его
    if (window.__YMAPS_LOADING__) {
      const checkYmaps = setInterval(() => {
        if (window.__YMAPS_LOADED__ && window.ymaps && window.ymaps.ready) {
          clearInterval(checkYmaps)
          window.ymaps.ready(initMap)
        }
      }, 100)

      setTimeout(() => clearInterval(checkYmaps), 10000)

      return () => {
        isMounted = false
        clearInterval(checkYmaps)
      }
    }

    // Загружаем скрипт только если он еще не загружается
    if (!window.__YMAPS_LOADING__ && !window.__YMAPS_LOADED__) {
      window.__YMAPS_LOADING__ = true

      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
      script.async = true
      script.id = 'yandex-maps-script'

      script.onload = () => {
        window.__YMAPS_LOADING__ = false
        window.__YMAPS_LOADED__ = true
        
        if (isMounted && window.ymaps) {
          window.ymaps.ready(initMap)
        }
      }

      script.onerror = () => {
        window.__YMAPS_LOADING__ = false
        console.error('Ошибка загрузки Яндекс.Карт')
      }

      document.head.appendChild(script)
    }

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy()
        } catch (e) {
          // Игнорируем ошибки при уничтожении
        }
        mapInstanceRef.current = null
        placemarkRef.current = null
      }
    }
  }, [])

  // Обновляем центр карты и маркер при изменении center
  useEffect(() => {
    if (mapInstanceRef.current && placemarkRef.current && isLoaded) {
      mapInstanceRef.current.setCenter(center, 13, {
        duration: 300
      })
      placemarkRef.current.geometry.setCoordinates(center)
    }
  }, [center, isLoaded])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
