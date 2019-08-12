import * as React from "karet"
import * as U from "karet.util"
import { Text, StyleSheet } from "react-native"
import { WebView } from "react-native-webview"

import S from "./style"

import * as C from "./common"

const _S = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500"
  }
})

export default function Browser({ state = U.view("browser", C.gstate) }) {
  const { uri } = U.destructure(state)

  return (
    <WebView style={S.flex} source={U.molecule({ uri })} karet-lift />
  )
}

const title = U.view(["browser", "title"], C.gstate)
Browser.navigationOptions = {
  headerTitle: <Text style={_S.title} karet-lift>{title}</Text>
}
