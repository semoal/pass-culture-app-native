import React, { FunctionComponent, useRef } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'

import { ModalOverlay } from 'ui/components/modals/ModalOverlay'
import { IconInterface } from 'ui/svg/icons/types'
import { ColorsEnum, getSpacing } from 'ui/theme'
import { useCustomSafeInsets } from 'ui/theme/useCustomSafeInsets'

import { ModalHeader } from './ModalHeader'

interface Props {
  title: string
  visible: boolean
  leftIcon?: FunctionComponent<IconInterface>
  onLeftIconPress?: () => void
  rightIcon?: FunctionComponent<IconInterface>
  onRightIconPress?: () => void
  titleNumberOfLines?: number
  isScrollable?: boolean
}

export const AppModal: FunctionComponent<Props> = ({
  title,
  visible,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  children,
  titleNumberOfLines,
  isScrollable = false,
}) => {
  const { bottom } = useCustomSafeInsets()
  const scrollViewRef = useRef<ScrollView | null>(null)
  if (visible) {
    console.log('isScrollable', isScrollable, title)
  }

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <Modal
        statusBarTranslucent
        isVisible={visible}
        testID="modal"
        propagateSwipe={true}
        hasBackdrop={true}
        swipeDirection="left"
        onSwipeStart={() => console.log('onSwipeStart')}
        swipeThreshold={1}>
        {/* <ClicAwayArea activeOpacity={1} onPress={onRightIconPress}>
          <Container activeOpacity={1}> */}
        <ModalHeader
          title={title}
          leftIcon={leftIcon}
          onLeftIconPress={onLeftIconPress}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
          numberOfLines={titleNumberOfLines}
        />
        {/* <Content style={{ paddingBottom: bottom }}> */}
        <StyledScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current !== null && scrollViewRef.current.scrollTo({ y: 0 })
          }>
          <View onStartShouldSetResponder={() => true}>{children}</View>
        </StyledScrollView>
        {/* </Content> */}
        {/* </Container>
        </ClicAwayArea> */}
      </Modal>
    </React.Fragment>
  )
}

const ClicAwayArea = styled(TouchableOpacity)({
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  height: '100%',
  width: '100%',
})

const Container = styled(TouchableOpacity)({
  flexDirection: 'column',
  backgroundColor: ColorsEnum.WHITE,
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  maxHeight: '85%',
  borderTopStartRadius: getSpacing(4),
  borderTopEndRadius: getSpacing(4),
  padding: getSpacing(5),
})

const Content = styled.View({
  paddingTop: getSpacing(5),
  width: '100%',
  alignItems: 'center',
  maxWidth: getSpacing(125),
})

const StyledScrollView = styled(ScrollView)({ width: '100%' })
