import { render } from '@testing-library/react-native'
import React from 'react'
import { ReactTestInstance } from 'react-test-renderer'

import { initialSearchState } from 'features/search/pages/reducer'

import { TimeSlot } from '../TimeSlot'

let mockSearchState = initialSearchState
const mockDispatch = jest.fn()
jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockDispatch,
  }),
}))

describe('TimeSlot component', () => {
  it('should render initial timeSlot range correctly', () => {
    expect(render(<TimeSlot />).queryByText('8h - 24h')).toBeTruthy()
    mockSearchState = { ...initialSearchState, timeRange: [6, 20] }
    expect(render(<TimeSlot />).queryByText('6h - 20h')).toBeTruthy()
  })
  it('should dispatch TIME_RANGE onPress', () => {
    const { getByTestId } = render(<TimeSlot />)
    const slider = getByTestId('slider').children[0] as ReactTestInstance
    slider.props.onValuesChange([5, 22])
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TIME_RANGE', payload: [5, 22] })
  })
})