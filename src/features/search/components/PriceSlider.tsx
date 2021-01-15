import { t } from '@lingui/macro'
import React, { useEffect } from 'react'
import { connectRange } from 'react-instantsearch-native'

import { _ } from 'libs/i18n'
import { Slider } from 'ui/components/inputs/Slider'

import { CenteredSection } from '../atoms/Sections'

const MAX_PRICE = 300
const formatEuro = (price: number) => `${price} €`

interface Props {
  attribute: any
  currentRefinement: { min: number; max: number }
  min: number
  max: number
  precision: number
  refine: (args: { min: number; max: number }) => void
}

const PriceSliderComponent: React.FC<Props> = (props) => {
  const { currentRefinement, refine } = props
  console.log('PriceSliderComponent :', currentRefinement, refine)

  useEffect(() => {
    console.log('PriceSliderComponent in')
    return () => {
      console.log('PriceSliderComponent out')
    }
  }, [])
  return (
    <CenteredSection title={_(t`Prix`)}>
      <Slider
        showValues={true}
        values={[currentRefinement.min || 0, currentRefinement.max || MAX_PRICE]}
        max={MAX_PRICE}
        formatValues={formatEuro}
        onValuesChange={(newValues) => {
          refine({ min: newValues[0], max: newValues[1] })
        }}
      />
    </CenteredSection>
  )
}

export const PriceSlider = connectRange(PriceSliderComponent)
//==> modifie data algolia mais pas le contexte
