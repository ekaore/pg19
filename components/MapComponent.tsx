'use client'

import { useEffect, useRef, useState } from 'react'

interface MapComponentProps {
  center: [number, number]
  onMarkerDrag?: (coordinates: [number, number]) => void
  onMarkerClick?: () => void
}

declare global {
  interface Window {
    ymaps: any
    __YMAPS_LOADING__?: boolean
    __YMAPS_LOADED__?: boolean
  }
}

export default function MapComponent({ center, onMarkerDrag, onMarkerClick }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const placemarkRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const onMarkerDragRef = useRef(onMarkerDrag)
  const onMarkerClickRef = useRef(onMarkerClick)
  
  // Обновляем ref при изменении callback
  useEffect(() => {
    onMarkerDragRef.current = onMarkerDrag
  }, [onMarkerDrag])

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick
  }, [onMarkerClick])

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

        // Добавляем маркер с возможностью перетаскивания
        placemarkRef.current = new window.ymaps.Placemark(center, {}, {
          preset: 'islands#blueDotIcon',
          draggable: true
        })
        
        // Обрабатываем событие окончания перетаскивания
        placemarkRef.current.events.add('dragend', () => {
          const coords = placemarkRef.current.geometry.getCoordinates()
          const newCoords: [number, number] = [coords[0], coords[1]]
          
          // Обновляем центр карты
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(newCoords, mapInstanceRef.current.getZoom(), {
              duration: 300
            })
          }
          
          // Вызываем callback для обновления координат в родительском компоненте
          if (onMarkerDragRef.current) {
            onMarkerDragRef.current(newCoords)
          }
        })
        
        // Обрабатываем клик по маркеру
        placemarkRef.current.events.add('click', () => {
          if (onMarkerClickRef.current) {
            onMarkerClickRef.current()
          }
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
