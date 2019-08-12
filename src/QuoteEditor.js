import * as React from "karet"
import { Fragment } from "karet"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import * as L from "partial.lenses"
import {
  View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,
  Animated, KeyboardAvoidingView, FlatList
} from "react-native"

import * as C from "./common"
import S, { posShadow, square, negShadow } from "./style"
import SafeArea from "./SafeArea"
import HeaderRightButton from "./HeaderRightButton"

const _S = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#ffffff",

    ...posShadow
  },
  cardContent: {
    overflow: "hidden",
    borderRadius: 12
  },
  cardContainer: {
    marginTop: 15,
    marginHorizontal: 25
  },

  toolbar: {
    height: 160,
    paddingHorizontal: 13,
    marginHorizontal: 25,
    marginTop: 25
  },
  toolButton: {
    ...square(50),
  },

  styleListContainer: {
    height: 180,
    width: "100%",

    position: "absolute",
    bottom: 0
  },
  styleList: {
    height: 160,
    paddingHorizontal: 14,
    paddingTop: 24,

    top: 20,

    backgroundColor: "#ffffff",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    ...negShadow
  },
  styleListDone: {
    position: "absolute",
    right: 12,
    top: 0,

    ...posShadow,
  },
  styleListItemPanel: {
    paddingTop: 7
  },
  styleListItem: {
    backgroundColor: "#f0f0f0",
    width: 80,
    height: 100,
    marginHorizontal: 10
  },
  styleListIndicator: {
    ...square(8),

    borderRadius: 4,
    marginTop: 7,
  },
  selectedIndicator: {
    backgroundColor: "#ffa238"
  },
  styleItemLock: {
    position: "absolute",
    right: 9
  },

  sampleText: {
    fontSize: 18,
    color: "#855e3c"
  },
  sampleImage: {
    width: 80,
    height: 100,
  }
})

function ToolButton({ onPress, source }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[S.alignCenter, S.justifyCenter, _S.toolButton]}>
        <Image source={source} />
      </View>
    </TouchableOpacity>
  )
}

function Toolbar({ onPressLayout, onPressBg, onPressFont, onPressNext }) {
  return (
    <View style={[S.flexRow, S.alignCenter, S.justifyBetween, _S.toolbar]}>
      <ToolButton source={require("../asset/image/layout.png")} onPress={onPressLayout} />
      <ToolButton source={require("../asset/image/img.png")} onPress={onPressBg} />
      <ToolButton source={require("../asset/image/font.png")} onPress={onPressFont} />
      <ToolButton source={require("../asset/image/next.png")} onPress={onPressNext} />
    </View>
  )
}

function StyleListIndicator({ selected }) {
  return (
    <View
      karet-lift
      style={U.template([_S.styleListIndicator, U.when(selected, _S.selectedIndicator)])}
    />
  )
}

function StyleItemLock() {
  return (
    <Image style={_S.styleItemLock} source={require("../asset/image/lock.png")} />
  )
}

function StyleItem({ children, selected, onPress, locked }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[S.alignCenter, _S.styleListItemPanel]}>
        <View style={[S.alignCenter, S.justifyCenter, _S.styleListItem]}>
          {children}
        </View>
        <StyleListIndicator selected={selected} />
        { U.when(locked,
          <StyleItemLock />
        ) }
      </View>
    </TouchableWithoutFeedback>
  )
}

function StyleList({ items, onSelect, selected, visible }) {
  const animationProgress = new Animated.Value(0)
  const translateY = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [180, 0]
  })

  const style = {
    transform: [ { translateY: translateY } ]
  }

  const PureStyleItem = U.pure(({ locked, elem, id, ...rest }) => {
    return (
      <StyleItem
        locked={locked}
        onPress={R.partial(onSelect, [id, locked])}
        selected={R.equals(selected, id)}
        {...rest}
      >
        {elem}
      </StyleItem>
    )
  })

  function progressTo(n) {
    Animated.timing(
      animationProgress,
      {
        toValue: n,
        duration: 200,
        useNativeDriver: true
      }
    ).start()
  }

  return (
    <Animated.View style={[_S.styleListContainer, style]}>
      <Fragment>
        { U.consume(
          R.ifElse(R.identity,
            () => progressTo(1),
            () => progressTo(0)
          ),
          visible
        ) }
      </Fragment>

      <View style={_S.styleList}>
        <FlatList
          karet-lift
          initialNumToRender={5}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={items}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => {
            const { locked, elem, id } = item
            return (
              <PureStyleItem
                key={id}
                id={id}
                elem={elem}
                locked={locked}
              />
            )
          }}
        />
      </View>

      <TouchableOpacity style={_S.styleListDone} onPress={U.doSet(visible, false)}>
        <Image source={require("../asset/image/done.png")} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export function Card({ children, ...rest }) {
  return (
    <View style={[S.flex, _S.card]} {...rest}>
      <View style={[S.flex, _S.cardContent]}>
        {children}
      </View>
    </View>
  )
}

function SampleText({ style }) {
  return (
    <Text style={[_S.sampleText, style]}>Text</Text>
  )
}

function SampleImage({ source }) {
  return R.isNil(source) ?
    <Image source={require("../asset/image/view.png")} />
    :
    <Image source={source} style={_S.sampleImage} />
}

function SampleLayout({ source }) {
  return (
    <Image source={source} />
  )
}

const fontStyle = R.ifElse(R.isNil, R.always({}), name => ({ fontFamily: name }))
export const selectedStyleId = (name, state) => U.view([name, L.defaults(0)], state)
const localUnlockedItems = (unlockedIds, items) => U.thru(
  items,
  // don't resort
  C.sortItemsWithLock(U.takeFirst(1, unlockedIds))
)

export const getSelectedLayout = (selectedLayout, layouts) => U.thru(
  layouts,
  R.find(R.propEq("id", selectedLayout)),
  U.view("layout")
)

export const getSelectedBgSource = (selectedBg, bgs) => U.thru(
  bgs,
  R.find(R.propEq("id", selectedBg)),
  U.view("source")
)

export const getSelectedFontStyle = (selectedFont, fonts) => U.thru(
  fonts,
  R.find(R.propEq("id", selectedFont)),
  U.view(["name", L.reread(fontStyle)]),
)

export default function QuoteEditor({
  navigation,
  state = U.view("quoteEditor", C.gstate),
  userData = U.view("userData", C.gstate),
  resource = U.view("resource", C.gstate),
  categoryPulledOut = U.view(["home", "categoryPulledOut"], C.gstate),
}) {
  const layoutListVisible = U.view(["layoutListVisible", L.defaults(false)], state)
  const bgListVisible = U.view(["bgListVisible", L.defaults(false)], state)
  const fontListVisible = U.view(["fontListVisible", L.defaults(false)], state)
  const editing = U.view(["editing", L.defaults(false)], state)

  const loadedLayout = U.atom(false)
  const loadedBg = U.atom(false)
  const loadedFont = U.atom(false)

  const selectedLayout = selectedStyleId("selectedLayout", state)
  const selectedBg = selectedStyleId("selectedBg", state)
  const selectedFont = selectedStyleId("selectedFont", state)

  const { coins, unlockedBgs, unlockedFonts, unlockedLayouts } = U.destructure(userData)

  const { content, author } = U.destructure(state)
  const { fonts, bgs, layouts } = U.destructure(resource)

  const localFonts = localUnlockedItems(unlockedFonts, fonts)
  const fontItems = U.thru(
    localFonts,
    R.memoizeWith(R.identity,
      R.map(x => R.assoc("elem", <SampleText style={fontStyle(x.name)} />, x))
    ),
    C.unlockItems(unlockedFonts),
  )

  const localBgs = localUnlockedItems(unlockedBgs, bgs)
  const bgItems = U.thru(
    localBgs,
    R.memoizeWith(R.identity,
      R.map(x => R.assoc("elem", <SampleImage source={x.source} />, x))
    ),
    C.unlockItems(unlockedBgs),
  )

  const localLayouts = localUnlockedItems(unlockedLayouts, layouts)
  const layoutItems = U.thru(
    localLayouts,
    R.memoizeWith(R.identity,
      R.map(x => R.assoc("elem", <SampleLayout source={x.thumb} />, x))
    ),
    C.unlockItems(unlockedLayouts),
  )

  const SelectedLayout = getSelectedLayout(selectedLayout, layouts)
  const selectedBgSource = getSelectedBgSource(selectedBg, bgs)
  const selectedFontStyle = getSelectedFontStyle(selectedFont, fonts)

  const unionedSelect = (a0, a0id, a1, a1id) => {
    a0.set(a0id)

    if (a0id === 0) {
      a1.set(0)
    } else {
      if (a1.get() === 0) {
        a1.set(a1id)
      }
    }
  }

  function wishToUnlockDecorates(type) {
    return C.confirm(`Unlock this ${type}`, `You need 50 coins to unlock this ${type.toLowerCase()}`)
  }

  async function selectBg(id, locked) {
    const firstLayoutId = C.getCurrentPropertyValue(U.view([1, "id"], localLayouts))

    if (locked) {
      if (await wishToUnlockDecorates("Photo")) {
        if (coins.get() < 50) {
          C.notEnoughCoin()
        } else {
          U.holding(() => {
            coins.modify(R.subtract(R.__, 50))
            unlockedBgs.modify(R.append(id))
            unionedSelect(selectedBg, id, selectedLayout, firstLayoutId)
          })
        }
      }
    } else {
      U.holding(() => {
        unionedSelect(selectedBg, id, selectedLayout, firstLayoutId)
      })
    }
  }

  async function selectLayout(id, locked) {
    const firstBgId = C.getCurrentPropertyValue(U.view([1, "id"], localBgs))

    if (locked) {
      if (await wishToUnlockDecorates("Layout")) {
        if (coins.get() < 50) {
          C.notEnoughCoin()
        } else {
          U.holding(() => {
            coins.modify(R.subtract(R.__, 50))
            unlockedLayouts.modify(R.append(id))
            unionedSelect(selectedLayout, id, selectedBg, firstBgId)
          })
        }
      }
    } else {
      U.holding(() => {
        unionedSelect(selectedLayout, id, selectedBg, firstBgId)
      })
    }
  }

  async function selectFont(id, locked) {
    if (locked) {
      if (await wishToUnlockDecorates("Fontstyle")) {
        if (coins.get() < 50) {
          C.notEnoughCoin()
        } else {
          U.holding(() => {
            coins.modify(R.subtract(R.__, 50))
            unlockedFonts.modify(R.append(id))
            selectedFont.set(id)
          })
        }
      }
    } else {
      selectedFont.set(id)
    }
  }

  return (
    <Fragment>
      <SafeArea>
        <View style={S.flex}>
          <KeyboardAvoidingView contentContainerStyle={S.flex} style={S.flex} behavior="position" keyboardVerticalOffset={40}>
            <View style={[S.flex, _S.cardContainer]}>
              <Card>
                <SelectedLayout
                  author={author}
                  content={content}
                  onChangeContent={U.set(content)}
                  contentStyle={selectedFontStyle}
                  image={selectedBgSource}
                  editing={editing}
                  onFocus={U.doSet(editing, true)}
                  editable
                />
              </Card>
            </View>
          </KeyboardAvoidingView>

          <Toolbar
            onPressLayout={U.actions(U.doSet(loadedLayout, true), U.doSet(layoutListVisible, true))}
            onPressBg={U.actions(U.doSet(loadedBg, true), U.doSet(bgListVisible, true))}
            onPressFont={U.actions(U.doSet(loadedFont, true), U.doSet(fontListVisible, true))}
            onPressNext={() => {
              categoryPulledOut.set(false)
              navigation.navigate("ShareQuote")
            }}
          />

          <Fragment>
            { U.when(loadedFont,
              <StyleList
                visible={fontListVisible}
                onSelect={selectFont}
                selected={selectedFont}
                items={fontItems}
              />
            ) }
          </Fragment>

          <Fragment>
            { U.when(loadedBg,
              <StyleList
                visible={bgListVisible}
                onSelect={selectBg}
                selected={selectedBg}
                items={bgItems}
              />
            ) }
          </Fragment>

          <Fragment>
            { U.when(loadedLayout,
              <StyleList
                visible={layoutListVisible}
                onSelect={selectLayout}
                selected={selectedLayout}
                items={layoutItems}
              />
            ) }
          </Fragment>
        </View>
      </SafeArea>
      <SafeArea style={{ flex: 0 }} />
    </Fragment>
  )
}

const editing = U.view(["quoteEditor", "editing", L.defaults(false)], C.gstate)
QuoteEditor.navigationOptions = {
  headerRight: (
    <Fragment>
      { U.ifElse(
        editing,
        <HeaderRightButton onPress={U.doSet(editing, false)}>DONE</HeaderRightButton>,
        <HeaderRightButton onPress={U.doSet(editing, true)}>EDIT</HeaderRightButton>
      ) }
    </Fragment>
  )
}
