import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export function Favorite({ size = 32, color = ColorsEnum.BLACK, testID }: IconInterface) {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 40 40" testID={testID}>
      <Path d="M25.562 10.208c3.363 0 6.09 2.726 6.09 6.09 0 .721-.126 1.427-.373 2.103-.793 2.042-1.934 3.93-3.368 5.58-.226.261-.621.289-.882.063-.26-.227-.288-.622-.062-.882 1.34-1.543 2.406-3.306 3.142-5.202.193-.528.293-1.088.293-1.663 0-2.672-2.167-4.839-4.84-4.839-2.674 0-4.84 2.167-4.84 4.84 0 .833-1.25.833-1.25 0 0-2.674-2.166-4.84-4.84-4.84-2.673 0-4.84 2.167-4.84 4.84 0 .574.1 1.134.289 1.65 1.769 4.558 5.362 8.2 9.867 10.023l.145.056.252-.098c.934-.385 1.834-.85 2.69-1.39l.424-.276c.287-.193.675-.116.867.17.193.287.116.675-.17.868-1.2.805-2.488 1.472-3.838 1.983-.111.042-.231.051-.346.028l-.086-.024-.047-.017c-5-1.909-8.985-5.875-10.928-10.881-.243-.665-.37-1.37-.37-2.093 0-3.363 2.728-6.089 6.091-6.089 2.355 0 4.397 1.336 5.41 3.29l.055.11.054-.109c.985-1.9 2.94-3.214 5.21-3.287l.2-.004z" />
    </Svg>
  )
}