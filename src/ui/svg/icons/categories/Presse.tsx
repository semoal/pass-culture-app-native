import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Presse({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="20 20 142 142">
      <Path d="M113.048 37c5.848 0 10.633 4.569 10.98 10.33l.02.67v94.904c0 3.32 2.72 6.147 5.763 6.042 4.428-.156 6.904-2.21 7.166-5.416l.023-.578V95.276c0-1.657 1.343-3 3-3 1.519 0 2.774 1.129 2.973 2.593l.027.407v47.676c0 5.7-3.515 9.942-9.077 11.426l-.151.034-.258.178c-.333.196-.708.328-1.107.383L132 155H60c-5.848 0-10.633-4.569-10.98-10.33L49 144V48c0-5.848 4.569-10.633 10.33-10.98L60 37h53.048zm0 6H60c-2.587 0-4.718 1.97-4.974 4.49L55 48v96c0 2.587 1.97 4.718 4.49 4.974L60 149h59.692l-.104-.178c-.87-1.568-1.41-3.343-1.52-5.213l-.02-.705V48c0-2.587-1.97-4.718-4.49-4.974l-.51-.026zM102 100.27c1.657 0 3 1.343 3 3 0 1.518-1.129 2.774-2.593 2.972l-.407.028H70c-1.657 0-3-1.344-3-3 0-1.52 1.129-2.774 2.593-2.973l.407-.027h32zm0-17.88c1.657 0 3 1.344 3 3 0 1.52-1.129 2.775-2.593 2.973l-.407.028H70c-1.657 0-3-1.343-3-3 0-1.519 1.129-2.774 2.593-2.973l.407-.027h32zm0-17.878c1.657 0 3 1.343 3 3 0 1.518-1.129 2.774-2.593 2.972l-.407.028H70c-1.657 0-3-1.344-3-3 0-1.52 1.129-2.774 2.593-2.973l.407-.027h32z" />
    </Svg>
  )
}