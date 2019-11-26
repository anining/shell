import { StyleSheet } from "react-native"

let S = StyleSheet.create({
  flex: {
    flex: 1
  },
  fill: {
    width: "100%",
    height: "100%"
  },
  mainBackground: {
    backgroundColor: "#f5f5fb"
  },
  flexRow: {
    flexDirection: "row"
  },
  alignCenter: {
    alignItems: "center"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifyBetween: {
    justifyContent: "space-between"
  },

  avenir: {
    fontFamily: "Avenir"
  },
  charter: {
    fontFamily: "Charter"
  },
})

export default S

export let headerCommonStyle = [S.mainBackground, { borderBottomWidth: 0 }]
export let headerLeftContainerStyle = {
}
export let headerRightContainerStyle = {
  paddingRight: 25
}

export let generalShadow = (x, y) => ({
  shadowColor: "#bbbbbb",
  shadowOffset: {
    width: x,
    height: y
  },
  shadowRadius: 10,
  shadowOpacity: 0.3,
})
export let posShadow = generalShadow(0, 4)
export let negShadow = generalShadow(0, -2)

export let padding = (v, h) => ({
  paddingVertical: v,
  paddingHorizontal: h
})

export let square = edge => ({
  width: edge,
  height: edge
})

export let translate = (x, y) => [
  { translateX: x },
  { translateY: y }
]
