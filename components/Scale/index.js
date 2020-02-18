import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
// import { Container } from './styles';
const { 
  cond,
  eq,
  event,
  Value,
} = Animated;

export default function Scale() {

  const state = new Value(State.UNDETERMINED);

  const onStateChange = event([{
    nativeEvent: { state }
  }]);

  const scale = cond(eq(state, State.BEGAN), 1.1, 1)

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onStateChange}>
        <Animated.View style={[styles.buttom, {transform: [{scale}]} ]}>
          <Text style={styles.buttonText}>Continuar</Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttom: {
    height: 60,
    width: 350,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});