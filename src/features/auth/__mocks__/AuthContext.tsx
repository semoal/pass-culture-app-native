import { IAuthContext } from '../AuthContext'

export const signIn = jest.fn()
export const signOut = jest.fn()

export const useSignIn = jest.fn(() => signIn)
export const useSignOut = jest.fn(() => signOut)
export const useAuthContext = jest.fn(
  (): IAuthContext => ({
    signIn,
    signOut,
    isLoggedIn: false,
  })
)