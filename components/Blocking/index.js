import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';

export default class Blocking extends React.Component {
  
  // componentDidMount(){
  //   setInterval(() => {
  //     for(let i =0; i < 500; i ++){
  //       console.log('blocking thread');
      
  //     }
  //   }, 5000);
  // }
  
  translateX = new Animated.Value(0);

  onGestureEvent = Animated.event([{
    nativeEvent: {
      translationX: this.translateX
    }
  }], {
    // useNativeDriver: true
  });

  onHandlerStateChange = event => {
    if(event.nativeEvent.oldState == State.ACTIVE ){
      Animated.timing(this.translateX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <PanGestureHandler 
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}
        >
          <Animated.View style={[styles.box, {transform: [{translateX: this.translateX}]}]}/>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});