import { fireEvent, render } from '@testing-library/react-native'
import React, { RefObject } from 'react'
import Swiper from 'react-native-web-swiper'

import { SecondCard } from './SecondCard'

let mockDepositAmount = 30000
jest.mock('features/auth/api', () => ({ useDepositAmount: () => mockDepositAmount }))

describe('SecondCard', () => {
  beforeEach(jest.clearAllMocks)
  it('should render second card', () => {
    const firstTutorial = render(<SecondCard activeIndex={0} index={0} lastIndex={0} />)
    expect(firstTutorial).toMatchSnapshot()
  })

  it('should show the correct deposit amount', async () => {
    mockDepositAmount = 30000
    let queryByText = render(<SecondCard activeIndex={0} index={0} lastIndex={0} />).queryByText
    expect(queryByText(/un montant de 300€ à dépenser/)).toBeTruthy()

    mockDepositAmount = 50000
    queryByText = render(<SecondCard activeIndex={0} index={0} lastIndex={0} />).queryByText
    expect(queryByText(/un montant de 500€ à dépenser/)).toBeTruthy()
  })

  it('should swipe to next card on button press', () => {
    const ref = {
      current: {
        goToNext: jest.fn(),
      },
    }
    const { getByText } = render(
      <SecondCard
        lastIndex={0}
        swiperRef={(ref as unknown) as RefObject<Swiper>}
        activeIndex={0}
        index={0}
      />
    )
    fireEvent.press(getByText('Continuer'))
    expect(ref.current.goToNext).toHaveBeenCalled()
  })
})
