import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Conference({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="20 20 142 142">
      <Path d="M116.054 48.636c1.143 1.2 1.099 3.098-.1 4.242-1.2 1.143-3.098 1.099-4.242-.1-5.525-5.792-13.773-8.105-21.505-6.029-6.667 1.79-12.032 6.597-14.59 12.877l31.723 8.503c1.6.43 2.55 2.075 2.12 3.675-.393 1.467-1.808 2.387-3.273 2.2l-.4-.08-31.65-8.484c-.716 6.365 1.4 12.754 5.814 17.44l22.88 6.131c7.102-2.175 12.677-7.84 14.68-15.103.95-3.433 1.022-7.05.21-10.518-.377-1.613.625-3.227 2.239-3.604 1.613-.377 3.227.625 3.604 2.238 1.04 4.446.947 9.082-.269 13.48-2.705 9.807-10.522 17.329-20.351 19.693l-13.225 38.289c-1.62 4.693-6.384 7.46-11.156 6.663l-3.375 13.106c-.413 1.605-2.049 2.57-3.653 2.157-1.47-.378-2.405-1.784-2.232-3.252l.075-.401 3.6-13.984c-2.824-2.316-4.28-6.062-3.523-9.824l7.475-39.622-.128-.119c-7.307-6.856-10.38-17.12-8.02-26.882 2.397-9.915 10.018-17.729 19.87-20.374 9.851-2.645 20.36.302 27.402 7.682zM82.747 89.84l-7.403 39.26c-.425 2.113.836 4.202 2.816 4.785l.954.25c2.074.566 4.232-.573 4.933-2.606L97.115 93.69 82.747 89.84zm5.071 9.85c1.467.392 2.388 1.807 2.202 3.273l-.079.4-1.84 6.88c-.428 1.6-2.072 2.551-3.673 2.123-1.467-.392-2.388-1.807-2.202-3.273l.079-.4 1.84-6.88c.428-1.6 2.072-2.551 3.673-2.123z" />
    </Svg>
  )
}