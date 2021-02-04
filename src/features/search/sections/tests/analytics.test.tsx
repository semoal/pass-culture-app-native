import { fireEvent, render } from '@testing-library/react-native'
import mockdate from 'mockdate'
import React from 'react'
import { ReactTestInstance } from 'react-test-renderer'

import { initialSearchState } from 'features/search/pages/reducer'
import Section from 'features/search/sections'
import { CATEGORY_CRITERIA, DATE_FILTER_OPTIONS } from 'libs/algolia/enums'
import { analytics } from 'libs/analytics'

import { SectionTitle } from '../titles'

const Today = new Date(2020, 10, 1)
const mockSearchState = initialSearchState
const mockDispatch = jest.fn()
jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockDispatch,
  }),
}))

jest.mock('features/search/components', () => ({
  CalendarPicker: ({ visible }: { visible: boolean }) =>
    visible ? 'CalendarPicker' : 'NoCalendar',
}))

describe('Analytics - logUseFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockdate.set(Today)
    expect(analytics.logUseFilter).not.toBeCalled()
  })
  it('should log UseFilter for selecting a new Location', () => {
    fireEvent.press(render(<Section.Location />).getByTestId('changeLocation'))
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Location)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter for sliding the radius', () => {
    const { getByTestId } = render(<Section.Radius />)
    const slider = getByTestId('slider').children[0] as ReactTestInstance
    slider.props.onValuesChange([50])
    slider.props.onValuesChange([23])
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Radius)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when selecting multiple categories', () => {
    const { getByText } = render(<Section.Category />)
    fireEvent.press(getByText(CATEGORY_CRITERIA.CINEMA.label))
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Category)
    fireEvent.press(getByText(CATEGORY_CRITERIA.JEUX_VIDEO.label))
    fireEvent.press(getByText(CATEGORY_CRITERIA.PRESSE.label))
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })
  it('should log UseFilter once when selecting multiple offer types', () => {
    const { getByText } = render(<Section.OfferType />)
    fireEvent.press(getByText('Offre numérique'))
    fireEvent.press(getByText('Offre physique'))
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.OfferType)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })
  it('should log UseFilter once when sliding the price', () => {
    const { getByTestId } = render(<Section.Price />)
    const slider = getByTestId('slider').children[0] as ReactTestInstance
    slider.props.onValuesChange([20, 300])
    slider.props.onValuesChange([20, 30])
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Price)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when changing free offer', () => {
    const { getByTestId } = render(<Section.FreeOffer />)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', true)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', false)
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Free)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when changing duo offer', () => {
    const { getByTestId } = render(<Section.DuoOffer />)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', true)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', false)
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Duo)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when changing new offer', () => {
    const { getByTestId } = render(<Section.NewOffer />)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', true)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', false)
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.New)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when changing date filter', () => {
    const { getByTestId } = render(<Section.Date />)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', true)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', false)
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Date)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when changing OfferDate filter', () => {
    mockSearchState.date = { option: DATE_FILTER_OPTIONS.TODAY, selectedDate: Today }
    const { getByText } = render(<Section.OfferDate />)
    fireEvent.press(getByText('Cette semaine'))
    fireEvent.press(getByText('Ce week-end'))
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.OfferDate)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })
  it('should log UseFilter once when changing hour filter', () => {
    const { getByTestId } = render(<Section.Hour />)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', true)
    fireEvent(getByTestId('filterSwitch'), 'onValueChange', false)
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Hour)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once when sliding the time range', () => {
    const { getByTestId } = render(<Section.TimeSlot />)
    const slider = getByTestId('slider').children[0] as ReactTestInstance
    slider.props.onValuesChange([8, 21])
    slider.props.onValuesChange([18, 21])
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.TimeSlot)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(1)
  })

  it('should log UseFilter once for each changed filter', () => {
    const { getByTestId } = render(<Section.TimeSlot />)
    const slider = getByTestId('slider').children[0] as ReactTestInstance
    const hourSwitch = render(<Section.Hour />).getByTestId('filterSwitch')

    fireEvent(hourSwitch, 'onValueChange', true)
    fireEvent(hourSwitch, 'onValueChange', false)

    slider.props.onValuesChange([8, 21])
    slider.props.onValuesChange([18, 21])

    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.Hour)
    expect(analytics.logUseFilter).toHaveBeenCalledWith(SectionTitle.TimeSlot)
    expect(analytics.logUseFilter).toHaveBeenCalledTimes(2)
  })
})