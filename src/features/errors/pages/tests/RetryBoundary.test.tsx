import { render } from '@testing-library/react-native'
import React from 'react'

import { RetryBoundary } from '../RetryBoundary'

describe('RetryBoundary component', () => {
  it('should render', () => {
    const resetErrorBoundary = jest.fn()
    const component = render(<RetryBoundary resetErrorBoundary={resetErrorBoundary} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})