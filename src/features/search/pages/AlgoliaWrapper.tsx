import algoliasearch from 'algoliasearch'
import React, { useContext, useRef, useState } from 'react'
import { Configure, InstantSearch } from 'react-instantsearch-native'

import { useSearchContext } from 'features/search/pages/SearchContext'
import { env } from 'libs/environment'

const DEBOUNCE_TIME = 400

const searchClient = algoliasearch(env.ALGOLIA_APPLICATION_ID, env.ALGOLIA_SEARCH_API_KEY)

export const AlgoliaWrapper = ({ children }: { children: Element }) => {
  // const [searchState, setSearchState] = useState<Object>({})
  const { searchState, setSearchState } = useSearchContext()
  // const searchStateRef = useRef<Object>({})
  // const [debouncedSetState, setDebouncedSetState] = useState<NodeJS.Timeout>()

  const onSearchStateChange = (updatedSearchState: Object) => {
    console.log('onSearchStateChange', updatedSearchState)
    setSearchState(updatedSearchState)
    // searchStateRef.current = updatedSearchState
  }

  // const onSearchStateChangeDebounced = (updatedSearchState: Object) => {
  //   if (debouncedSetState) clearTimeout(debouncedSetState)

  //   const timer = setTimeout(() => {
  //     setSearchState({ ...searchStateRef.current, ...updatedSearchState })
  //   }, DEBOUNCE_TIME)

  //   setDebouncedSetState(timer)
  //   console.log(
  //     'Setting search state from',
  //     JSON.stringify(searchStateRef.current),
  //     'to',
  //     JSON.stringify(updatedSearchState)
  //   )
  //   searchStateRef.current = { ...searchStateRef.current, ...updatedSearchState }
  // }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={env.ALGOLIA_INDEX_NAME}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}>
      <Configure hitsPerPage={20} />
      {children}
    </InstantSearch>
  )
}

// export function useSearchState(): ISearchContext['searchState'] | null {
//   const searchContext = useContext(SearchContext)
//   if (!searchContext) return null
//   return { searchState: searchContext.searchState, setSearchState: searchContext.setSearchState }
// }

// A tester => modifier les filtres depuis la page Search
