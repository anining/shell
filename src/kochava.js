import KochavaTracker from "react-native-kochava-tracker"

export function configKochava() {
  const configMapObject = {}
  configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = "kodaily-likes-calendar-quotes-jl6h"
  KochavaTracker.configure(configMapObject)
}
