import React, { useEffect, useState } from 'react'
import { connectStats, connectRange } from 'react-instantsearch-native'
import { Platform } from 'react-native'
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust'
import styled from 'styled-components/native'

import { TAB_BAR_COMP_HEIGHT } from 'features/navigation/TabBar/TabBarComponent'
import { FilterButton } from 'features/search/atoms/FilterButton'
import { InfiniteHits } from 'features/search/components/InfiniteHits'
import { SearchHeader } from 'features/search/components/SearchHeader'
import { FACETS_ENUM } from 'libs/algolia/enums'
import { getSpacing, Spacer, Typo } from 'ui/theme'

import { AlgoliaWrapper, useSearchState } from './AlgoliaWrapper'
import Filters from './Filters'
import { useSearchContext } from './SearchContext'
import { SearchFilter } from './SearchFilter'
interface Props {
  currentRefinement: { min: number; max: number }
  refine: (args: { min: number; max: number }) => void
}

export const Search: React.FC<Props> = (props) => {
  // const { currentRefinement, refine } = props
  // console.log('SearchComponent :', currentRefinement, refine)

  const { searchState } = useSearchContext()
  console.log('searchState : ', searchState)
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  return (
    // <AlgoliaWrapper>
    <Container>
      <SearchHeader />
      <NumberOfResults />
      <InfiniteHits />

      <FilterButtonContainer>
        <FilterButton setIsModalOpen={() => setIsModalOpen(true)} />
        <Spacer.BottomScreen />
      </FilterButtonContainer>

      <Filters
        isModalOpen={isModalOpen}
        // searchClient={searchClient}
        // searchState={searchState}
        toggleModal={() => setIsModalOpen(false)}
        // onSearchStateChange={onSearchStateChange}
      />

      <VirtualRange attribute={FACETS_ENUM.OFFER_PRICE} />
    </Container>
    // </AlgoliaWrapper>
  )
}

const VirtualRange = connectRange(() => null)

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

// export const Search = connectRange(SearchComponent)
