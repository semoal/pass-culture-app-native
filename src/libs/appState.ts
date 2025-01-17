import { useRef, useEffect, DependencyList } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppStateChange = (
  onAppBecomeActive: () => void,
  onAppBecomeInactive: () => void,
  deps: DependencyList | undefined = []
) => {
  const appState = useRef(AppState.currentState)
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
      onAppBecomeInactive()
    }
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      onAppBecomeActive()
    }
    appState.current = nextAppState
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, deps)
  return appState
}
