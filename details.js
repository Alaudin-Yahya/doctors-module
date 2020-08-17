import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";

const DetailStack = createStackNavigator();
export default DetailStackScreen = ({ navigation }) => {
  return (
    <DetailStack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b5ec",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 14,
          marginLeft: -60,
          textAlign: "center",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={{ position: "relative" }}>
              <Icon
                style={{ paddingLeft: 10 }}
                name="menu"
                type="feather"
                size={26}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <DetailStack.Screen name="Details" component={Details} />
    </DetailStack.Navigator>
  );
};

class Details extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        {/* <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push("Details")}
          color="#00b5ec"
        />
        <Button
          title="Go to Drawer"
          onPress={() => this.props.navigation.navigate("Drawer")}
          color="#00b5ec"
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          color="#00b5ec"
        />
        <Button
          title="Go back to first screen in stack"
          onPress={() => this.props.navigation.popToTop()}
          color="#00b5ec"
        /> */}
      </View>
    );
  }
}
