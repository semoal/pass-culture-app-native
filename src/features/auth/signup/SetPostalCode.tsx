import { t } from '@lingui/macro'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FunctionComponent, useRef, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import styled from 'styled-components/native'

import { QuitSignupModal, SignupSteps } from 'features/auth/signup/QuitSignupModal'
import { RootStackParamList, UseNavigationType } from 'features/navigation/RootNavigator'
import { _ } from 'libs/i18n'
import { BottomContentPage } from 'ui/components/BottomContentPage'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { InputError } from 'ui/components/inputs/InputError'
import { TextInput } from 'ui/components/inputs/TextInput'
import { ModalHeader } from 'ui/components/modals/ModalHeader'
import { useModal } from 'ui/components/modals/useModal'
import { StepDots } from 'ui/components/StepDots'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Close } from 'ui/svg/icons/Close'
import { getSpacing, Spacer, Typo } from 'ui/theme'

type Props = StackScreenProps<RootStackParamList, 'SetPostalCode'>

export const SetPostalCode: FunctionComponent<Props> = ({ route }) => {
  const [postalCode, setPostalCode] = useState('')
  const [hasError, setHasError] = useState(false)

  const { navigate, goBack } = useNavigation<UseNavigationType>()
  const postalCodeInput = useRef<RNTextInput | null>(null)
  useNavigationState((state) => state.routes.forEach((route) => console.log(route)))

  const {
    visible: fullPageModalVisible,
    showModal: showFullPageModal,
    hideModal: hideFullPageModal,
  } = useModal(false)

  const email = route.params.email
  const isNewsletterChecked = route.params.isNewsletterChecked
  const password = route.params.password
  const birthday = route.params.birthday

  const isPostalCodeCorrect = postalCode.length === 5 ? true : false

  function onChangePostalCode(postalCode: string) {
    if (hasError) {
      setHasError(false)
    }
    setPostalCode(postalCode)
  }

  function goToCguAcceptance() {
    console.log('navigue')
    navigate('AcceptCgu', { email, isNewsletterChecked, password, birthday, postalCode })
  }

  function showQuitSignupModal() {
    postalCodeInput.current && postalCodeInput.current.blur()
    showFullPageModal()
  }

  return (
    <React.Fragment>
      <BottomContentPage>
        <ModalHeader
          title={_(t`Code Postal`)}
          leftIcon={ArrowPrevious}
          onLeftIconPress={goBack}
          rightIcon={Close}
          onRightIconPress={showQuitSignupModal}
        />
        <ModalContent>
          <Paragraphe>
            <Typo.Body>
              {_(
                t`Cette information nous permet de déterminer si ton département est éligible à l’aide financière pass Culture.`
              )}
            </Typo.Body>
          </Paragraphe>
          <Spacer.Column numberOfSpaces={6} />

          <StyledInput>
            <Typo.Body>{_(t`Ton code postal`)}</Typo.Body>
            <Spacer.Column numberOfSpaces={2} />
            <TextInput
              autoCapitalize="none"
              autoFocus={true}
              keyboardType="number-pad"
              onChangeText={onChangePostalCode}
              placeholder={_(/*i18n: postalCode placeholder */ t`Ex: 35000`)}
              ref={postalCodeInput}
              textContentType="postalCode"
              value={postalCode}
              maxLength={5}
            />
            <InputError
              visible={hasError}
              messageId="Code postal introuvable"
              numberOfSpacesTop={1}
            />
          </StyledInput>

          <Spacer.Column numberOfSpaces={10} />
          <ButtonPrimary
            title={_(t`Continuer`)}
            onPress={goToCguAcceptance}
            isLoading={false}
            disabled={!isPostalCodeCorrect}
          />
          <Spacer.Column numberOfSpaces={5} />
          <StepDots numberOfSteps={5} currentStep={4} />
        </ModalContent>
      </BottomContentPage>
      <QuitSignupModal
        visible={fullPageModalVisible}
        resume={hideFullPageModal}
        testIdSuffix="postalCode-quit-signup"
        signupStep={SignupSteps.PostalCode}
      />
    </React.Fragment>
  )
}

const ModalContent = styled.View({
  paddingTop: getSpacing(7),
  alignItems: 'center',
  width: '100%',
  maxWidth: getSpacing(125),
})

const StyledInput = styled.View({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
})

const Paragraphe = styled.Text({
  flexWrap: 'wrap',
  flexShrink: 1,
  textAlign: 'center',
})
