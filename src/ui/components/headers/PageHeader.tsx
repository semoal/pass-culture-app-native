import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { ColorsEnum, Spacer, Typo } from 'ui/theme'

interface Props {
  title: string
  rightComponent?: Element
  rightComponentWidth?: number
}

const renderHeaderIconBack = (onPress: () => void) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <ArrowPrevious color={ColorsEnum.WHITE} testID="icon-back" />
    </TouchableOpacity>
  )
}

export const PageHeader: React.FC<Props> = (props) => {
  const { title, rightComponent, rightComponentWidth } = props
  const { goBack } = useNavigation()
  const spaceToAddBeforeTitle = rightComponentWidth ? rightComponentWidth / 6 : 0

  return (
    <HeaderContainer>
      <Spacer.TopScreen />
      <Spacer.Column numberOfSpaces={2} />
      <Row>
        <Spacer.Row numberOfSpaces={5} />
        {renderHeaderIconBack(goBack)}
        <Spacer.Row numberOfSpaces={spaceToAddBeforeTitle} />
        <Spacer.Flex />
        <Title>
          <Typo.Body color={ColorsEnum.WHITE}>{title}</Typo.Body>
        </Title>
        <Spacer.Flex />
        {rightComponent}
        {!rightComponent && <Spacer.Row numberOfSpaces={10} />}
        <Spacer.Row numberOfSpaces={6} />
      </Row>
      <Spacer.Column numberOfSpaces={2} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View({
  position: 'absolute',
  top: 0,
  width: '100%',
  backgroundColor: ColorsEnum.PRIMARY,
})

const Title = styled.Text.attrs({ numberOfLines: 2 })({
  flexShrink: 1,
  textAlign: 'center',
})

const Row = styled.View({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
})
