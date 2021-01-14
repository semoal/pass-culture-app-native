import React, { useEffect } from 'react'
import { connectStats } from 'react-instantsearch-native'
import { Platform } from 'react-native'
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust'
import styled from 'styled-components/native'

import { TAB_BAR_COMP_HEIGHT } from 'features/navigation/TabBar/TabBarComponent'
import { FilterButton } from 'features/search/atoms/FilterButton'
import { InfiniteHits } from 'features/search/components/InfiniteHits'
import { SearchHeader } from 'features/search/components/SearchHeader'
import { getSpacing, Spacer, Typo } from 'ui/theme'

import { useSearchState } from './AlgoliaWrapper'
import { SearchFilter } from './SearchFilter'

export const Search: React.FC = () => {
  const searchState = useSearchState()
  useEffect(() => {
    console.log('Search in, searchState', searchState)
    return () => {
      console.log('Search out')
    }
  }, [])

  useEffect(() => {
    // This prevents the navbar and the filter button to 'jump' above the keyboard
    // when we open the keyboard. Thus Android and iOS have the same behaviour
    if (Platform.OS === 'android') AndroidKeyboardAdjust.setAdjustNothing()
    return () => Platform.OS === 'android' && AndroidKeyboardAdjust.setAdjustResize()
  }, [])

  return (
    <Container>
      <SearchHeader />
      <NumberOfResults />
      <InfiniteHits />

      <FilterButtonContainer>
        <FilterButton />
        <Spacer.BottomScreen />
      </FilterButtonContainer>

      <VoidContainer>
        <SearchFilter />
      </VoidContainer>
    </Container>
  )
}

const Container = styled.View({ flex: 1 })
const VoidContainer = styled.View({ height: 0, width: 0, overflow: 'hidden' })
const FilterButtonContainer = styled.View({
  alignSelf: 'center',
  position: 'absolute',
  bottom: TAB_BAR_COMP_HEIGHT + getSpacing(6),
})

const NumberOfResults = connectStats(({ nbHits }) => {
  console.log('nbHits', nbHits)
  return <Typo.Body>{nbHits} results !</Typo.Body>
})
