import algoliasearch from 'algoliasearch'
import React, { useContext, useRef, useState } from 'react'
import { Configure, InstantSearch } from 'react-instantsearch-native'

import { env } from 'libs/environment'

const DEBOUNCE_TIME = 400

export interface ISearchContext {
  searchState: object | undefined
}

export const SearchContext = React.createContext<ISearchContext>({ searchState: {} })

const searchClient = algoliasearch(env.ALGOLIA_APPLICATION_ID, env.ALGOLIA_SEARCH_API_KEY)

export const AlgoliaWrapper = ({ children }: { children: Element }) => {
  const [searchState, setSearchState] = useState<object>({})
  const searchStateRef = useRef<object>({})
  const [debouncedSetState, setDebouncedSetState] = useState<NodeJS.Timeout>()

  const onSearchStateChange = (updatedSearchState: object) => {
    console.log('onSearchStateChange', searchStateRef.current, 'to', updatedSearchState)
    setSearchState(updatedSearchState)
    searchStateRef.current = updatedSearchState
  }

  const onSearchStateChangeDebounced = (updatedSearchState: object) => {
    if (debouncedSetState) clearTimeout(debouncedSetState)

    const timer = setTimeout(() => {
      setSearchState({ ...searchStateRef.current, ...updatedSearchState })
    }, DEBOUNCE_TIME)

    setDebouncedSetState(timer)
    console.log(
      'Setting search state from',
      JSON.stringify(searchStateRef.current),
      'to',
      JSON.stringify(updatedSearchState)
    )
    searchStateRef.current = { ...searchStateRef.current, ...updatedSearchState }
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={env.ALGOLIA_INDEX_NAME}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}>
      <SearchContext.Provider value={{ searchState }}>
        <Configure hitsPerPage={20} />
        {children}
      </SearchContext.Provider>
    </InstantSearch>
  )
}

export function useSearchState(): ISearchContext['searchState'] | null {
  const searchContext = useContext(SearchContext)
  if (!searchContext) return null
  return searchContext.searchState
}
