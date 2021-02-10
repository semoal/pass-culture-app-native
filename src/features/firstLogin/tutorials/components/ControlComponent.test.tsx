import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ControlComponent, ControlComponentProps } from './ControlComponent'

describe('<ControlComponent />', () => {
  let onPress: jest.Mock

  beforeEach(() => {
    onPress = jest.fn()
  })

  it('should render correctly prev by default', () => {
    const renderAPI = renderControlComponent()
    expect(renderAPI).toMatchSnapshot()
    expect(renderAPI.getByTestId('arrowPrevious')).toBeTruthy()
    expect(() => renderAPI.getByTestId('arrowNext')).toThrowError()
  })

  it('should render prev when type is prev', () => {
    const renderAPI = renderControlComponent({
      onPress,
      title: 'Previous',
      type: 'prev',
    })
    expect(renderAPI).toMatchSnapshot()
    expect(renderAPI.getByTestId('arrowPrevious')).toBeTruthy()
    expect(() => renderAPI.getByTestId('arrowNext')).toThrowError()
  })

  it('renders render next when type is next', () => {
    const renderAPI = renderControlComponent({
      onPress,
      title: 'Next',
      type: 'next',
    })
    expect(renderAPI).toMatchSnapshot()
    expect(renderAPI.getByTestId('arrowNext')).toBeTruthy()
    expect(() => renderAPI.getByTestId('arrowPrevious')).toThrowError()
  })

  it('renders trigger onPress when pressed', async () => {
    const { findByTestId } = renderControlComponent({
      onPress,
      title: 'Previous',
      type: 'prev',
    })
    fireEvent.press(await findByTestId('button'))
    expect(onPress).toHaveBeenCalled()
  })
})

function renderControlComponent(
  props: ControlComponentProps = {
    onPress: jest.fn(),
    title: 'Previous',
    type: 'prev',
  }
) {
  return render(<ControlComponent {...props} />)
}
