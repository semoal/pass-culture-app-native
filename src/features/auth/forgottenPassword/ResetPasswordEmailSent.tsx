import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { openInbox } from 'react-native-email-link'
import styled from 'styled-components/native'

import { useBackNavigation } from 'features/navigation/backNavigation'
import { NavigateToHomeWithoutModalOptions, usePreviousRoute } from 'features/navigation/helpers'
import { RootStackParamList, UseNavigationType } from 'features/navigation/RootNavigator'
import { analytics } from 'libs/analytics'
import { _ } from 'libs/i18n'
import { BottomContentPage } from 'ui/components/BottomContentPage'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonTertiary } from 'ui/components/buttons/ButtonTertiary'
import { ModalHeader } from 'ui/components/modals/ModalHeader'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Close } from 'ui/svg/icons/Close'
import { Email } from 'ui/svg/icons/Email'
import { ExternalSite } from 'ui/svg/icons/ExternalSite'
import { padding, Spacer, Typo } from 'ui/theme'

import { contactSupport } from '../support.services'

type Props = StackScreenProps<RootStackParamList, 'ResetPasswordEmailSent'>

export const ResetPasswordEmailSent: FunctionComponent<Props> = ({ route }) => {
  const { navigate } = useNavigation<UseNavigationType>()
  const complexGoBack = useBackNavigation<'ResetPasswordEmailSent'>()
  const previousRoute = usePreviousRoute()
  /* Note : we have issues with previously successfully valided ReCAPTCHA not being able
  to redo the challenge, so we block the user from going back to ReCAPTCHA screen */
  const shouldBeAbleToGoBack = previousRoute?.name !== 'ForgottenPassword'

  function onClose() {
    navigate('Home', NavigateToHomeWithoutModalOptions)
  }

  function onContactSupport() {
    analytics.logContactSupportResetPasswordEmailSent()
    contactSupport.forResetPasswordEmailNotReceived(route.params.email)
  }

  return (
    <BottomContentPage>
      <ModalHeader
        title={_(t`E-mail envoyé !`)}
        leftIcon={shouldBeAbleToGoBack ? ArrowPrevious : undefined}
        onLeftIconPress={shouldBeAbleToGoBack ? complexGoBack : undefined}
        rightIcon={Close}
        onRightIconPress={onClose}
      />
      <ModalContent>
        <Description>
          <Typo.Body>{_(t`Clique sur le lien reçu à l'adresse :`)}</Typo.Body>
          <Typo.Body>{route.params.email}</Typo.Body>
          <Spacer.Column numberOfSpaces={5} />
          <CenteredText>
            <Typo.Body>
              {_(t`L'e-mail peut prendre quelques minutes à arriver. Pense à vérifier tes spams !`)}
            </Typo.Body>
          </CenteredText>
          <Spacer.Column numberOfSpaces={5} />
          <Typo.Body>{_(t`Si l'e-mail n'arrive pas, tu peux : `)}</Typo.Body>
          <ButtonTertiary
            title={_(t`Contacter le support`)}
            onPress={onContactSupport}
            icon={Email}
          />
        </Description>
        <Spacer.Column numberOfSpaces={6} />
        <ButtonPrimary
          title={_(t`Consulter mes e-mails`)}
          onPress={openInbox}
          icon={ExternalSite}
        />
      </ModalContent>
    </BottomContentPage>
  )
}

const ModalContent = styled.View({
  ...padding(4, 1),
  alignItems: 'center',
  width: '100%',
})

const Description = styled.View({
  alignItems: 'center',
})

const CenteredText = styled.Text({
  textAlign: 'center',
})
