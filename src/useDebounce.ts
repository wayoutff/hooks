/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import type { Cancelable, DebounceSettings } from 'lodash'

const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay = 0,
  options?: DebounceSettings
): T & Cancelable  => {
  const debouncedOptions = options || { leading: true, trailing: false }

  return useCallback(debounce(callback, delay, debouncedOptions), [
    callback,
    delay,
    debouncedOptions,
  ])
}

export const useDebounce = <T>(
  value: T,
  delay = 1000,
  options?: DebounceSettings
): T  => {

  const previousValue = useRef<T>(value)
  const [ current, setCurrent ] = useState<T>(value)
  const debouncedCallback = useDebouncedCallback(
    (value: T) => setCurrent(value),
    delay,
    options
  )

  useEffect(() => {
    if (value !== previousValue.current) {
      debouncedCallback(value)
      previousValue.current = value
      return debouncedCallback.cancel()
    }
  }, [ value, debouncedCallback ])

  return current
}
