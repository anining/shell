import * as React from "karet"
import { Fragment } from "react"
import * as U from "karet.util"
import * as R from "kefir.ramda"
import {
  StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Alert,
  ActivityIndicator, Animated
} from "react-native"
import {
  initConnection, purchaseErrorListener, purchaseUpdatedListener, getProducts,
  requestPurchase 
} from "react-native-iap"

import * as C from "./common"
import Header from "./Header"
import SafeArea from "./SafeArea"
import { showProcessingModal, hideProcessingModal, showInfoModal } from "./Modal"
import S, { square, padding, posShadow } from "./style"

const skus = [
  "com.prismslight.fa0001_00",
  "com.prismslight.fa0001_01",
  "com.prismslight.fa0001_02",
  "com.prismslight.fa0001_03",
  "com.prismslight.fa0001_04",
  "com.prismslight.fa0001_05",
]

const _S = StyleSheet.create({
  coinsCountText: {
    color: "#aaaaaa",
    fontSize: 14,

    marginLeft: 6
  },
  coinsCountNumber: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },
  coinsCountIcon: {
    ...square(16)
  },

  products: {
    ...padding(14, 25),
    marginTop: -20,
  },
  product: {
    ...padding(15, 20),
    marginTop: 20,

    borderRadius: 12,
    backgroundColor: "#ffffff",

    ...posShadow
  },
  productDesc: {
    fontSize: 20,
    fontWeight: "400",
    color: "#aaaaaa",

    marginLeft: 13
  },
  productCoinAmount: {
    color: "#3d352e"
  },
  productPrice: {
    paddingVertical: 6,
    width: 100,
    borderRadius: 8,

    backgroundColor: "#fff6ee"
  },
  productPriceText: {
    color: "#ffb056",
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center"
  }
})

function CoinsCount({ coins }) {
  return (
    <View style={[S.flexRow, S.alignCenter]}>
      <Image style={_S.coinsCountIcon} source={require("../asset/image/coin.png")} />
      <Text style={_S.coinsCountText}>
        <Text style={_S.coinsCountNumber} karet-lift>{coins}</Text>
        <Text> coins available</Text>
      </Text>
    </View>
  )
}

const productMapping = {}
function Products({ state }) {
  const products = U.view("products", state)

  const animationOpacity = new Animated.Value(R.isNil(products.get()) ? 0 : 1)
  const productsStyle = {
    opacity: animationOpacity
  }

  function progressTo(n) {
    Animated.timing(
      animationOpacity,
      {
        toValue: n,
        duration: 200,
        useNativeDriver: true
      }
    ).start()
  }

  async function loadProducts() {
    const rslt = await initConnection()

    return rslt ? getProducts(skus) : []
  }

  return (
    <Fragment>
      <Fragment>
        { U.when(R.isNil(products),
          U.consume(
            U.actions(U.set(products), () => progressTo(1)),
            U.fromPromise(loadProducts)
          )
        ) }
      </Fragment>
      <Fragment>
        { U.ifElse(R.isNil(products),
          <View style={[S.flex, S.justifyCenter]}>
            <ActivityIndicator />
          </View>
          ,
          <Animated.ScrollView style={[S.flex, productsStyle]}>
            <View style={_S.products} karet-lift>
              { U.mapElemsWithIds("productId", (product, id) => {
                const amount = U.thru(
                  product,
                  U.view("description"),
                  U.mapValue(parseInt),
                )
                const price = U.view("localizedPrice", product)

                return (
                  <Product
                    key={id}
                    amount={amount}
                    price={price}
                    onPress={U.mapValue(
                      amount => async () => {
                        productMapping[id] = amount
                        showProcessingModal()
                        try {
                          await requestPurchase(id)
                        } catch (e) {
                          hideProcessingModal()
                        }
                      },
                      amount
                    )}
                  />
                )
              }, products) }
            </View>
          </Animated.ScrollView>
        ) }
      </Fragment>
    </Fragment>
  )
}

function Product({ onPress, amount, price }) {
  return (
    <TouchableOpacity onPress={onPress} karet-lift>
      <View style={[S.flexRow, S.alignCenter, S.justifyBetween, _S.product]}>
        <View style={[S.flexRow, S.alignCenter]}>
          <Image source={require("../asset/image/coin.png")} />
          <Text style={_S.productDesc}>
            <Text style={_S.productCoinAmount} karet-lift>{amount}</Text>
            <Text> coins</Text>
          </Text>
        </View>

        <View style={_S.productPrice}>
          <Text style={_S.productPriceText} karet-lift>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const receiptMapping = {}
export default function CoinsStore({
  state = U.view("coinsStore", C.gstate),
  userData = U.view("userData", C.gstate),
}) {
  const { coins } = U.destructure(userData)

  const updateListener = purchaseUpdatedListener((purchase) => {
    const { transactionId, productId } = purchase

    if (receiptMapping[transactionId] === undefined) {
      receiptMapping[transactionId] = true
      const amount = productMapping[productId]
      if (!Number.isNaN(amount)) {
        coins.modify(R.add(amount))
      }

      hideProcessingModal()
      showInfoModal("Purchased")
    }
  })
  const errorListener = purchaseErrorListener(async () => {
    await hideProcessingModal()
    Alert.alert("failed to purchase")
  })

  return (
    <SafeArea>
      <Fragment>
        { U.onUnmount(() => {
          updateListener.remove()
          errorListener.remove()
        }) }
      </Fragment>
      <Header title="Coins Store" />
      <Products state={state} />
    </SafeArea>
  )
}

const coins = U.view(["userData", "coins"], C.gstate)
CoinsStore.navigationOptions = {
  headerRight: (
    <CoinsCount coins={coins} />
  )
}
