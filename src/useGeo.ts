// only for rn
// need @react-native-community/geolocation

import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'

/**
 * Хук для работы с геолокацией
 */
const useGeo = () => {
  const [ coords, setCoords ] = useState<GeolocationResponse>()
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setCoords(info)
    })
  }, [])
  return coords
}

export default useGeo
