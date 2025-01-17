import React, { memo } from 'react'
import { LayoutChangeEvent } from 'react-native'
import Svg, { Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

const ratio = 303 / 38
const viewBox = '0 0 303 38'

interface Props {
  width: number
  color?: ColorsEnum
  onLayout: (e: LayoutChangeEvent) => void
}

function TicketHeaderComponent(props: Props) {
  const height = props.width / ratio
  const color = props.color || ColorsEnum.WHITE
  const path =
    'M121.004 0c.27 16.616 13.82 30 30.496 30 16.678 0 30.229-13.386 30.496-30H283c11.046 0 20 8.954 20 20l-.001 18H0V20C0 8.954 8.954 0 20 0h101.004z'
  return (
    <Svg
      onLayout={props.onLayout}
      style={{ aspectRatio: ratio }}
      width={props.width}
      height={height}
      viewBox={viewBox}>
      <G fill="none" fillRule="evenodd">
        <G fill={color}>
          <G>
            <Path d={path} transform="translate(-36 -27) translate(36 27)" />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export const TicketHeader = memo(TicketHeaderComponent)
