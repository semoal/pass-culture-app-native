import React, { useRef } from 'react'
import { Modal, View, ScrollView, TouchableOpacity } from 'react-native'
import { Calendar as RNCalendar, CalendarTheme, LocaleConfig } from 'react-native-calendars'
import GestureRecognizer from 'react-native-swipe-gestures'
import styled from 'styled-components/native'

import { OfferStockResponse } from 'api/gen'
import { OfferStatus } from 'features/bookOffer/services/utils'
import { formatToFrenchDecimal } from 'libs/parsers'
import { ModalOverlay } from 'ui/components/modals/ModalOverlay'
import { ArrowNext } from 'ui/svg/icons/ArrowNext'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

import { monthNames, monthNamesShort, dayNames, dayNamesShort } from './Calendar.utils'
import { DayComponent } from './DayComponent'
import { MonthHeader } from './MonthHeader'
import { defaultMarking, Marking, useMarkedDates } from './useMarkedDates'

LocaleConfig.locales['fr'] = {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
}
LocaleConfig.defaultLocale = 'fr'

const renderArrow = (direction: string) => {
  if (direction === 'left') return <ArrowPrevious />
  if (direction === 'right') return <ArrowNext />
  return <React.Fragment />
}

const calendarHeaderStyle = {
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
      alignItems: 'center',
    },
  },
} as CalendarTheme

interface Props {
  stocks: OfferStockResponse[]
  userRemainingCredit: number | null
}

export const CalendarED: React.FC<Props> = ({ stocks = [], userRemainingCredit }) => {
  const markedDates = useMarkedDates(stocks, userRemainingCredit || 0)

  return (
    <RNCalendar
      firstDay={1}
      enableSwipeMonths={true}
      renderHeader={(date) => <MonthHeader date={date} />}
      hideExtraDays={true}
      renderArrow={renderArrow}
      theme={calendarHeaderStyle}
      markedDates={markedDates}
      dayComponent={({ date, marking = defaultMarking }) => {
        // problem in the definition of marking in the library:
        // see https://www.uglydirtylittlestrawberry.co.uk/posts/wix-react-native-calendar-challenges/
        const { price, status, selected } = (marking as unknown) as Marking

        return (
          <StyledView>
            <DayComponent status={status} selected={selected} date={date} />
            {typeof price === 'number' ? (
              <Typo.Caption
                color={status === OfferStatus.BOOKABLE ? ColorsEnum.PRIMARY : ColorsEnum.GREY_DARK}>
                {formatToFrenchDecimal(price).replace(' ', '')}
              </Typo.Caption>
            ) : (
              <Spacer.Column numberOfSpaces={getSpacing(1)} />
            )}
          </StyledView>
        )
      }}
    />
  )
}

export const Calendar = () => {
  const calendarRef = useRef(null)
  const markedDates = {}

  return (
    <GestureRecognizer
      onSwipe={(gestureName, gestureState) => {
        console.log('gestureName', gestureName)
        const { dx } = gestureState
        if (dx > 20) {
          calendarRef.current.addMonth(-1)
        } else if (dx < 20) {
          calendarRef.current.addMonth(1)
        }
      }}>
      <RNCalendar
        ref={calendarRef}
        firstDay={1}
        enableSwipeMonths={true}
        renderHeader={(date) => <MonthHeader date={date} />}
        hideExtraDays={true}
        renderArrow={renderArrow}
        theme={calendarHeaderStyle}
        markedDates={markedDates}
        dayComponent={({ date, marking = defaultMarking }) => {
          // problem in the definition of marking in the library:
          // see https://www.uglydirtylittlestrawberry.co.uk/posts/wix-react-native-calendar-challenges/
          const { price, status, selected } = (marking as unknown) as Marking

          return (
            <StyledView>
              <DayComponent status={status} selected={selected} date={date} />
              {typeof price === 'number' ? (
                <Typo.Caption
                  color={
                    status === OfferStatus.BOOKABLE ? ColorsEnum.PRIMARY : ColorsEnum.GREY_DARK
                  }>
                  {formatToFrenchDecimal(price).replace(' ', '')}
                </Typo.Caption>
              ) : (
                <Spacer.Column numberOfSpaces={getSpacing(1)} />
              )}
            </StyledView>
          )
        }}
      />
    </GestureRecognizer>
  )
}

const StyledView = styled(View)({ alignItems: 'center' })

export const CalendarE = () => {
  const scrollViewRef = useRef<ScrollView | null>(null)
  const visible = true

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <Modal
        animationType="slide"
        statusBarTranslucent
        transparent={true}
        visible={visible}
        testID="modal">
        <GestureRecognizer
          onSwipe={(gestureName, gestureState) => {
            console.log('gestureName', gestureName)
            const { dx } = gestureState
            if (dx > 20) {
              //   calendarRef.current.addMonth(-1)
              // } else if (dx < 20) {
              //   calendarRef.current.addMonth(1)
            }
          }}>
          <ClicAwayArea activeOpacity={1}>
            <Container activeOpacity={1}>
              <Content>
                <StyledScrollView
                  ref={scrollViewRef}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={() =>
                    scrollViewRef.current !== null && scrollViewRef.current.scrollTo({ y: 0 })
                  }>
                  <View onStartShouldSetResponder={() => true}>
                    <Calendar />
                  </View>
                </StyledScrollView>
              </Content>
            </Container>
          </ClicAwayArea>
        </GestureRecognizer>
      </Modal>
    </React.Fragment>
  )
}

const ClicAwayArea = styled(TouchableOpacity)({
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  height: '100%',
  width: '100%',
})

const Container = styled(TouchableOpacity)({
  flexDirection: 'column',
  backgroundColor: ColorsEnum.WHITE,
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  maxHeight: '85%',
  borderTopStartRadius: getSpacing(4),
  borderTopEndRadius: getSpacing(4),
  padding: getSpacing(5),
})

const Content = styled.View({
  paddingTop: getSpacing(5),
  width: '100%',
  alignItems: 'center',
  maxWidth: getSpacing(125),
})

const StyledScrollView = styled(ScrollView)({ width: '100%' })
