import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React, { useState } from 'react'

import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'
import { BorderRadiusEnum } from 'ui/theme/grid'

interface Props {
  values?: number[]
  formatValues?: (label: number) => string
  showValues?: boolean
  min?: number
  max?: number
  step?: number
  onValuesChange?: (newValues: number[]) => void
}
const DEFAULT_MIN = 0
const DEFAULT_MAX = 100
const DEFAULT_STEP = 1
const DEFAULT_VALUES = [DEFAULT_MIN, DEFAULT_MAX]

export const Slider: React.FC<Props> = (props) => {
  const { showValues, formatValues = (s: number) => s } = props
  const [values, setValues] = useState<number[]>(props.values || DEFAULT_VALUES)

  const onValuesChange = (newValues: number[]) => {
    setValues(newValues)
    if (props.onValuesChange) props.onValuesChange(newValues)
  }

  return (
    <React.Fragment>
      {showValues && (
        <Typo.ButtonText>
          {values.length === 1 && formatValues(values[0])}
          {values.length === 2 && `${formatValues(values[0])} - ${formatValues(values[1])}`}
        </Typo.ButtonText>
      )}
      <Spacer.Column numberOfSpaces={4} />
      <MultiSlider
        values={values}
        allowOverlap={true}
        min={props.min || DEFAULT_MIN}
        max={props.max || DEFAULT_MAX}
        step={props.step || DEFAULT_STEP}
        trackStyle={trackStyle}
        selectedStyle={selectedStyle}
        unselectedStyle={unselectedStyle}
        markerStyle={markerStyle}
        pressedMarkerStyle={markerStyle}
        containerStyle={containerStyle}
        onValuesChange={onValuesChange}
      />
    </React.Fragment>
  )
}

const markerStyle = {
  height: getSpacing(7),
  width: getSpacing(7),
  borderRadius: getSpacing(7),
  borderColor: ColorsEnum.WHITE,
  backgroundColor: ColorsEnum.WHITE,
  shadowColor: ColorsEnum.BLACK,
  shadowRadius: getSpacing(1),
  shadowOpacity: 0.2,
  elevation: 4,
}

const trackStyle = { height: 15, marginTop: -7, borderRadius: BorderRadiusEnum.BUTTON }
const selectedStyle = { backgroundColor: ColorsEnum.PRIMARY }
const unselectedStyle = { backgroundColor: ColorsEnum.GREY_MEDIUM }
const containerStyle = { height: getSpacing(5) }
