import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { timing } from 'react-native-redash';

const { 
  cond,
  eq,
  event,
  lessThan,
  and,
  add,
  set,
  block,
  Value,
} = Animated;

export default function Scale() {

  // const state = new Value(State.UNDETERMINED);
  const loadingOffset = new Value(0);
  const loaded = new Value(0);

  const addLoading = add(loadingOffset, loaded);

  const onStateChange = event([{
    nativeEvent: ({ state }) => block([
      cond(and(eq(state, State.BEGAN), lessThan(loaded, 350)) , [
        set(loaded, timing({from: loadingOffset, to: 350, duration: 1000})),
        set(loadingOffset, addLoading)
      ],[
        cond(eq(state, State.CANCELLED), set(loaded, timing({from: 0, to: 350, duration: 1000})) )
        
      ])
    ])
  }]);

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onStateChange}>
        <Animated.View style={styles.buttom}>
          <Text style={styles.buttonText}>Continuar</Text>
          <Animated.View style={[styles.backgroundBtn, {width: loaded }]}/>
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
    alignItems: 'center',
    overflow: 'hidden'
  },
  backgroundBtn: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
    width: 0,
    zIndex: -1
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});