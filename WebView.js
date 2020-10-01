import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

import Header from "./header";

import { Icon } from "react-native-elements";

const WebViewStack = createStackNavigator();
const WebViewStackScreen = ({ navigation, props }) => {
  return (
    <WebViewStack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b5ec",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 14,
          flex: 1,
          textAlign: "center",
        },
        headerLeft: () => (
          <View
            style={{
              width: 40,
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="bars" type="font-awesome" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              width: 40,
            }}
          >
            <Text>{typeof navigation.getParams("data")}</Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text
                style={{
                  position: "absolute",
                  right: 8,
                  top: -5,
                  zIndex: 1,
                  backgroundColor: "red",
                  color: "#fff",
                  paddingVertical: 1,
                  paddingHorizontal: 4,
                  borderRadius: 20,
                  fontSize: 10,
                }}
              >
                3
              </Text>
              <Icon name="bell" type="font-awesome" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <WebViewStack.Screen name="WebView" component={WebView} />
    </WebViewStack.Navigator>
  );
};

export default class WebView extends Component {
  //   state = {
  //     data:
  //       this.props.route.params.data != null ? this.props.route.params.data : "",
  //   };
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#00b5ec",
            paddingBottom: 4,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="bars"
                  type="font-awesome"
                  color="#fff"
                  size={22}
                  style={{ width: 40 }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Doctors Web
              </Text>
              <View
                style={{
                  width: 40,
                }}
              >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Text
                    style={{
                      position: "absolute",
                      right: 8,
                      top: -5,
                      zIndex: 1,
                      backgroundColor: "red",
                      color: "#fff",
                      paddingVertical: 1,
                      paddingHorizontal: 4,
                      borderRadius: 20,
                      fontSize: 10,
                    }}
                  >
                    3
                  </Text>
                  <Icon
                    name="bell"
                    type="font-awesome"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderColor: "#00b5ec",
              marginTop: 10,
              borderWidth: 1,
              height: 40,
            }}
            onPress={() => this.props.navigation.navigate("WebViewQRScanner", {email: this.props.route.params.email})}
          >
            <LinearGradient
              style={{
                width: "102%",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderColor: "#00b5ec",
                borderWidth: 1,
                height: 40,
              }}
              colors={["#00b5ec", "#009398"]}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                Scan QR code
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text>
            {this.props.route.params.data.length === 0 ? null : (
              <Text>{this.props.route.params.data}</Text>
            )}
          </Text>
        </View>
      </View>
    );
  }
}
