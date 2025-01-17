import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { analytics } from 'libs/analytics'

import { PushNotificationsModal } from '../PushNotificationsModal'

describe('PushNotificationsModal', () => {
  it('should open settings and log event logOpenNotificationSettings', () => {
    const onDismiss = jest.fn()
    const onRequestPermission = jest.fn()
    const renderAPI = render(
      <PushNotificationsModal
        onDismiss={onDismiss}
        visible={true}
        onRequestPermission={onRequestPermission}
      />
    )
    fireEvent.press(renderAPI.getByText('Autoriser les notifications'))
    expect(analytics.logOpenNotificationSettings).toBeCalled()
    expect(onRequestPermission).toBeCalled()
    expect(onDismiss).not.toBeCalled()
  })
})
