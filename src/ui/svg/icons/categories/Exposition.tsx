import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Exposition({
  size = 192,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="20 20 142 142">
      <Path
        d="M94.1 37.678c.982-.803 2.347-.893 3.414-.268l.385.267 16 13.08c1.283 1.049 1.472 2.939.424 4.222-.954 1.166-2.602 1.429-3.858.679l-.364-.255L96 43.872 60.4 73h71.192l-9.49-7.757c-1.167-.954-1.43-2.602-.68-3.858l.255-.364c.954-1.166 2.602-1.429 3.858-.679l.364.255 16 13.08c2.074 1.696 1.039 4.974-1.488 5.297L140 79H52c-2.678 0-3.952-3.192-2.201-5.042l.301-.28 44-36zM132 81c1.519 0 2.774 1.129 2.973 2.593L135 84v48c0 .479-.112.931-.311 1.333C139.464 134.53 143 138.853 143 144c0 6.075-4.925 11-11 11H60c-6.075 0-11-4.925-11-11 0-5.148 3.536-9.47 8.311-10.669-.142-.285-.24-.596-.284-.924L57 132V84c0-1.657 1.343-3 3-3 1.519 0 2.774 1.129 2.973 2.593L63 84v48c0 .351-.06.688-.171 1l18.342.001c-.067-.19-.116-.389-.144-.594L81 132V84c0-1.657 1.343-3 3-3 1.519 0 2.774 1.129 2.973 2.593L87 84v48c0 .351-.06.688-.171 1l18.342.001c-.067-.19-.116-.389-.144-.594L105 132V84c0-1.657 1.343-3 3-3 1.519 0 2.774 1.129 2.973 2.593L111 84v48c0 .351-.06.688-.171 1l18.342.001c-.067-.19-.116-.389-.144-.594L129 132V84c0-1.657 1.343-3 3-3zm0 58H60c-2.761 0-5 2.239-5 5s2.239 5 5 5h72c2.761 0 5-2.239 5-5s-2.239-5-5-5zM96 56c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"
        transform="translate(-423 -278) translate(423 278)"
      />
    </Svg>
  )
}
