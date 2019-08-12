import * as U from "karet.util"
import * as R from "kefir.ramda"
import AsyncStorage from "@react-native-community/async-storage"

import * as C from "./common"

async function persistAtomWithStorage(atom, key, defaultValue) {
  const val = await AsyncStorage.getItem(key)

  U.changes(atom).onValue(v => AsyncStorage.setItem(key, JSON.stringify(v)))

  if (val === null) {
    return U.doSet(atom, defaultValue)
  } else {
    return U.doSet(atom, JSON.parse(val))
  }
}

export async function persistUserData() {
  const userData = U.view("userData", C.gstate)
  const {
    coins, unlockedLayouts, unlockedBgs, unlockedFonts, unlockedQuotes,
    watermarkRemoved,
  } = U.destructure(userData)

  const setters = await Promise.all([
    persistAtomWithStorage(coins, "@userData.coins", 200),
    persistAtomWithStorage(unlockedLayouts, "@userData.unlockedLayouts", []),
    persistAtomWithStorage(unlockedBgs, "@userData.unlockedBgs", []),
    persistAtomWithStorage(unlockedFonts, "@userData.unlockedFonts", []),
    persistAtomWithStorage(unlockedQuotes, "@userData.unlockedQuotes", []),
    persistAtomWithStorage(watermarkRemoved, "@userData.watermarkRemoved", false),
  ])

  U.holding(() => {
    R.forEach(R.call, setters)
  })
}
