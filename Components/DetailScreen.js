import React, { Component } from "react";
import DrSignup from "./Components/DrSignup";
import DrLogin from "./Components/DrLogin";
import { Icon } from "react-native-elements";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Button
} from "react-native";
export class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}
