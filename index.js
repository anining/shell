import * as React from "karet"
import * as U from "karet.util"
import { AppRegistry, Linking, Platform } from "react-native"
import { name as appName } from "./app.json"
import SendIntentAndroid from "react-native-send-intent"

import App from "./src/App"
import CoreApp from "diablo"
import { persistUserData } from "./src/userData"
import loadResources from "./src/resource"
import { configKochava } from "./src/kochava"

function Main() {
  const Comp = U.variable()

  U.scope(async () => {
    let canOpenIns = false

    switch (Platform.OS) {
      case "android":
        canOpenIns = await SendIntentAndroid.isAppInstalled("com.instagram.android")
        break
      case "ios":
        canOpenIns = await Linking.canOpenURL("instagram://app")
        break
      default:
        throw new Error("not supported platform")
    }

    if (canOpenIns) {
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
  configKochava()
  persistUserData()
  loadResources()
}

main()
