import * as React from "karet"
import * as U from "karet.util"
import { AppRegistry, Linking } from "react-native"
import { name as appName } from "./app.json"
import KochavaTracker from "react-native-kochava-tracker"

import App from "./src/App"
import CoreApp from "diablo"
import { persistUserData } from "./src/userData"
import loadResources from "./src/resource"

const configMapObject = {}
configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = "kodaily-likes-calendar-quotes-jl6h"
KochavaTracker.configure(configMapObject)

function Main() {
  const Comp = U.variable()

  U.scope(async () => {
    if (await Linking.canOpenURL("instagram://app")) {
      Comp.set(CoreApp)
    } else {
      Comp.set(App)
    }
  })

  return (
    <Comp />
  )
}

AppRegistry.registerComponent(appName, () => Main)

async function main() {
  persistUserData()
  loadResources()
}

main()
