import * as React from "karet"
import { Fragment } from "karet"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import * as L from "partial.lenses"
import { Alert } from "react-native"

import QUOTES from "./quotes.json"
import * as LT from "./LayoutTemplates"

export const gstate = U.atom({})

export const getCurrentPropertyValue = obs => {
  let val = null
  const setter = v => val = v

  obs.onValue(setter)
  obs.offValue(setter)

  return val
}

const CATEGORIES = [
  ["Birthday", require("../asset/category/Birthday.jpg")],
  ["Faith", require("../asset/category/Faith.jpg")],
  ["Family", require("../asset/category/Family.jpg")],
  ["Finance", require("../asset/category/Finance.jpg")],
  ["Fitness", require("../asset/category/Fitness.jpg")],
  ["Friendship", require("../asset/category/Friendship.jpg")],
  ["God", require("../asset/category/God.jpg")],
  ["Indep", require("../asset/category/Independence.jpg")],
  ["Learning", require("../asset/category/Learning.jpg")],
  ["Life", require("../asset/category/Life.jpg")],
  // ["Love", require("../asset/category/Love.jpg")],
  ["Smile", require("../asset/category/Smile.jpg")],
  ["Trust", require("../asset/category/Trust.jpg")],
  ["Work", require("../asset/category/Work.jpg")],
]
export function getCategories() {
  return CATEGORIES
}

export function getQuotes() {
  return QUOTES
}

const BGS = [
  { id: 0, source: null, locked: false },
  { id: 1, source: require("../asset/bg/bgimg_1.jpg"), locked: false },
  { id: 2, source: require("../asset/bg/bgimg_2.jpg"), locked: false },
  { id: 3, source: require("../asset/bg/bgimg_3.jpg"), locked: true },
  { id: 4, source: require("../asset/bg/bgimg_4.jpg"), locked: true },
  { id: 5, source: require("../asset/bg/bgimg_5.jpg"), locked: true },
  { id: 6, source: require("../asset/bg/bgimg_6.jpg"), locked: true },
  { id: 7, source: require("../asset/bg/bgimg_7.jpg"), locked: true },
  { id: 8, source: require("../asset/bg/bgimg_8.jpg"), locked: true },
  { id: 9, source: require("../asset/bg/bgimg_9.jpg"), locked: true },
  { id: 10, source: require("../asset/bg/bgimg_10.jpg"), locked: true },
  { id: 11, source: require("../asset/bg/bgimg_11.jpg"), locked: true },
  { id: 12, source: require("../asset/bg/bgimg_12.jpg"), locked: true },
  { id: 13, source: require("../asset/bg/bgimg_13.jpg"), locked: true },
  { id: 14, source: require("../asset/bg/bgimg_14.jpg"), locked: true },
  { id: 15, source: require("../asset/bg/bgimg_15.jpg"), locked: true },
  { id: 16, source: require("../asset/bg/bgimg_16.jpg"), locked: true },
  { id: 17, source: require("../asset/bg/bgimg_17.jpg"), locked: true },
  { id: 18, source: require("../asset/bg/bgimg_18.jpg"), locked: true },
  { id: 19, source: require("../asset/bg/bgimg_19.jpg"), locked: true },
  { id: 20, source: require("../asset/bg/bgimg_20.jpg"), locked: true },
  { id: 21, source: require("../asset/bg/bgimg_21.jpg"), locked: true },
  { id: 22, source: require("../asset/bg/bgimg_22.jpg"), locked: true },
  { id: 23, source: require("../asset/bg/bgimg_23.jpg"), locked: true },
  { id: 24, source: require("../asset/bg/bgimg_24.jpg"), locked: true },
  { id: 25, source: require("../asset/bg/bgimg_25.jpg"), locked: true },
  { id: 26, source: require("../asset/bg/bgimg_26.jpg"), locked: true },
  { id: 27, source: require("../asset/bg/bgimg_27.jpg"), locked: true },
  { id: 28, source: require("../asset/bg/bgimg_28.jpg"), locked: true },
  { id: 29, source: require("../asset/bg/bgimg_29.jpg"), locked: true },
  { id: 30, source: require("../asset/bg/bgimg_30.jpg"), locked: true },
  { id: 31, source: require("../asset/bg/bgimg_31.jpg"), locked: true },
  { id: 32, source: require("../asset/bg/bgimg_32.jpg"), locked: true },
  { id: 33, source: require("../asset/bg/bgimg_33.jpg"), locked: true },
  { id: 34, source: require("../asset/bg/bgimg_34.jpg"), locked: true },
  { id: 35, source: require("../asset/bg/bgimg_35.jpg"), locked: true },
  { id: 36, source: require("../asset/bg/bgimg_36.jpg"), locked: true },
  { id: 37, source: require("../asset/bg/bgimg_37.jpg"), locked: true },
  { id: 38, source: require("../asset/bg/bgimg_38.jpg"), locked: true },
  { id: 39, source: require("../asset/bg/bgimg_39.jpg"), locked: true },
  { id: 40, source: require("../asset/bg/bgimg_40.jpg"), locked: true },
]
export function getBgs() {
  return BGS
}

const LAYOUTS = [
  { id: 0, layout: LT.Layout0, thumb: require("../asset/image/layout0.png"), locked: false },
  { id: 1, layout: LT.Layout1, thumb: require("../asset/image/layout1.png"), locked: false },
  { id: 2, layout: LT.Layout2, thumb: require("../asset/image/layout2.png"), locked: true },
  { id: 3, layout: LT.Layout3, thumb: require("../asset/image/layout3.png"), locked: true },
  { id: 4, layout: LT.Layout4, thumb: require("../asset/image/layout4.png"), locked: true },
  { id: 5, layout: LT.Layout5, thumb: require("../asset/image/layout5.png"), locked: true },
]
export function getLayouts() {
  return LAYOUTS
}

const FONTS = [
  { id: 0, name: "TimesNewRomanPSMT", locked: false },
  { id: 1, name: "Aileron-Bold", locked: true },
  { id: 2, name: "Aileron-Heavy", locked: true },
  { id: 3, name: "Aileron-Thin", locked: true },
  { id: 4, name: "Aileron-UltraLight", locked: true },
  { id: 5, name: "Archivo-Bold", locked: true },
  { id: 6, name: "Archivo-Medium", locked: true },
  { id: 7, name: "Archivo-Regular", locked: true },
  { id: 8, name: "CothamSans", locked: true },
  { id: 9, name: "Montserrat-SemiBold", locked: true },
  { id: 10, name: "MontserratAlternates-Light", locked: true },
  { id: 11, name: "MontserratAlternates-Regular", locked: true },
  { id: 12, name: "OstrichSans-Heavy", locked: true },
  { id: 13, name: "Oswald-Regular", locked: true },
  { id: 14, name: "PlayfairDisplaySC-Black", locked: true },
  { id: 15, name: "Poppins-ExtraLight", locked: true },
  { id: 16, name: "Roboto-Regular", locked: true },
  { id: 17, name: "TexGyreHeros-Italic", locked: true },
  { id: 18, name: "TexGyreHeros-Regular", locked: true },
  { id: 19, name: "TexGyreHerosCondensed-Bold", locked: true },
  { id: 20, name: "TexGyreHerosCondensed-Regular", locked: true },
  { id: 21, name: "Ubuntu-Light", locked: true },
  { id: 22, name: "IBMPlexSans-Text", locked: true },
  { id: 23, name: "InriaSans-Regular", locked: true },
]
export function getFonts() {
  return FONTS
}

export function confirm(title, message) {
  return new Promise(rs => {
    Alert.alert(title, message, [
      { text: "Cancel", onPress: () => rs(false) },
      { text: "Continue", onPress: () => rs(true) }
    ])
  })
}

export function notEnoughCoin() {
  Alert.alert("Not Enough Coins", "You don't have enough coins Get more?")
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]
const MONTHES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const DATES = [
  "1st",
  "2nd",
  "3rd",
]
export function getLocaleDate() {
  const d = new Date()

  const day = DAYS[d.getDay() - 1]
  const month = MONTHES[d.getMonth()]
  const date = d.getDate() > 3 ? `${d.getDate()}th` : DATES[d.getDate() - 1]

  return [month, date, day]
}

export const randomPick = xs => xs[Math.floor(Math.random() * xs.length)]

export const isUnlocked = unlockedIds => R.anyPass([
  R.pipe(R.prop("id"), R.includes(R.__, unlockedIds)),
  R.pipe(R.prop("locked"), R.equals(false))
])

export const unlockItems = unlockedIds => R.map(R.ifElse(isUnlocked(unlockedIds),
  R.assoc("locked", false),
  R.assoc("locked", true),
))

export const sortItemsWithLock = unlockedIds => items => R.concat(
  R.filter(isUnlocked(unlockedIds), items),
  R.filter(R.complement(isUnlocked(unlockedIds)), items),
)
