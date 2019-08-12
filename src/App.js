import * as React from "karet"
import { Fragment } from "react"
import { Image } from "react-native"
import { createStackNavigator, createAppContainer } from "react-navigation"

import { ModalMonitor } from "./Modal"
import Home from "./Home"
import CategoryDetail from "./CategoryDetail"
import CoinsStore from "./CoinsStore"
import QuoteEditor from "./QuoteEditor"
import ShareQuote from "./ShareQuote"
import Browser from "./Browser"
import { headerCommonStyle, headerLeftContainerStyle, headerRightContainerStyle } from "./style"

const navigation = createStackNavigator({
  Home,
  CategoryDetail,
  CoinsStore,
  QuoteEditor,
  ShareQuote,
  Browser,
}, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerBackImage: (
      <Image source={require("../asset/image/left-arrow.png")} />
    ),
    headerStyle: headerCommonStyle,
    headerBackTitle: null,
    headerLeftContainerStyle: headerLeftContainerStyle,
    headerRightContainerStyle: headerRightContainerStyle
  }
})

const App = createAppContainer(navigation)

export default function RootApp() {
  return (
    <Fragment>
      <ModalMonitor />
      <App />
    </Fragment>
  )
}
