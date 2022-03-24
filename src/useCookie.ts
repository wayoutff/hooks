import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'

const useCookie = (
  cName: string
): [string | null, (newValue: string, opts?: Cookies.CookieAttributes) => void, () => void] => {
  const [value, setValue] = useState<string | null>(() => Cookies.get(cName) || null)

  const updateCookie = useCallback(
    (newValue: string, opts?: Cookies.CookieAttributes) => {
      Cookies.set(cName, newValue, opts)
      setValue(newValue)
    },
    [cName]
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(cName)
    setValue(null)
  }, [cName])

  return [value, updateCookie, deleteCookie]
}

export default useCookie