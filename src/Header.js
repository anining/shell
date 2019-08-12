import * as React from "karet"
import * as U from "karet.util"
import { View, Text, StyleSheet } from "react-native"

import S from "./style"

const _S = StyleSheet.create({
  header: {
    marginTop: -6,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 34,
    lineHeight: 46,
    color: "#3d352e",
    fontWeight: "700"
  },
})

export default function Header({ title, style, children }) {
  return (
    <View style={[S.flexRow, S.alignCenter, S.justifyBetween, _S.header, style]}>
      <Text style={U.molecule([S.avenir, _S.title])} karet-lift>{title}</Text>
      {children}
    </View>
  )
}
