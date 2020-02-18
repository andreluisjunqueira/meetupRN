import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { onGestureEvent, timing } from 'react-native-redash';
import Svg, { Circle, ClipPath, Image } from 'react-native-svg';
import {Ionicons} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const { Value,
  event,
  block,
  cond,
  eq,
  set,
  concat,
  interpolate,
  Extrapolate
} = Animated;

export default function CustomLogin() {
  const DURATION = 300;
  
  const opacity = new Value(1);

  const onGestureHandler = event([
    {nativeEvent: ({state}) => block([
      cond(eq(state, State.END), [
        set(opacity, timing({from: 1, to: 0, duration: DURATION})),
      ])
    ])}
  ]);

  const onCloseHandler = event([
    {nativeEvent: ({state}) => block([
      cond(eq(state, State.END), [
        set(opacity, timing({from: 0, to: 1, duration: DURATION})),
      ]),
    ])}
  ]);
  
  const backgroundY = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [(-height / 3) - 50, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const opacityInputs = interpolate(opacity,{
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  
  const zIndexInputs = interpolate(opacity,{
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const inputsY = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [0, height/3],
    extrapolate: Extrapolate.CLAMP
  })
  
  const buttonsY = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [height/3, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const closeRotate = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [180, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const imageHeight = height + 50;
  return (
    <View style={styles.container}>
      <Animated.View style={{...styles.imageContainer, transform: [{translateY: backgroundY}]}}>
        <Svg width={width} height={imageHeight}>
          <ClipPath id="circle">
            <Circle r={imageHeight} cx={width / 2}/>
          </ClipPath>
          <Image
            href={require('../../assets/bg.jpg')}
            width={width}
            height={imageHeight}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#circle)"
          />
        </Svg>
      </Animated.View>
      <Animated.View style={{
        ...styles.bottom, 
        opacity, 
        zIndex: zIndexInputs,
        transform: [{translateY: buttonsY}]
      }}>
        <TapGestureHandler onHandlerStateChange={onGestureHandler}>
          <Animated.View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View style={{...styles.button, backgroundColor: '#3b5998'}}>
          <Text style={{...styles.buttonText, color: '#fff'}}>Login with facebook</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View style={{
          ...styles.bottomInputs, 
          opacity: opacityInputs,
          transform: [{translateY: inputsY}]
        }}>
        <TapGestureHandler onHandlerStateChange={onCloseHandler}>
          <Animated.View style={{...styles.closeButton, transform:[{rotate: concat(closeRotate, 'deg')}]}}>
            <Ionicons name="md-close" size={25}/>
          </Animated.View>
        </TapGestureHandler>
        <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#000'/>
        <TextInput style={styles.input} placeholder='Senha' secureTextEntry placeholderTextColor='#000'/>
        <TapGestureHandler>
          <Animated.View style={{...styles.button, ...styles.buttonLogin}}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end'
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  bottom: {
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  button: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignSelf: 'stretch',
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonLogin: {
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  bottomInputs: {
    ...StyleSheet.absoluteFillObject,
    top: null,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 10
  },
  input: {
    height: 60,
    borderRadius: 30,
    alignSelf: 'stretch',
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 15
  },
  closeButton: {
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35
  }
});
