import { SearchResponse } from '@algolia/client-search'
import algoliasearch from 'algoliasearch'

import { env } from 'libs/environment'

import { RADIUS_FILTERS } from '../enums'
import { FetchAlgoliaParameters } from '../types'

import { buildFacetFilters } from './fetchAlgolia.facetFilters'
import { buildNumericFilters } from './fetchAlgolia.numericFilters'

export const fetchAlgolia = <T>({
  aroundRadius = RADIUS_FILTERS.DEFAULT_RADIUS_IN_KILOMETERS,
  beginningDatetime = null,
  date = null,
  endingDatetime = null,
  geolocation = null,
  hitsPerPage = null,
  keywords = '',
  offerCategories = [],
  offerIsDuo = false,
  offerIsFree = false,
  offerIsNew = false,
  offerTypes = {
    isDigital: false,
    isEvent: false,
    isThing: false,
  },
  page = 0,
  priceRange = null,
  sortBy = '',
  searchAround = false,
  timeRange = null,
  tags = [],
}: FetchAlgoliaParameters): Readonly<Promise<SearchResponse<T>>> => {
  const searchParameters = {
    page,
    ...buildFacetFilters({ offerCategories, offerTypes, offerIsDuo, tags }),
    ...buildNumericFilters({
      beginningDatetime,
      date,
      endingDatetime,
      offerIsFree,
      offerIsNew,
      priceRange,
      timeRange,
    }),
    ...buildGeolocationParameter({ aroundRadius, geolocation, searchAround }),
    ...buildHitsPerPage(hitsPerPage),
  }
  const client = algoliasearch(env.ALGOLIA_APPLICATION_ID, env.ALGOLIA_SEARCH_API_KEY)
  const index = client.initIndex(env.ALGOLIA_INDEX_NAME + sortBy)

  return index.search<T>(keywords, searchParameters)
}

const buildHitsPerPage = (hitsPerPage: FetchAlgoliaParameters['hitsPerPage']) =>
  hitsPerPage ? { hitsPerPage } : null

const buildGeolocationParameter = ({
  aroundRadius,
  geolocation,
  searchAround,
}: Pick<FetchAlgoliaParameters, 'aroundRadius' | 'geolocation' | 'searchAround'>):
  | {
      aroundLatLng: string
      aroundRadius: 'all' | number
    }
  | undefined => {
  if (geolocation) {
    const { longitude, latitude } = geolocation
    if (latitude && longitude) {
      const aroundRadiusInMeters = computeRadiusInMeters(aroundRadius, searchAround)
      const radiusIsPositive = aroundRadiusInMeters > 0

      return {
        aroundLatLng: `${latitude}, ${longitude}`,
        aroundRadius:
          searchAround && radiusIsPositive ? aroundRadiusInMeters : RADIUS_FILTERS.UNLIMITED_RADIUS,
      }
    }
  }
  return undefined
}

const computeRadiusInMeters = (aroundRadius: number | null, searchAround: boolean): number => {
  if (searchAround && aroundRadius === 0) {
    return RADIUS_FILTERS.RADIUS_IN_METERS_FOR_NO_OFFERS
  }
  if (aroundRadius === null) {
    return -1
  }
  return aroundRadius * 1000
}