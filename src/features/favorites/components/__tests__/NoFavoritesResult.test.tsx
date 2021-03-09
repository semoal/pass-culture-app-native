import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { initialFavoritesState } from 'features/favorites/pages/reducer'

import { NoFavoritesResult } from '../NoFavoritesResult'

const mockFavoritesState = initialFavoritesState
const mockDispatch = jest.fn()

jest.mock('features/favorites/pages/FavoritesWrapper', () => ({
  useFavoritesState: () => ({
    ...mockFavoritesState,
    dispatch: mockDispatch,
  }),
}))

describe('NoFavoritesResult component', () => {
  beforeEach(jest.clearAllMocks)

  it('should show the message', () => {
    const text = render(<NoFavoritesResult />).getByText(
      `Retrouve toutes tes offres en un clin d'oeil en les ajoutant à tes favoris !`
    )
    expect(text).toBeTruthy()
  })

  it('should navigate to Search when pressing button', () => {
    const button = render(<NoFavoritesResult />).getByText('Explorer les offres')
    fireEvent.press(button)
    expect(navigate).toBeCalledWith('Search')
  })
})