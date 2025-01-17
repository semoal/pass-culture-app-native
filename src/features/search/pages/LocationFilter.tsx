import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import debounce from 'lodash.debounce'
import React, { useRef } from 'react'
import { ScrollView, ViewStyle, Linking } from 'react-native'
import styled from 'styled-components/native'

import { UseNavigationType } from 'features/navigation/RootNavigator'
import { LocationChoice } from 'features/search/components/LocationChoice'
import { useStagedSearch } from 'features/search/pages/SearchWrapper'
import { LocationType } from 'libs/algolia'
import { useGeolocation, GeolocPermissionState } from 'libs/geolocation'
import { GeolocationActivationModal } from 'libs/geolocation/components/GeolocationActivationModal'
import { _ } from 'libs/i18n'
import { Banner } from 'ui/components/Banner'
import { PageHeader } from 'ui/components/headers/PageHeader'
import { useModal } from 'ui/components/modals/useModal'
import { getSpacing, Spacer } from 'ui/theme'

const DEBOUNCED_CALLBACK = 500

export const LocationFilter: React.FC = () => {
  const { navigate, goBack } = useNavigation<UseNavigationType>()
  const { position, permissionState, requestGeolocPermission } = useGeolocation()
  const { dispatch } = useStagedSearch()
  const debouncedGoBack = useRef(debounce(goBack, DEBOUNCED_CALLBACK)).current
  const {
    visible: isGeolocPermissionModalVisible,
    showModal: showGeolocPermissionModal,
    hideModal: hideGeolocPermissionModal,
  } = useModal(false)

  const onPressPickPlace = () => {
    if (debouncedGoBack) debouncedGoBack.cancel()
    navigate('LocationPicker')
  }

  const onPressAroundMe = async () => {
    if (position === null) {
      const shouldDisplayCustomGeolocRequest =
        permissionState === GeolocPermissionState.NEVER_ASK_AGAIN
      if (shouldDisplayCustomGeolocRequest) {
        showGeolocPermissionModal()
      } else {
        await requestGeolocPermission()
        debouncedGoBack()
      }
    } else {
      dispatch({
        type: 'LOCATION_AROUND_ME',
        payload: { latitude: position.latitude, longitude: position.longitude },
      })
      debouncedGoBack()
    }
  }

  const onPressEverywhere = () => {
    dispatch({ type: 'LOCATION_EVERYWHERE' })
    debouncedGoBack()
  }

  const onPressGeolocPermissionModalButton = () => {
    Linking.openSettings()
    hideGeolocPermissionModal()
    debouncedGoBack()
  }

  return (
    <React.Fragment>
      <Spacer.TopScreen />
      <ScrollView contentContainerStyle={contentContainerStyle}>
        <Spacer.Column numberOfSpaces={14} />
        <Spacer.Column numberOfSpaces={6} />
        <BannerContainer>
          <Banner
            title={_(
              t`Seules les sorties et offres physiques seront affichées pour une recherche avec une localisation`
            )}
          />
        </BannerContainer>
        <Spacer.Column numberOfSpaces={6} />
        <LocationChoice
          testID="pickPlace"
          locationType={LocationType.PLACE}
          arrowNext={true}
          onPress={onPressPickPlace}
        />
        <Spacer.Column numberOfSpaces={4} />
        <LocationChoice
          testID="aroundMe"
          locationType={LocationType.AROUND_ME}
          onPress={onPressAroundMe}
        />
        <Spacer.Column numberOfSpaces={4} />
        <LocationChoice
          testID="everywhere"
          locationType={LocationType.EVERYWHERE}
          onPress={onPressEverywhere}
        />
      </ScrollView>

      <PageHeader title={_(t`Localisation`)} />
      <GeolocationActivationModal
        isGeolocPermissionModalVisible={isGeolocPermissionModalVisible}
        hideGeolocPermissionModal={hideGeolocPermissionModal}
        onPressGeolocPermissionModalButton={onPressGeolocPermissionModalButton}
      />
    </React.Fragment>
  )
}

const contentContainerStyle: ViewStyle = { flexGrow: 1 }

const BannerContainer = styled.View({ marginHorizontal: getSpacing(6) })
