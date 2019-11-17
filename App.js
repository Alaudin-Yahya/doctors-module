import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './home';
import { Table, Row, Rows } from 'react-native-table-component';

export default function App() {
  return (
    <View>
      <Home/>
      {/* <Text>finally expo runs !!!</Text> */}
    </View>
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
