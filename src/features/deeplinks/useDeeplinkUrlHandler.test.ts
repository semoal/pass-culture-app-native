import { renderHook } from '@testing-library/react-hooks'

import { navigate } from '__mocks__/@react-navigation/native'

import { decodeDeeplinkParts, useDeeplinkUrlHandler } from './useDeeplinkUrlHandler'
import { DEEPLINK_DOMAIN } from './utils'

jest.mock('features/navigation/navigationRef')

describe('useDeeplinkUrlHandler', () => {
  describe('Url parts', () => {
    const uri = 'my-route?param1=one&param2=2&param3=true&param4=false'
    const uriWithoutParams = 'my-route/test' // slash will be included in the route name

    it.each([
      ['Android', DEEPLINK_DOMAIN + uri],
      ['iOS', DEEPLINK_DOMAIN + uri],
    ])('should parse route name and uri params for %s', (_platform, url) => {
      const { routeName, params } = decodeDeeplinkParts(url)
      expect(routeName).toEqual('my-route')
      expect(params).toMatchObject<Record<string, string>>({
        param1: 'one',
        param2: '2',
        param3: 'true',
        param4: 'false',
      })
    })

    it.each([
      ['Android', DEEPLINK_DOMAIN + uriWithoutParams],
      ['iOS', DEEPLINK_DOMAIN + uriWithoutParams],
    ])('should handle url without uri params for %s', (_platform, url) => {
      const { routeName, params } = decodeDeeplinkParts(url)
      expect(routeName).toEqual('my-route/test')
      expect(params).toEqual({})
    })

    it("doesn't take into account the trailing slash", () => {
      const { routeName, params } = decodeDeeplinkParts('passculture/offer/?id=ABCDE')
      expect(routeName).toEqual('passculture/offer')
      expect(params).toEqual({ id: 'ABCDE' })
    })
  })

  describe('Navigation handler', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should redirect to the right component when it exists', () => {
      const {
        result: { current: handleDeeplinkUrl },
      } = renderHook(useDeeplinkUrlHandler)

      const url = DEEPLINK_DOMAIN + 'my-route-to-test?param1=one&param2=2&param3=true&param4=false'

      handleDeeplinkUrl({ url })

      expect(navigate).toHaveBeenCalledWith('UniqueTestRoute', {
        param1: 'one',
        param2: 2,
        param3: true,
        param4: false,
      })
    })

    it('should redirect to Home when the route is not recognized', () => {
      const {
        result: { current: handleDeeplinkUrl },
      } = renderHook(useDeeplinkUrlHandler)
      const url = DEEPLINK_DOMAIN + 'unknwon-route?param1=one&param2=2'

      handleDeeplinkUrl({ url })

      expect(navigate).toHaveBeenCalledWith('Home', {
        shouldDisplayLoginModal: false,
      })
    })
  })
})

/** FAKING DEEPLINKS ROUTING */
jest.mock('features/deeplinks/routing', () => ({
  DEEPLINK_TO_SCREEN_CONFIGURATION: {
    'my-route-to-test': function (params: Record<string, string>) {
      return {
        screen: 'UniqueTestRoute',
        params: {
          param1: params.param1,
          param2: Number(params.param2),
          param3: params.param3 === 'true',
          param4: params.param4 === 'true',
        },
      }
    },
    default: function () {
      return { screen: 'Home', params: { shouldDisplayLoginModal: false } }
    },
  },
}))
/** FAKING DEEPLINKS ROUTING END */
