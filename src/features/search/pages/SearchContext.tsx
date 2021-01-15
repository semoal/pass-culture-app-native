import React, { useState, useContext } from 'react'

export interface ISearchContext {
  searchState: Object | undefined
  setSearchState: ((searchState: Object | undefined) => void) | null
}

const SearchContext = React.createContext<ISearchContext>({
  searchState: {},
  setSearchState: null,
})

export function useSearchContext(): ISearchContext {
  return useContext(SearchContext)
}

export const SearchWrapper = ({ children }: { children: Element }) => {
  const [searchState, setSearchState] = useState<Object>({})

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  )
}
