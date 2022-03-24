import { useCallback, useState, useEffect } from 'react'

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)

    return asyncFunction()
      .then((response: any) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: any) => {
        if (error.response) {
          // Request made and server responded
          setError(error.response.data)
        }
        if (error.request) {
          // The request was made but no response was received
          // console.log(error.request)
          setError(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
          setError(error.message)
        }

        setStatus('error')
      })
  }, [asyncFunction])

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.

  useEffect(() => {
    if (immediate) execute()
  }, [execute, immediate])

  return { execute, status, value, error }
}
