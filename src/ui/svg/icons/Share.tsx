import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export function Share({ size = 32, color = ColorsEnum.BLACK, testID }: IconInterface) {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 40 40" testID={testID}>
      <Path d="M15.773 15.2c.346 0 .625.28.625.624 0 .317-.235.578-.54.62l-.085.005h-3.481c-.54 0-.983.41-1.037.936l-.005.106v11.625c0 .54.41.983.935 1.036l.107.006h15c.539 0 .983-.41 1.036-.935l.005-.107V17.491c0-.539-.41-.983-.935-1.036l-.106-.006h-3.034c-.345 0-.625-.28-.625-.625 0-.316.235-.577.54-.619l.085-.006h3.034c1.218 0 2.215.952 2.287 2.153l.004.14v11.624c0 1.219-.951 2.215-2.152 2.288l-.14.004h-15c-1.218 0-2.215-.951-2.287-2.152l-.004-.14V17.491c0-1.218.951-2.215 2.152-2.287l.14-.005h3.481zm4.065-8.532l.029.003c.024.003.049.008.073.013l.018.005c.024.007.049.015.073.025l.025.011c.05.023.097.053.14.09l.007.006.059.06 4.651 5.315c.228.26.201.655-.058.882-.237.207-.584.204-.816.006l-.066-.065-3.557-4.064v14.71c0 .345-.28.625-.625.625-.316 0-.578-.236-.619-.54l-.006-.085V8.955l-3.556 4.064c-.227.26-.622.286-.882.059-.236-.207-.28-.552-.114-.808l.055-.074 4.652-5.316.028-.03.03-.029.008-.006c.02-.017.034-.027.049-.037l-.056.043c.028-.024.057-.046.088-.064.014-.01.03-.017.045-.025s.03-.014.046-.02l.028-.011c.021-.007.043-.014.065-.019l.052-.01.039-.003h.095z" />
    </Svg>
  )
}