import * as React from "karet"
import * as U from "karet.util"
import { Component } from "react"
import * as R from "kefir.ramda"
import { Image, ImageBackground, View, Text, TextInput, StyleSheet } from "react-native"
import { Svg, Image as SvgImage, Defs, ClipPath, Polygon } from "react-native-svg"

import S from "./style"

const _S = StyleSheet.create({
  author: {
    color: "#855e3c",
    fontSize: 20,
    fontWeight: "700"
  },
  input: {
    color: "#855e3c",
    textAlign: "center"
  },
  image: {
    // to enforce the image to shrink down its real size
    width: "100%"
  },
  content: {
    lineHeight: 24
  },

  layout0: {
    paddingHorizontal: 24,
  },
  author0: {
    marginBottom: 35,
    color: "#ffa238",
    textAlign: "center"
  },
  content0: {
    lineHeight: 40,
  },
  input0: {
    maxHeight: 260,
    marginTop: -10,
    fontSize: 20
  },

  layout1: {
    paddingBottom: 25
  },
  author1: {
    marginRight: 24,
    marginTop: 22,
    textAlign: "right"
  },
  input1: {
    fontSize: 18,
    height: 129,
    marginTop: 20,
    marginHorizontal: 18
  },

  layout2: {
    paddingBottom: 25
  },
  author2: {
    marginRight: 24,
    marginTop: 22,
    textAlign: "right"
  },
  input2: {
    fontSize: 18,
    height: 105,
    marginTop: 20,
    marginHorizontal: 32
  },
  imageContainer2: {
    aspectRatio: 1,
    borderRadius: 400,
    overflow: "hidden",
    marginTop: 14,

    alignSelf: "center"
  },

  layout3: {
    paddingBottom: 25
  },
  author3: {
    marginTop: 22,
    textAlign: "center"
  },
  input3: {
    fontSize: 18,
    height: 105,
    marginTop: 20,
    marginHorizontal: 32
  },
  imageContainer3: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 32,

    overflow: "hidden"
  },

  layout4: {
    paddingBottom: 25
  },
  author4: {
    marginTop: 22,
    textAlign: "center"
  },
  input4: {
    fontSize: 18,
    height: 105,
    marginTop: -17,
    marginHorizontal: 32
  },

  author5: {
    marginTop: 40,
    textAlign: "center",
    color: "#ffffff"
  },
  input5: {
    color: "#ffffff",
    fontSize: 20,
    height: 130,
    marginHorizontal: 32
  }
})

function MyTextInput({ style, children, onChangeText, editable, editing, onFocus }) {
  function focusOrBlur(ref) {
    if (ref === null) {
      return
    }

    if (editing) {
      ref.focus()
    } else {
      ref.blur()
    }
  }

  return (
    <TextInput
      ref={focusOrBlur}
      style={style}
      onChangeText={onChangeText}
      editable={editable}
      scrollEnabled={editable}
      onFocus={onFocus}
      multiline
    >
      {children}
    </TextInput>
  )
}

export function Layout0({ author, content, onChangeContent, contentStyle, editable, editing, onFocus }) {
  return (
    <View style={S.flex}>
      <ImageBackground
        style={[S.flex, S.justifyCenter, _S.layout0]}
        source={require("../asset/image/layout0-bg.png")}
        resizeMode="contain"
      >
        <MyTextInput
          style={[_S.input, _S.input0, contentStyle]}
          onChangeText={onChangeContent}
          editable={editable}
          editing={editing}
          onFocus={onFocus}
        >
          <Text style={_S.content0}>{content}</Text>
        </MyTextInput>
      </ImageBackground>
      <Text style={[_S.author, _S.author0]}>{author}</Text>
    </View>
  )
}

export function Layout1({ author, content, onChangeContent, contentStyle, image, editable, editing, onFocus }) {
  return (
    <View style={[S.flex, _S.layout1]}>
      <Image style={[S.flex, _S.image]} source={image} />
      <MyTextInput
        style={[_S.input, _S.input1, contentStyle]}
        onChangeText={onChangeContent}
        editable={editable}
        editing={editing}
        onFocus={onFocus}
      >
        <Text style={_S.content}>{content}</Text>
      </MyTextInput>
      <Text style={[_S.author, _S.author1]}>{author}</Text>
    </View>
  )
}

export function Layout2({ author, content, onChangeContent, contentStyle, image, editable, editing, onFocus }) {
  return (
    <View style={[S.flex, _S.layout2]}>
      <View style={[S.flex, _S.imageContainer2]}>
        <Image style={[S.flex, _S.image]} source={image} />
      </View>
      <MyTextInput
        style={[_S.input, _S.input2, contentStyle]}
        onChangeText={onChangeContent}
        editable={editable}
        editing={editing}
        onFocus={onFocus}
      >
        <Text style={_S.content}>{content}</Text>
      </MyTextInput>
      <Text style={[_S.author, _S.author2]}>{author}</Text>
    </View>
  )
}

export function Layout3({ author, content, onChangeContent, contentStyle, image, editable, editing, onFocus }) {
  return (
    <View style={[S.flex, _S.layout3]}>
      <View style={[S.flex, _S.imageContainer3]}>
        <Image style={[S.flex, _S.image]} source={image} />
      </View>
      <MyTextInput
        style={[_S.input, _S.input3, contentStyle]}
        onChangeText={onChangeContent}
        editable={editable}
        editing={editing}
        onFocus={onFocus}
      >
        <Text style={_S.content}>{content}</Text>
      </MyTextInput>
      <Text style={[_S.author, _S.author3]}>{author}</Text>
    </View>
  )
}

// a native react component to work-around react-native-svg issue
export class Layout4 extends Component {
	constructor() {
		super()
		this.state = {
			width: 0,
			height: 0,
		}
	}

	setSvgDimension(e) {
		this.setState({
			width: e.nativeEvent.layout.width,
			height: e.nativeEvent.layout.height,
		})
	}

	render() {
		const { author, content, onChangeContent, contentStyle, image, editable, editing, onFocus } = this.props
		const { width, height } = this.state

		return (
			<View style={[S.flex, _S.layout4]}>
				<View style={S.flex} onLayout={e => this.setSvgDimension(e)}>
					<Svg
						width={`${width}`}
						height={`${height}`}
						viewBox={`0 0 ${width} ${height}`}
					>
						<Defs>
							<ClipPath id="clip">
								<Polygon points={`0 0 ${width} 0 ${width} ${height} 0 ${R.subtract(height, 115)}` } />
							</ClipPath>
						</Defs>

						<SvgImage
							x="0%"
							y="0%"
							width="100%"
							height="100%"
							href={image}
							preserveAspectRatio="xMidYMid slice"
							clipPath="url(#clip)"
						/>
					</Svg>
				</View>
				<MyTextInput
					style={[_S.input, _S.input4, contentStyle]}
					onChangeText={onChangeContent}
					editable={editable}
					editing={editing}
					onFocus={onFocus}
				>
					<Text style={_S.content}>{content}</Text>
				</MyTextInput>
				<Text style={[_S.author, _S.author4]}>{author}</Text>
			</View>
		)
	}
}

export function Layout5({ author, content, onChangeContent, contentStyle, image, editable, editing, onFocus }) {
  return (
    <ImageBackground style={[S.flex, S.justifyCenter]} source={image}>
      <MyTextInput
        style={[_S.input, _S.input5, contentStyle]}
        onChangeText={onChangeContent}
        editable={editable}
        editing={editing}
        onFocus={onFocus}
      >
        <Text style={_S.content}>{content}</Text>
      </MyTextInput>
      <Text style={[_S.author, _S.author5]}>{author}</Text>
    </ImageBackground>
  )
}
