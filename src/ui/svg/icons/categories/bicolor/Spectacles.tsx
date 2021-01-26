import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'

import { BicolorIconInterface } from 'ui/svg/icons/types'
import { ColorsEnum } from 'ui/theme'

export function Spectacles({
  size = 32,
  color = ColorsEnum.PRIMARY,
  color2,
  testID,
}: BicolorIconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID}>
      <Defs>
        <LinearGradient id="bobnkuz4na" x1="13.556%" x2="86.444%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color ?? ColorsEnum.PRIMARY} />
          <Stop offset="100%" stopColor={color2 ?? color ?? ColorsEnum.SECONDARY} />
        </LinearGradient>
      </Defs>
      <G fill="none" fill-rule="evenodd" opacity=".9">
        <G fill="url(#bobnkuz4na)">
          <Path d="M17.075 18.25c.845-.017 1.581.572 1.738 1.349.27.973 1.157 1.646 2.167 1.646 1.01 0 1.896-.673 2.155-1.595.169-.828.905-1.417 1.735-1.4H27c1.519 0 2.75 1.231 2.75 2.75v15c0 1.519-1.231 2.75-2.75 2.75h-2.185c-.79-.027-1.464-.579-1.64-1.328-.261-.987-1.154-1.674-2.175-1.674-1.02 0-1.914.687-2.17 1.654-.181.77-.855 1.321-1.67 1.348H15c-1.519 0-2.75-1.231-2.75-2.75V21c0-1.519 1.231-2.75 2.75-2.75zm7.78 1.5c-.12-.003-.226.082-.262.251l-.06.192c-.51 1.518-1.937 2.552-3.553 2.552-1.684 0-3.16-1.122-3.625-2.795-.024-.118-.13-.203-.265-.2H15c-.69 0-1.25.56-1.25 1.25v15c0 .69.56 1.25 1.25 1.25h2.135c.113-.003.21-.082.24-.212.436-1.645 1.924-2.79 3.625-2.79s3.19 1.145 3.63 2.81c.026.11.122.189.21.192H27c.69 0 1.25-.56 1.25-1.25V21c0-.69-.56-1.25-1.25-1.25zm-3.126-8.467l.207.05 2.133.547c.773.224 1.292.946 1.26 1.696.033 1.001.724 1.86 1.703 2.109.998.264 2.051-.161 2.573-1.02.35-.63 1.05-.977 1.778-.879l.156.028 2.13.555c.708.164 1.32.608 1.694 1.231.34.567.458 1.237.334 1.887l-.044.194-3.28 11.78c-.112.4-.525.633-.924.522-.366-.102-.593-.458-.542-.824l.02-.1 3.279-11.773c.082-.31.036-.639-.129-.913-.141-.235-.36-.413-.628-.507l-.138-.04-2.123-.554c-.108-.024-.219.026-.287.147-.88 1.451-2.611 2.15-4.246 1.718-1.618-.411-2.77-1.843-2.824-3.567.003-.092-.044-.176-.107-.22l-.05-.023-2.132-.546c-.32-.093-.664-.054-.955.108-.249.139-.442.358-.546.607l-.044.127-.77 3.06c-.1.402-.508.645-.91.544-.368-.092-.604-.443-.563-.81l.019-.1.775-3.08c.198-.705.67-1.302 1.31-1.658.576-.321 1.246-.423 1.871-.296zM25 25.75c.414 0 .75.336.75.75 0 .38-.282.693-.648.743L25 27.25h-8c-.414 0-.75-.336-.75-.75 0-.38.282-.693.648-.743L17 25.75h8z" />
        </G>
      </G>
    </Svg>
  )
}