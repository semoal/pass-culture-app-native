import { t } from '@lingui/macro'
import React from 'react'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'

import { RadiusSlider, PriceSlider } from 'features/search/components'
import { FACETS_ENUM } from 'libs/algolia/enums'
import { _ } from 'libs/i18n'
import { PageHeader } from 'ui/components/headers/PageHeader'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

const rightButton = (onLayout: (event: LayoutChangeEvent) => void): JSX.Element => {
  return (
    <Typo.ButtonText onLayout={onLayout} color={ColorsEnum.WHITE}>
      {_(t`Réinitialiser`)}
    </Typo.ButtonText>
  )
}

export const SearchFilter: React.FC = () => (
  <React.Fragment>
    <React.Fragment>
      <Container>
        <Spacer.TopScreen />
        <Spacer.Column numberOfSpaces={16} />
        <RadiusSlider />
        <Separator />
        <PriceSlider attribute={FACETS_ENUM.OFFER_PRICE} />
      </Container>
    </React.Fragment>
    <PageHeader title={_(t`Filtrer`)} rightComponent={rightButton} />
  </React.Fragment>
)

const Container = styled.ScrollView({ flex: 1, marginHorizontal: getSpacing(6) })
const Separator = styled.View({
  width: '100%',
  height: 2,
  backgroundColor: ColorsEnum.GREY_LIGHT,
  marginVertical: getSpacing(6),
  alignSelf: 'center',
})
