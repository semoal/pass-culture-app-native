import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Cinéma({
  size = 192,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="20 20 142 142">
      <Path
        d="M134.192 45.413c5.868-1.572 11.9 1.91 13.472 7.778l2.07 7.728c1.573 5.868-1.91 11.9-7.777 13.472L72.5 93l70.19.005c6.144-.386 11.476 4.084 12.243 10.297L155 104l-.007 40.203c-.417 6.142-5.544 10.845-11.453 10.82l-.66-.023H126c-1.657 0-3-1.343-3-3 0-1.519 1.129-2.774 2.593-2.973L126 149l17.068.006c2.895.182 5.416-1.87 5.871-4.505L149 144l.007-39.797c-.197-2.893-2.56-5.126-5.558-5.212l-.569.009-85.948-.006c-2.895-.182-5.416 1.87-5.871 4.505L51 104l-.007 39.797c.197 2.893 2.56 5.126 5.558 5.212l.569-.009H110c1.657 0 3 1.343 3 3 0 1.519-1.129 2.774-2.593 2.973L110 155l-52.692-.006c-6.143.386-11.475-4.084-12.242-10.297L45 144l.007-40.203c.207-3.05 1.576-5.746 3.625-7.683-2.468-1.403-4.395-3.756-5.188-6.715l-2.07-7.727c-1.573-5.868 1.91-11.9 7.778-13.472zm-58.926 22l-24.561 6.582c-2.668.715-4.25 3.456-3.536 6.124l2.07 7.727c.715 2.668 3.457 4.25 6.125 3.536l6.2-1.661 13.702-22.307zm25.355-6.793l-17.607 4.718-13.703 22.306 15.513-4.157 15.797-22.867zm22.677-6.076l-15.3 4.1c-.01.332-.09.665-.244.979l-.194.332-14.784 21.402 15.23-4.08c.02-.307.1-.612.24-.902l.195-.332 14.857-21.5zm18.57.2c-.714-2.667-3.456-4.25-6.123-3.535l-4.503 1.206-15.805 22.87 24.967-6.69c2.595-.695 4.164-3.31 3.588-5.907l-.053-.216z"
        transform="translate(-131 -278) translate(131 278)"
      />
    </Svg>
  )
}
