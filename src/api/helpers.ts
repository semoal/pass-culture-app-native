/* eslint-disable @typescript-eslint/ban-ts-comment */
import { t } from '@lingui/macro'
import jwtDecode from 'jwt-decode'

import { navigationRef } from 'features/navigation/navigationRef'
import { Headers, FailedToRefreshAccessTokenError } from 'libs/fetch'
import { _ } from 'libs/i18n'
import { clearRefreshToken, getRefreshToken } from 'libs/keychain'
import { clearAccessToken, getAccessToken, saveAccessToken } from 'libs/storage'

import { DefaultApi } from './gen'

export function navigateToLogin() {
  setTimeout(() => void navigationRef.current?.navigate('Login'), 0)
}

export async function getAuthenticationHeaders(options?: RequestInit): Promise<Headers> {
  const accessToken = await getAccessToken()
  const shouldAuthenticate = accessToken && (!options || options.credentials !== 'omit')
  if (shouldAuthenticate) {
    return { Authorization: `Bearer ${accessToken}` }
  }
  return {}
}

interface JWTToken {
  exp: number
  fresh: false
  iat: number
  identity: string
  jti: string
  nbf: number
  type: string
}

// HOT FIX waiting for a better strategy
const NotAuthenticatedCalls = [
  'native/v1/account',
  'native/v1/refresh_access_token',
  'native/v1/request_password_reset',
  'native/v1/reset_password',
  'native/v1/signin',
  'native/v1/validate_email',
  'native/v1/offer',
]

/**
 * For each http calls to the api, retrieves the access token and fetchs.
 * Ignores native/v1/refresh_access_token.
 *
 * First decodes the local access token:
 * on success: continue to the call
 * on error (401): try to refresh the access token
 * on error (other): propagates error
 */
export const safeFetch = async (
  url: string,
  options: RequestInit,
  api: DefaultApi
): Promise<Response> => {
  // dont ask a new token for this specific api call
  for (const apiRoute of NotAuthenticatedCalls) {
    if (url.includes(apiRoute)) {
      return await fetch(url, options)
    }
  }

  // @ts-ignore
  const authorizationHeader = options.headers?.['Authorization'] || ''
  const token = authorizationHeader?.replace('Bearer ', '')

  try {
    const tokenContent = jwtDecode(token) as JWTToken

    if (tokenContent.exp * 1000 <= new Date().getTime()) {
      throw new Error('Token expired')
    }
  } catch (error) {
    try {
      const newAccessToken = await refreshAccessToken(api)

      options = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    } catch (error) {
      return Promise.reject(navigateToLogin())
    }
  }

  return await fetch(url, options)
}

/**
 * Calls Api to refresh the access token using the in-keychain stored refresh token
 * - on success: Stores the new access token
 * - on error (422): propagates error
 * - on error (other): throws an exception
 */
export const refreshAccessToken = async (api: DefaultApi): Promise<string | null> => {
  const refreshToken = await getRefreshToken()

  // if not connected, we also redirect to the login page
  if (refreshToken == null) {
    throw new FailedToRefreshAccessTokenError()
  }

  const response = await api.postnativev1refreshAccessToken({
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (!response) {
    await clearRefreshToken()
    await clearAccessToken()
    throw new FailedToRefreshAccessTokenError()
  }

  await saveAccessToken(response.accessToken)

  return await getAccessToken()
}

// In this case, the following `any` is not that much of a problem in the context of usage
// with the autogenerated files of swagger-codegen.
// !!! Not encouraging to use `any` anywhere else !!!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleGeneratedApiResponse(response: Response): Promise<any | void> {
  if (response.status === 204) {
    return {}
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      await response.json(),
      _(t`Échec de la requête ${response.url}, code: ${response.status}`)
    )
  }

  return await response.json()
}

export class ApiError extends Error {
  name = 'ApiError'
  content: string
  status: number

  constructor(status: number, content: string, message?: string) {
    super(message)
    this.content = content
    this.status = status
  }
}
