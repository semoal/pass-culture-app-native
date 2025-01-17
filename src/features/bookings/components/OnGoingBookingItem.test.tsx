import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'

import { bookingsSnap } from '../api/bookingsSnap'

import { OnGoingBookingItem } from './OnGoingBookingItem'
import { Booking } from './types'

describe('OnGoingBookingItem', () => {
  const booking: Booking = bookingsSnap.ongoing_bookings[0]

  it('should navigate to the booking details page', () => {
    const { getByTestId } = renderOnGoingBookingItem(booking)

    const item = getByTestId('OnGoingBookingItem')
    fireEvent.press(item)

    expect(navigate).toHaveBeenCalledWith('BookingDetails', { id: 123 })
  })
})

function renderOnGoingBookingItem(booking: Booking) {
  return render(<OnGoingBookingItem booking={booking} />)
}
