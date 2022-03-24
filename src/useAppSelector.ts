import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '~/store' // way to store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
