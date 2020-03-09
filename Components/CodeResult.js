import React, { Component } from "react";
// import './images/uni1';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class CodeResult extends Component {
  render() {
    return (
      <View>
        <Text>heheheh+{this.props.navigation.getParam("data")}</Text>
      </View>
    );
  }
}
