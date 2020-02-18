import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Blocking from './components/Blocking';
import Scale from './components/Scale';
import LoadingBackground from './components/LoadingBackground';
import CustomLogin from './components/CustomLogin';

export default function App() {
  return (
    // <CustomLogin/>
    // <LoadingBackground/>
    <Scale/>
    // <Blocking/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
