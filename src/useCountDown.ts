/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react"

const defaultTimer = 60

/**
 * @typedef {Object} TimerUtils
 * @property {number} leftTime - time left
 * @property {stopTimer} cb to pause the timer
 * @property {startTimer} cb to run the timer
 * @property {resetTimer} cb to reset the timer to initial value
 */

/**
 * Countdown custom hook
 *
 * @param  {number} duration [sec] timer duration value = 60 sec by default
 * @param  {onTimeOut} Callback for firing event when timer runs out
 * @returns {TimerUtils} props and methods for timer control
 */

export function useCountDown(defaultTime = defaultTimer, onTimeOut = () => {}) {
  const timerIdRef = useRef<ReturnType<typeof setInterval> | number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(defaultTime * 1000)

  const startTimer = () => {
    if (timerIdRef.current) return
    timerIdRef.current = setInterval(() => {
      setTimeLeft(current => {
        if (current <= 1) {
          clearInterval(timerIdRef.current as number)
          onTimeOut()
          return 0
        }
        return current - 1000
      })
    }, 1000)
  }

  const resetTimer = useCallback(() => {
    clearInterval(timerIdRef.current as number)
    timerIdRef.current = 0
    setTimeLeft(defaultTime * 1000)
  }, [])

  const stopTimer = useCallback(() => {
    clearInterval(timerIdRef.current as number)
    timerIdRef.current = 0
  }, [])

  useEffect(() => stopTimer, [stopTimer])

  return { timeLeft, startTimer, resetTimer, stopTimer }
}
