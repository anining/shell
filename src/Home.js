import * as React from "karet"
import { Fragment } from "karet"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import * as L from "partial.lenses"
import {
  StyleSheet, Text, View, TouchableWithoutFeedback, Image,
  TouchableOpacity, ImageBackground, Animated, FlatList, Linking, PanResponder
} from "react-native"

import Header from "./Header"
import SafeArea from "./SafeArea"
import * as C from "./common"
import S, { posShadow, negShadow, padding, square, translate } from "./style"

const _S = StyleSheet.create({
  navBar: {
    ...padding(8, 25),
    marginTop: 4,
  },
  navBarText: {
    fontSize: 20,
    fontWeight: "200"
  },
  navBarTextBold: {
    fontWeight: "500"
  },
  navBarMenuToggle: {
    ...square(44),
    marginRight: -12,
  },
  navBarStack: {
    ...square(20)
  },

  popupMenu: {
    paddingVertical: 12,

    backgroundColor: "#ffffff",
    borderRadius: 10,

    ...posShadow,
    shadowRadius: 4,

    position: "absolute",
    top: 7,
    right: 25,
    zIndex: 2
  },
  popupMenuMask: {
    ...StyleSheet.absoluteFill,
    zIndex: 1
  },
  popupMenuTip: {
    ...square(15),
    backgroundColor: "#ffffff",

    borderRadius: 2,

    transform: [
      { rotateZ: "45deg" }
    ],

    position: "absolute",
    right: 16,
    top: -4
  },
  popupMenuItem: {
    height: 40,
    paddingHorizontal: 20
  },
  popupMenuItemDot: {
    ...square(4),
    backgroundColor: "#ffa238",
    borderRadius: 4
  },
  popupMenuItemText: {
    fontSize: 16,
    color: "#3d352e",
    marginLeft: 6
  },
  popupMenuVersion: {
    color: "#aaaaaa",
    fontSize: 11,
    textAlign: "right",
    marginRight: 20
  },

  dailyCard: {
    marginHorizontal: 36,
    marginTop: 16,
    zIndex: 0,
  },
  dailyCardBg: {
    borderRadius: 20,
    backgroundColor: "#faa231",
    marginTop: -160,
    paddingTop: 95,

    ...posShadow
  },
  dailyCardContent: {
    height: 240,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    paddingTop: 85,
    paddingHorizontal: 32,
  },
  dailyCardText: {
    fontSize: 15,
    lineHeight: 20,
    height: 100,
    color: "#97765a",

    ...S.charter,
  },
  dailyCardAuthor: {
    marginTop: 10,
    textAlign: "right"
  },
  dailyCardImagePanel: {
    marginHorizontal: 9,
    overflow: "hidden",
    borderRadius: 20,
    zIndex: 1
  },
  dailyCardImage: {
    width: "100%",
    height: 220,
  },

  category: {
    backgroundColor: "#ffffff",

    ...negShadow,

    ...StyleSheet.absoluteFill,
    top: 56,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    paddingHorizontal: 25,
  },

  categoryFoldButtonPanel: {
    height: 60
  },
  categoryFoldButton: {
    height: 32,
    backgroundColor: "#fff6ee",
    borderRadius: 20,

    paddingLeft: 34,
    paddingRight: 24,
  },
  categoryFoldButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffb056"
  },
  categoryFoldButtonArrow: {
    width: 14,
    height: 9,
    marginLeft: 20,
  },
  categoryCard: {
    height: 85,
    marginBottom: 20,
  },
  categoryCardBg: {
    borderRadius: 12,
    overflow: "hidden"
  },
  categoryCardText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff"
  }
})

const [ month, date, day ] = C.getLocaleDate()

function PopupMenuItem({ children, onPress, ...rest }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[S.flexRow, S.alignCenter, _S.popupMenuItem]} {...rest}>
        <View style={_S.popupMenuItemDot} />
        <Text style={_S.popupMenuItemText}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

function PopupMenu({ visible, navigation, browser = U.view("browser", C.gstate) }) {
  const animationProgress = new Animated.Value(visible.get() ? 1 : 0)
  const menuScale = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const menuTransformStyle = {
    opacity: animationProgress,
    transform: [
      ...translate(70, -90),
      { scale: menuScale },
      ...translate(-70, 90),
    ]
  }

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

  const doNavigate = (...args) => () => {
    navigation.navigate(...args)
    visible.modify(R.not)
  }

  const setBrowserUri = (u, t) => {
    const { uri, title } = U.destructure(browser)
    U.holding(() => {
      uri.set(u)
      title.set(t)
    })
  }

  function contactUs() {
    Linking.openURL("mailto:dextersup@outlook.com?subject=%5BCalendar%20Quotes%5D")
  }

  return (
    <Fragment>
      <Fragment>
        { U.consume(
          R.ifElse(R.identity,
            () => progressTo(1),
            () => progressTo(0)
          ),
          U.changes(visible)
        ) }
      </Fragment>

      <Fragment>
        { U.when(visible,
          <TouchableWithoutFeedback onPress={U.doModify(visible, R.not)}>
            <View style={_S.popupMenuMask}></View>
          </TouchableWithoutFeedback>
        ) }
      </Fragment>

      <Animated.View style={[_S.popupMenu, menuTransformStyle]}>
        <View style={_S.popupMenuTip} />

        <PopupMenuItem onPress={doNavigate("CoinsStore")}>Coins Store</PopupMenuItem>
        <PopupMenuItem
          onPress={U.actions(
            () => setBrowserUri("https://www.frederickboom.com/terms_of_use.html", "Terms of Use"),
            doNavigate("Browser"),
          )}
        >
          Terms of Use
        </PopupMenuItem>
        <PopupMenuItem
          onPress={U.actions(
            () => setBrowserUri("https://www.frederickboom.com/privacy_policy.html", "Privacy Policy"),
            doNavigate("Browser"),
          )}
        >
          Privacy Policy
        </PopupMenuItem>
        <PopupMenuItem onPress={contactUs}>Contact Us</PopupMenuItem>

        <Text style={_S.popupMenuVersion}>Version 1.0</Text>
      </Animated.View>
    </Fragment>
  )
}

function DailyCard({ image, content, author }) {
  return (
    <View style={_S.dailyCard}>
      <View style={_S.dailyCardImagePanel}>
        <Image
          karet-lift
          source={image}
          style={_S.dailyCardImage}
        />
      </View>
      <View style={_S.dailyCardBg}>
        <View style={_S.dailyCardContent}>
          <Text style={_S.dailyCardText} numberOfLines={5} karet-lift>{content}</Text>
          <Text style={U.molecule([_S.dailyCardText, _S.dailyCardAuthor])} karet-lift>——{author}</Text>
        </View>
      </View>
    </View>
  )
}

function FoldButton({ onPress, arrowRotation, ...rest }) {
  const arrowImageStyle = {
    transform: [
      { rotateX: arrowRotation }
    ]
  }

  return (
    <View {...rest}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[S.flexRow, S.alignCenter, S.justifyCenter, _S.categoryFoldButtonPanel]}>
          <View style={[S.flexRow, S.alignCenter, _S.categoryFoldButton]}>
            <Text style={[S.avenir, _S.categoryFoldButtonText]}>Category</Text>
            <Animated.Image
              source={require("../asset/image/varrow.png")}
              style={[_S.categoryFoldButtonArrow, arrowImageStyle]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

function CategoryCard({ onPress, title, image }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={_S.categoryCard}>
        <ImageBackground
          style={[S.justifyCenter, S.alignCenter, S.fill, _S.categoryCardBg]}
          source={image}
        >
          <Text style={[S.avenir, _S.categoryCardText]}>{title}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}
const PureCategoryCard = U.pure(({ onPress, title, ...rest }) => CategoryCard({
  onPress: () => onPress(title),
  title,
  ...rest,
}))

function Category({ pulledOut = U.atom(false), navigation, categories }) {
  const animationProgress = new Animated.Value(pulledOut.get() ? 1 : 0)
  const arrowRotation = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  })
  const categoryTranslate = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [416, 0]
  })

  const categoryTranslateStyle = {
    transform: [
      { translateY: categoryTranslate }
    ]
  }

  let scrollRef = null

  const mainPanResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => !pulledOut.get(),
    onMoveShouldSetPanResponder: () => !pulledOut.get(),

    onPanResponderMove: (evt, { dy }) => {
      const p = -dy / 416
      animationProgress.setValue(p > 1 ? 1 : p < 0 ? 0 : p)
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: (evt, { dy, vy }) => {
      if (Math.abs(dy) < 40) {
        progressTo(0)
      } else if (vy > 0) {
        progressTo(0, -vy / 416)
      } else {
        progressTo(1, -vy / 416)
      }
    }
  })

  const btnPanResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => pulledOut.get(),
    onMoveShouldSetPanResponder: () => pulledOut.get(),

    onPanResponderMove: (evt, { dy }) => {
      const p = 1 - dy / 416
      animationProgress.setValue(p > 1 ? 1 : p < 0 ? 0 : p)
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: (evt, { dy, vy }) => {
      if (Math.abs(dy) < 40) {
        progressTo(1)
      } else if (vy > 0) {
        progressTo(0, -vy / 416)
      } else {
        progressTo(1, -vy / 416)
      }
    }
  })

  function progressTo(n, velocity = 0) {
    if (n === 0) {
      scrollRef.scrollToIndex({ index: 0 })
    }

    const anime = Animated.spring(
      animationProgress,
      {
        velocity,
        toValue: n,
        overshootClamping: true,
        useNativeDriver: true
      }
    )

    anime.start(() => pulledOut.set(n === 1))
  }

  function toggleCategory() {
    pulledOut.modify(R.not)
  }

  function toCategoryDetail(category) {
    U.view(["categoryDetail", "category"], C.gstate).set(category)
    navigation.navigate("CategoryDetail")
  }

  return (
    <Animated.View style={[_S.category, categoryTranslateStyle]} {...mainPanResponder.panHandlers}>
      <Fragment>
        { U.consume(
          R.ifElse(R.identity,
            () => progressTo(1),
            () => progressTo(0)
          ),
          U.changes(pulledOut)
        ) }
      </Fragment>

      <FoldButton onPress={toggleCategory} arrowRotation={arrowRotation} {...btnPanResponder.panHandlers} />
      <FlatList
        karet-lift
        ref={ref => scrollRef = ref}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        pointerEvents={U.ifElse(pulledOut, "auto", "none")}
        data={categories}
        keyExtractor={(_, idx) => `${idx}`}
        renderItem={({ item: [category, image], index }) => {
          return (
            <PureCategoryCard
              key={index}
              title={category}
              image={image}
              onPress={toCategoryDetail}
            />
          )
        }}
      />
    </Animated.View>
  )
}

export default function Home({
  navigation,
  state = U.view("home", C.gstate),
  resource = U.view("resource", C.gstate),
}) {
  const categoryPulledOut = U.view(["categoryPulledOut", L.defaults(false)], state)
  const popupMenuVisible = U.view(["popupMenuVisible", L.defaults(false)], state)
  const { bgs, categories, quotes } = U.destructure(resource)

  const randomImage = U.thru(
    bgs,
    U.mapValue(C.randomPick),
    U.view("source"),
  )
  const randomCategory = U.thru(
    categories,
    U.mapValue(C.randomPick),
    U.view(0),
  )
  const randomQuote = U.thru(
    quotes,
    U.view(randomCategory),
    U.mapValue(C.randomPick),
  )
  const randomContent = U.view("content", randomQuote)
  const randomAuthor = U.view("author", randomQuote)

  return (
    <Fragment>
      <SafeArea>
        <View style={S.flex}>
          <PopupMenu visible={popupMenuVisible} navigation={navigation} />
          <Header title={month} />
          <DailyCard
            image={randomImage}
            content={randomContent}
            author={randomAuthor}
          />
          <Category pulledOut={categoryPulledOut} navigation={navigation} categories={categories} />
        </View>
      </SafeArea>
      <SafeArea style={{ flex: 0 }} />
    </Fragment>
  )
}

const popupMenuVisible = U.view(["home", "popupMenuVisible", L.defaults(false)], C.gstate)
Home.navigationOptions = {
  headerLeft: (
    <Text style={[_S.navBarText]}>{day} <Text style={_S.navBarTextBold}>{date}</Text></Text>
  ),
  headerRight: (
    <TouchableWithoutFeedback onPress={U.doModify(popupMenuVisible, R.not)}>
      <View style={[S.justifyCenter, S.alignCenter, _S.navBarMenuToggle]}>
        <Image source={require("../asset/image/stack.png")} style={[S.navBarStack]} />
      </View>
    </TouchableWithoutFeedback>
  )
}
