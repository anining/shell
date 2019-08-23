import * as React from "karet"
import { Fragment } from "react"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import * as L from "partial.lenses"
import { StyleSheet, Modal, ActivityIndicator, Text, View } from "react-native"

import S from "./style"
import * as C from "./common"

const _S = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 12
  },
  containerText: {
    fontSize: 16,
    color: "white"
  }
})

function MyModal({ children, ...rest }) {
  return (
    <Modal
      karet-lift
      animationType="fade"
      transparent={true}
      {...rest}
    >
      <View style={[S.flex, S.alignCenter, S.justifyCenter]}>{children}</View>
    </Modal>
  )
}

function ProcessingModal({ visible }) {
  return (
    <MyModal visible={visible}>
      <View style={[S.alignCenter, S.justifyCenter, _S.container]}>
        <ActivityIndicator color="white" />
      </View>
    </MyModal>
  )
}

function InfoModal({ text, visible }) {
  // there is a bug with the Modal component that if I lift it to receive
  // new visible values, then I connot get the obs converted via U.changes
  // to be activated by placing it into the VDOM
  const duration = 800
  let hdl = null

  return (
    <MyModal visible={visible}>
      <Fragment>
        { U.thru(
          visible,
          U.consume(R.when(R.identity,
            () => hdl = setTimeout(U.doSet(visible, false), duration)
          ))
        ) }
        { U.onUnmount(() => clearTimeout(hdl)) }
      </Fragment>
      <View style={[S.alignCenter, S.justifyCenter, _S.container]}>
        <Text style={_S.containerText} karet-lift>{text}</Text>
      </View>
    </MyModal>
  )
}

export function ModalMonitor({ state = U.view("modalMonitor", C.gstate) }) {
  const processingVisible = U.view(["processingVisible", L.defaults(false)], state)
  const infoVisible = U.view(["infoVisible", L.defaults(false)], state)
  const infoText = U.view(["infoText", L.defaults("")], state)

  return (
    <Fragment>
      <ProcessingModal visible={processingVisible} />
      <InfoModal text={infoText} visible={infoVisible} />
    </Fragment>
  )
}

function toggleProcessingModal(visible) {
  U.view(["modalMonitor", "processingVisible"], C.gstate).set(visible)
}

export function showProcessingModal() {
  toggleProcessingModal(true)
}

export async function hideProcessingModal() {
  toggleProcessingModal(false)
  return new Promise((rs) => setTimeout(rs, 100))
}

export function showInfoModal(text) {
  const { infoVisible, infoText } = U.destructure(U.view("modalMonitor", C.gstate))

  U.holding(() => {
    infoVisible.set(true)
    infoText.set(text)
  })
}
