import { useEffect, useState } from 'react'
import { useIsFetching } from 'react-query'

import { DEFAULT_SPLASHSCREEN_DELAY } from 'libs/splashscreen'

export const ANIMATION_DELAY = 700 // Time for the skeleton animation to finish

export const useShowSkeleton = function () {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const isFetchingHomepageModules = useIsFetching({ queryKey: 'homepageModules' })
  const isFetchingAlgoliaModules = useIsFetching({ queryKey: 'algoliaModule' })
  const isFetchingOfferIds = useIsFetching({ queryKey: 'recommendationOfferIds' })
  const isFetchingRecommendedHits = useIsFetching({ queryKey: 'recommendationHits' })

  useEffect(() => {
    if (
      isFetchingAlgoliaModules === 0 &&
      isFetchingHomepageModules === 0 &&
      isFetchingOfferIds === 0 &&
      isFetchingRecommendedHits === 0
    ) {
      // minimum delay so that the tiles images are loaded
      setTimeout(() => setShowSkeleton(false), ANIMATION_DELAY + DEFAULT_SPLASHSCREEN_DELAY)
    }
  }, [
    isFetchingAlgoliaModules,
    isFetchingHomepageModules,
    isFetchingOfferIds,
    isFetchingRecommendedHits,
  ])

  return showSkeleton
}
