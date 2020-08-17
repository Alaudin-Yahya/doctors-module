import React, { Component } from "react";
import { View, Text } from "react-native";

class Screen1 extends Component {
  state = {};
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text>Appointments</Text>
      </View>
    );
  }
}

export default Screen1;
