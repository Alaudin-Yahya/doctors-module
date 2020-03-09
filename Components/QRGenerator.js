import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import QRCode from "react-native-qrcode";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Text_Input: "",
      Text_Output: "https://www.google.com"
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>URL QR code </Text>
        <QRCode
          value={this.state.Text_Output}
          size={250}
          bgColor="#000"
          fgColor="#fff"
        />
        <Text>URL QR code </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    margin: 10,
    alignItems: "center",
    paddingTop: 20
  },
  TextInput: {
    height: 40,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    textAlign: "center",
    borderColor: "#fff"
  },
  TextStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff"
  }
});
