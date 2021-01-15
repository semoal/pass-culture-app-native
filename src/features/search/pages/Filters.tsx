import PropTypes from 'prop-types'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-native'
import { StyleSheet, SafeAreaView, Modal, Text, TouchableOpacity } from 'react-native'

import { FACETS_ENUM } from 'libs/algolia/enums'

import { PriceSlider } from '../components'

import { AlgoliaWrapper } from './AlgoliaWrapper'
// import RefinementList from './RefinementList';

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
  },
})

const Filters = ({ isModalOpen, searchState, searchClient, toggleModal, onSearchStateChange }) => (
  <Modal visible={isModalOpen}>
    <SafeAreaView>
      <AlgoliaWrapper>
        {/* <RefinementList attribute="brand" /> */}
        <PriceSlider attribute={FACETS_ENUM.OFFER_PRICE} />

        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </AlgoliaWrapper>
    </SafeAreaView>
  </Modal>
)

Filters.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  //   searchState: PropTypes.object.isRequired,
  //   searchClient: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  //   onSearchStateChange: PropTypes.func.isRequired,
}

export default Filters
