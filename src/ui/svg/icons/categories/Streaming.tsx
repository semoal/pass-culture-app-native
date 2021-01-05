import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Streaming({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="20 20 142 142">
      <Path d="M135 49l.019.001 5.095.001c6 .228 10.736 5.088 10.889 10.92L151 92c0 1.657-1.343 3-3 3-1.519 0-2.774-1.129-2.973-2.593L145 92l.001-21H47.005l-.006 50H145v-13c0-1.657 1.343-3 3-3 1.519 0 2.774 1.129 2.973 2.593L151 108v16l-.001.041v7.256c.206 6.002-4.3 11.076-10.3 11.656L140 143h-12l-.016-.001H96.051L96 143l-.053-.002-31.87.001L64 143l-.078-.003H51.886c-6-.227-10.736-5.087-10.889-10.92L41 68.021V68l.001-.021v-7.276c-.206-6.002 4.3-11.076 10.3-11.656L52 49h83zm10 78h-14v10.002h8.886c2.757-.104 4.945-2.289 5.108-5.073l.006-.529V127zm-20 0H99v10.001l26 .001V127zm-32 0H67v10l26 .001V127zm-32 0H46.999v4.503c-.095 2.746 1.91 5.079 4.48 5.45L52 137h9v-10zm26-47c.52.001 1.03.139 1.48.4l22.04 12.96c.907.571 1.457 1.568 1.457 2.64s-.55 2.069-1.457 2.64L88.48 111.6c-.45.261-.96.399-1.48.4-1.663-.022-3-1.377-3-3.04V83.04c0-1.663 1.337-3.018 3-3.04zM61 54.997h-8.886c-2.757.105-4.945 2.29-5.108 5.074L47.005 65H61V54.997zm6 .001V65h26V54.999l-26-.001zm32 .001V65h26V55l-26-.001zM140 55h-9v10h14.001v-4.503c.095-2.746-1.91-5.079-4.48-5.45L140 55z" />
    </Svg>
  )
}
