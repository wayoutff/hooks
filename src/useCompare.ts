import { usePrev } from "./usePrev"

export const useCompare = <T> (val: T) => {
  console.log(`Current = ${val}`)
  const prevVal = usePrev(val)

  console.log(`prev value = ${prevVal}`)
  return prevVal !== val
}
