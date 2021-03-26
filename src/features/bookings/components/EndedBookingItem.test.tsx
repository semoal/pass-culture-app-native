import { render } from '@testing-library/react-native'
import React from 'react'

import { BookingCancellationReasons } from 'api/gen'

import { bookingsSnap } from '../api/bookingsSnap'

import { EndedBookingItem } from './EndedBookingItem'
import { Booking } from './types'

describe('EndedBookingItem', () => {
  it('should display offer title', () => {
    const { queryByText } = renderEndedBookingItem(bookingsSnap.ended_bookings[0])
    expect(queryByText('Avez-vous déjà vu ?')).toBeTruthy()
  })

  it('should display "Utilisé" and dateUsed labels if booking was used', () => {
    const { queryByText } = renderEndedBookingItem({
      ...bookingsSnap.ended_bookings[0],
      dateUsed: new Date('2021-03-16T23:01:37.925926'),
    })
    expect(queryByText('Utilisé')).toBeTruthy()
    expect(queryByText('le 16/03/2021')).toBeTruthy()
  })

  it('should display "Annulée" and cancellationDate labels if booking was cancelled by offerer', () => {
    const { queryByText } = renderEndedBookingItem({
      ...bookingsSnap.ended_bookings[0],
      cancellationReason: BookingCancellationReasons.OFFERER,
    })
    expect(queryByText('Annulé')).toBeTruthy()
    expect(queryByText('le 15/03/2021')).toBeTruthy()
  })

  it('should display "Réservation annulée" and cancellationDate labels if booking was cancelled by beneficiary', () => {
    const { queryByText } = renderEndedBookingItem({
      ...bookingsSnap.ended_bookings[0],
      cancellationReason: BookingCancellationReasons.BENEFICIARY,
    })
    expect(queryByText('Réservation annulée')).toBeTruthy()
    expect(queryByText('le 15/03/2021')).toBeTruthy()
  })

  it('should display "Réservation annulée" and cancellationDate labels if booking was expired', () => {
    const { queryByText } = renderEndedBookingItem({
      ...bookingsSnap.ended_bookings[0],
      cancellationReason: BookingCancellationReasons.EXPIRED,
    })
    expect(queryByText('Réservation annulée')).toBeTruthy()
    expect(queryByText('le 15/03/2021')).toBeTruthy()
  })
})

function renderEndedBookingItem(booking: Booking) {
  return render(<EndedBookingItem booking={booking} />)
}