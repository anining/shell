import * as React from "karet"
import { StyleSheet, Animated, FlatList, View } from "react-native"

import S, { square } from "./style"

const _S = StyleSheet.create({
  foo: {
    backgroundColor: "red",
    ...square(60),
    margin: 10
  }
})

function Square({ x, index }) {
  let scale = x.interpolate({
    inputRange: [
      (index - 1) * 80,
      index * 80,
      (index + 1) * 80
    ],
    outputRange: [
      1.0,
      1.2,
      1.0
    ],
    extrapolate: "clamp"
  })

  let scaleStyle = {
    transform: [
      { scale }
    ]
  }

 return (
    <Animated.View style={[_S.foo, scaleStyle]}>
    </Animated.View>
  )
}

export default function FooPage() {
  const xs = [
0,
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13,
14,
15,
16,
17,
18,
19,
20,
21,
22,
23,
24,
25,
26,
27,
28,
29,
30,
  ]

  let v = new Animated.Value(0)

  return (
    <Animated.FlatList
      horizontal
      ListHeaderComponent={() => (
        <View style={{width: 147.5}}>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={{width: 147.5}}>
        </View>
      )}
      snapToInterval={80}
      onScroll={Animated.event(
        [ { nativeEvent: { contentOffset: { x: v } } } ],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      data={xs}
      renderItem={({ index }) => (
        <Square key={index} x={v} index={index} />
      )}
    />
  )
}
