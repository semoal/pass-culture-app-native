import RNDateTimePicker from '@react-native-community/datetimepicker'
import { render } from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'

import { initialSearchState } from '../reducer'
import { SearchFilter } from '../SearchFilter'

// @ts-ignore: solution find on the github repo to the issue https://github.com/react-native-datetimepicker/datetimepicker/issues/216
RNDateTimePicker.mockImplementation((props) => <View testID={props.testID} />)

const mockSearchState = initialSearchState
jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({
    searchState: mockSearchState,
    dispatch: jest.fn(),
  }),
}))
describe('SearchFilter component', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<SearchFilter />)
    expect(toJSON()).toMatchSnapshot()
  })
})