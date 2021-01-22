import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'

import { canGoBack, goBack } from '__mocks__/@react-navigation/native'

import { RetryBoundaryWithNavigation } from '../RetryBoundaryWithNavigation'

describe('RetryBoundary component', () => {
  it('should render', () => {
    const resetErrorBoundary = jest.fn()
    const component = render(
      <RetryBoundaryWithNavigation
        error={new Error('error')}
        resetErrorBoundary={resetErrorBoundary}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should have back arrow if possible', () => {
    canGoBack.mockImplementation(() => true)
    const { getByTestId, queryByTestId } = render(
      <RetryBoundaryWithNavigation error={new Error('error')} resetErrorBoundary={jest.fn()} />
    )
    expect(queryByTestId('backArrow')).toBeTruthy()
    fireEvent.press(getByTestId('backArrow'))
    expect(goBack).toHaveBeenCalled()
  })
  it('should not have back arrow if impossible', () => {
    canGoBack.mockImplementation(() => false)
    const { queryByTestId } = render(
      <RetryBoundaryWithNavigation error={new Error('error')} resetErrorBoundary={jest.fn()} />
    )
    expect(queryByTestId('backArrow')).toBeFalsy()
  })
})