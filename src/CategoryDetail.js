import * as React from "karet"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native"

import * as C from "./common"
import SafeArea from "./SafeArea"
import Header from "./Header"
import S, { posShadow } from "./style"

const _S = StyleSheet.create({
  navBarText: {
    color: "#aaaaaa",
    fontSize: 14
  },
  navBarCountText: {
    color: "#666666",
    fontSize: 16
  },

  headerText: {
    fontWeight: "300",
    color: "#aaaaaa"
  },
  headerCountText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#3d352e"
  },

  quotes: {
    paddingHorizontal: 12
  },
  quotesColumn: {
    width: 0,
    paddingHorizontal: 12
  },
  quotesItem: {
    marginVertical: 12,
  },

  quote: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    paddingTop: 20,

    ...posShadow
  },
  quoteText: {
    color: "#3d352e",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600"
  },
  quoteArrow: {
    marginTop: 22,
    alignSelf: "flex-end"
  },
  quoteLock: {
    position: "absolute",
    right: 10,
    top: 10
  }
})

function QuotesCount() {
  return (
    <Text style={_S.navBarCountText}>{Math.floor(Math.random() * 5)} <Text style={_S.navBarText}>new quotes added today</Text></Text>
  )
}

function Quote({ lines, locked, onPress, children, style }) {
  return (
    <TouchableOpacity onPress={onPress} karet-lift>
      <View style={U.molecule([_S.quote, style])} karet-lift>
        { U.when(locked,
          <Image style={_S.quoteLock} source={require("../asset/image/lock.png")} />
        ) }
        <Text
          karet-lift
          numberOfLines={lines}
          style={U.molecule([S.charter, _S.quoteText, { height: lines * _S.quoteText.lineHeight }])}
        >
          {children}
        </Text>
        <Image style={_S.quoteArrow} source={require("../asset/image/right-arrow.png")} />
      </View>
    </TouchableOpacity>
  )
}

function Quotes({ navigation, state, resource, userData }) {
	const { category } = U.destructure(state)
  const { quotes } = U.destructure(resource)
  const { coins, unlockedQuotes } = U.destructure(userData)
	
  const rawQuotes = U.thru(
    quotes,
    U.view(category),
    // don't re-sort when unlockedQuotes changes
    C.sortItemsWithLock(U.takeFirst(1, unlockedQuotes)),
    C.unlockItems(unlockedQuotes),
  )

  const groupedQuotes = R.splitEvery(4, rawQuotes)

  async function toQuoteEditor(id, locked, content, author) {
    if (locked) {
      if (await C.confirm("Unlock this Quote", "You need 30 coins unlock this quote then you can edit the quote posts")) {
        if (coins.get() < 30) {
          C.notEnoughCoin()
          return
        } else {
          unlockedQuotes.modify(R.append(id))
        }
      } else {
        return
      }
    }

		U.holding(() => {
			// clear quote editor state
			const quoteEditor = U.view("quoteEditor", C.gstate)
			quoteEditor.remove()
			quoteEditor.view("content").set(content)
			quoteEditor.view("author").set(author)
		})
    navigation.navigate("QuoteEditor")
  }

  const PureQuote = U.pure(({ id, ...rest }) => {
    const { locked, content, author } = rest

    return (
      <Quote
        onPress={R.partial(toQuoteEditor, [id, locked, content, author])}
        {...rest}
      >
        {content}
      </Quote>
    )
  })

  const renderQuote = lines => elem => {
    const { content, author, locked, id } = elem

    return (
      <PureQuote
        style={_S.quotesItem}
        lines={lines}
        id={id}
        locked={locked}
        author={author}
        content={content}
      />
    )
  }

  return (
    <FlatList
      karet-lift
      initialNumToRender={3}
      keyExtractor={(_, idx) => `${idx}`}
      data={groupedQuotes}
      renderItem={({ item, index }) => {
        const [quote0, quote1, quote2, quote3] = item

        return (
          <View key={index} style={[S.flexRow, _S.quotes]}>
            <View style={[S.flex, _S.quotesColumn]}>
              { R.unless(R.isNil, renderQuote(4))(quote0) }
              { R.unless(R.isNil, renderQuote(5))(quote2) }
            </View>
            <View style={[S.flex, _S.quotesColumn]}>
              { R.unless(R.isNil, renderQuote(6))(quote1) }
              { R.unless(R.isNil, renderQuote(3))(quote3) }
            </View>
          </View>
        )
      }}
    />
  )
}

export default function CategoryDetail({
  navigation,
  state = U.view("categoryDetail", C.gstate),
  resource = U.view("resource", C.gstate),
  userData = U.view("userData", C.gstate),
}) {
	const { category } = U.destructure(state)
  const { quotes } = U.destructure(resource)
  const quotesCount = U.thru(
    quotes,
    U.view(category),
    R.length,
  )

  return (
    <SafeArea>
      <Header title={category}>
        <Text style={[S.avenir, _S.headerCountText]}>
          <Text karet-lift>{quotesCount} </Text>
          <Text style={_S.headerText}>Quotes</Text>
        </Text>
      </Header>
      <Quotes
        navigation={navigation}
        state={state}
        resource={resource}
        userData={userData}
      />
    </SafeArea>
  )
}

CategoryDetail.navigationOptions = {
  headerRight: (
    <QuotesCount />
  )
}
