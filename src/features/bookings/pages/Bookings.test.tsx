import { render } from '@testing-library/react-native'
import { rest } from 'msw'
import React from 'react'
import waitForExpect from 'wait-for-expect'

import { BookingsResponse } from 'api/gen'
import { env } from 'libs/environment'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { server } from 'tests/server'
import { superFlushWithAct } from 'tests/utils'

import { emptyBookingsSnap } from '../api/bookingsSnap'

import { Bookings } from './Bookings'

describe('Bookings', () => {
  it('should display the right account of ongoing bookings', async () => {
    const { queryByText } = renderBookings()

    await superFlushWithAct(10)
    await waitForExpect(() => {
      expect(queryByText('1\u00a0réservation en cours')).toBeTruthy()
    })
  })
  it('should display the empty bookings dedicated view', async () => {
    server.use(
      rest.get<BookingsResponse>(env.API_BASE_URL + '/native/v1/bookings', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(emptyBookingsSnap))
      })
    )
    const { getByText } = renderBookings()

    await superFlushWithAct(10)
    getByText('Explorer les offres')
  })
})

const renderBookings = () => {
  return render(reactQueryProviderHOC(<Bookings />))
}
