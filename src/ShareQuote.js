import * as React from "karet"
import { Fragment } from "karet"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import { StyleSheet, Image, Text, View, Alert } from "react-native"
import ViewShot from "react-native-view-shot"
import CameraRoll from "@react-native-community/cameraroll"

import * as C from "./common"
import Header from "./Header"
import SafeArea from "./SafeArea"
import { Card, getSelectedLayout, getSelectedBgSource, getSelectedFontStyle, selectedStyleId } from "./QuoteEditor"
import { TouchableOpacity } from "react-native-gesture-handler"
import { showInfoModal } from "./Modal"
import S from "./style"
import HeaderRightButton from "./HeaderRightButton"

const _S = StyleSheet.create({
  cardContainer: {
    marginTop: 15,
    marginHorizontal: 25
  },

  removeWatermark: {
    alignSelf: "center",
    marginVertical: 15
  },
  removeWatermarkButton: {
    height: 40
  },
  removeWatermarkText: {
    color: "#ffa238",
    fontSize: 14,

    marginTop: 3,
    marginLeft: 9
  },

  share: {
    marginHorizontal: 50,
    marginBottom: 31,
  },

  watermark: {
    position: "absolute",
    left: 5,
    bottom: 10,
    zIndex: 1,

    transform: [
      { rotateZ: "39deg" }
    ]
  },
  watermarkRemoved: {
    opacity: 0
  }
})

function RemoveWatermark({ onPress, removed }) {
  return (
    <View style={U.ifElse(removed, [_S.removeWatermark, _S.watermarkRemoved], _S.removeWatermark)} karet-lift>
      <TouchableOpacity onPress={U.unless(removed, onPress)} karet-lift>
        <View style={[S.flexRow, S.alignCenter, _S.removeWatermarkButton]}>
          <Image source={require("../asset/image/eraser.png")} />
          <Text style={[S.avenir, _S.removeWatermarkText]}>Remove Watermark</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

function Share({ onSave }) {
  return (
    <View style={[S.flexRow, S.justifyCenter, _S.share]}>
      <TouchableOpacity onPress={onSave}>
        <Image source={require("../asset/image/download.png")} />
      </TouchableOpacity>
    </View>
  )
}

export default function ShareQuote({
  quoteEditor = U.view("quoteEditor", C.gstate),
  userData = U.view("userData", C.gstate),
  resource = U.view("resource", C.gstate),
}) {
  const { content, author } = U.destructure(quoteEditor)
  const { layouts, fonts, bgs } = U.destructure(resource)

  const selectedLayout = selectedStyleId("selectedLayout", quoteEditor)
  const selectedBg = selectedStyleId("selectedBg", quoteEditor)
  const selectedFont = selectedStyleId("selectedFont", quoteEditor)

  const SelectedLayout = getSelectedLayout(selectedLayout, layouts)
  const selectedBgSource = getSelectedBgSource(selectedBg, bgs)
  const selectedFontStyle = getSelectedFontStyle(selectedFont, fonts)

  const { coins, watermarkRemoved } = U.destructure(userData)

  let captureRef = null

  async function saveToAlbum() {
    const uri = await captureRef.capture()
    try {
      await CameraRoll.saveToCameraRoll(uri, "photo")
      showInfoModal("Saved")
    } catch (e) {
      Alert.alert("failed to save")
    }
  }

  async function removeWatermark() {
    if (await C.confirm("Remove the Watermark", "You need 50 coins to remove the watermark, continue?")) {
      if (coins.get() < 50) {
        C.notEnoughCoin()
      } else {
        U.holding(() => {
          coins.modify(R.subtract(R.__, 50))
          watermarkRemoved.set(true)
        })
      }
    }
  }

  return (
    <SafeArea>
      <Header title="Share" />
      <View style={[S.flex, _S.cardContainer]}>
        <ViewShot style={S.flex} ref={ref => captureRef = ref}>
          <Card collapsable={false}>
            <SelectedLayout
              author={author}
              content={content}
              contentStyle={selectedFontStyle}
              image={selectedBgSource}
              editable={false}
            />
            <Fragment>
              { U.unless(watermarkRemoved,
                <Image source={require("../asset/image/watermark.png")} style={_S.watermark} />
              ) }
            </Fragment>
          </Card>
        </ViewShot>
      </View>
      <RemoveWatermark onPress={removeWatermark} removed={watermarkRemoved} />
      <Share
        onSave={saveToAlbum}
      />
    </SafeArea>
  )
}

ShareQuote.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <HeaderRightButton
      icon={require("../asset/image/home.png")}
      onPress={() => navigation.popToTop()}
    >
      HOME
    </HeaderRightButton>
  )
})
