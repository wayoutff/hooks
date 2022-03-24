/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import axios, { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'

export function useRequest <D>(config: AxiosRequestConfig) {
  const [ data, setData ] = useState<D>()
  const [ error, setError ] = useState<unknown | null>(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await axios.request<D>(config)
        setData(response.data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    loading,
    data,
    error
  }
}
