import React, { Component, useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Button,
} from "react-native";

class App extends Component {
  state = {};
  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Button
          title="jaooo"
          onPress={() =>
            this.props.navigation.navigate("DrawerComp", {
              itemId: 86,
              otherParam: "anything you want here",
            })
          }
        ></Button>
      </View>
    );
  }
}

export default App;
