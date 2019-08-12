import * as React from "karet"
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native"

import S, { square } from "./style"

const _S = StyleSheet.create({
  image: {
    ...square(14)
  },
  text: {
    marginLeft: 5,

    color: "#3d352e",
    fontWeight: "700",
    fontSize: 16
  }
})

export default function HeaderRightButton({ children, icon, style, onPress, ...rest }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[S.flexRow, S.alignCenter, style]} {...rest}>
        <Image style={_S.image} source={icon} />
        <Text style={[S.avenir, _S.text]}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
