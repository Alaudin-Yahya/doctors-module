import React, { Component } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Screen2")}
        >
          <Text>Click here to Scan QR code</Text>
          {this.props.route.params.data.length === 0 ? (
            <Text>kch nahin aya abhi</Text>
          ) : (
            <Text>{this.props.route.params.data}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Screen1;
