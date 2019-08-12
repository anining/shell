import * as React from "karet"

import { SafeAreaView } from "react-native"

import S from "./style"

export default function SafeArea({ children, style, ...rest }) {
  return (
    <SafeAreaView style={[S.flex, S.mainBackground, style]} {...rest}>
      {children}
    </SafeAreaView>
  )
}
