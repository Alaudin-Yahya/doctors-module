// In App.js in a new project

import * as React from "react";

import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import DrawerComp from "./Drawer";

import Header from "./header";
import Home from "./Home";
import Details from "./details";
import FirstPage from "./FirstPage";
import SplashScreen from "./SplashScreen";
import RootStackScreen from "./RootStackScreen";
import { Icon } from "react-native-elements";
import MainTabScreen from "./MainTabScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { navigationRef } from './RootNavigation';

const HomeStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen />
      {/* <Stack.Navigator initialRouteName="">
        <Stack.Screen name="SplashScreen" component={<SplashScreen/>} />
        <Stack.Screen
          name="FirstPage"
          component={FirstPage}
          options={{
            headerTitle: () => <Header />,
            headerStyle: {
              backgroundColor: "#009378",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 14,
              textAlign: "center",
            },
          }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen
          name="DrawerComp"
          component={DrawerComp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator> */}
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />

      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
