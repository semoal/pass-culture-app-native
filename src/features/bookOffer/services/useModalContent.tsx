import { t } from '@lingui/macro'
import React from 'react'
import { Platform } from 'react-native'

import { CategoryType } from 'api/gen'
import { BookingDetails } from 'features/bookOffer/components/BookingDetails'
import { BookingEventChoices } from 'features/bookOffer/components/BookingEventChoices'
import { _ } from 'libs/i18n'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { IconInterface } from 'ui/svg/icons/types'

import { BookingImpossible } from '../components/BookingImpossible'
import { useBooking, useBookingOffer } from '../pages/BookingOfferWrapper'
import { Step } from '../pages/reducer'

interface ModalContent {
  children: Element
  title: string
  leftIcon: React.FC<IconInterface> | undefined
  onLeftIconPress: (() => void) | undefined
}

export const useModalContent = (): ModalContent => {
  const { bookingState, dispatch } = useBooking()
  const offer = useBookingOffer()

  const children = <React.Fragment />
  const title = ''
  const leftIcon: React.FC<IconInterface> | undefined = undefined
  const onLeftIconPress = undefined

  if (!offer) return { children, title, leftIcon, onLeftIconPress }
  const { category, isDigital, stocks } = offer

  const goToPreviousStep = () => {
    dispatch({ type: 'CHANGE_STEP', payload: Step.PRE_VALIDATION })
  }

  if (category.categoryType === CategoryType.Thing) {
    if (isDigital && Platform.OS === 'ios') {
      return {
        title: _(t`Réservation impossible`),
        leftIcon: undefined,
        onLeftIconPress: undefined,
        children: <BookingImpossible />,
      }
    }

    return {
      title: _(t`Détails de la réservation`),
      leftIcon: undefined,
      onLeftIconPress: undefined,
      children: <BookingDetails stocks={stocks} />,
    }
  }

  if (bookingState.step !== Step.CONFIRMATION) {
    return {
      title: _(t`Mes options`),
      leftIcon: undefined,
      onLeftIconPress: undefined,
      children: <BookingEventChoices stocks={stocks} />,
    }
  }

  return {
    title: _(t`Détails de la réservation`),
    leftIcon: ArrowPrevious,
    onLeftIconPress: goToPreviousStep,
    children: <BookingDetails stocks={stocks} />,
  }
}
