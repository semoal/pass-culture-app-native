import { Route, useNavigationState } from '@react-navigation/native'
import { Linking } from 'react-native'

import { DEEPLINK_DOMAIN } from 'features/deeplinks'
import { getScreenFromDeeplink } from 'features/deeplinks/useDeeplinkUrlHandler'
import { analytics } from 'libs/analytics'

import { navigationRef } from './navigationRef'
import { RouteParams } from './RootNavigator'
import { TabParamList } from './TabBar/types'

export const NavigateToHomeWithoutModalOptions: RouteParams<TabParamList, 'Home'> = {
  shouldDisplayLoginModal: false,
}

interface HomeNavigateConfig {
  screen: 'TabNavigator'
  params: {
    screen: 'Home'
    params: RouteParams<TabParamList, 'Home'>
  }
}

export const homeNavigateConfig: HomeNavigateConfig = {
  screen: 'TabNavigator',
  params: {
    screen: 'Home',
    params: { shouldDisplayLoginModal: false },
  },
}

export async function openExternalUrl(url: string, logEvent: boolean | undefined = true) {
  if (url.match('^' + DEEPLINK_DOMAIN)) {
    const { screen, params } = getScreenFromDeeplink(url)
    return navigationRef.current?.navigate(screen, params)
  }

  const canOpen = await Linking.canOpenURL(url)
  if (canOpen) {
    Linking.openURL(url).then(() => {
      if (logEvent) {
        analytics.logOpenExternalUrl(url)
      }
    })
  }
}

export function usePreviousRoute(): Route<string> | null {
  return useNavigationState((state) => {
    const numberOfRoutes = state.routes.length
    if (numberOfRoutes > 1) {
      const previousRoute = state.routes[numberOfRoutes - 2]
      return previousRoute
    }
    return null
  })
}

export function useCurrentRoute(): Route<string> | null {
  return useNavigationState((state) => {
    const numberOfRoutes = state.routes.length
    if (numberOfRoutes > 0) {
      return state.routes[numberOfRoutes - 1]
    }
    return null
  })
}
