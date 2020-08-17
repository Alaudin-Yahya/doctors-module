import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import DrawerComp from "./Drawer";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
import ChangePassword from "./ChangePassword";
import Modal from "./Modal";

import Settings from "./Settings";

const RootStack = createStackNavigator();

export default RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator>
      {/* <RootStack.Screen
        name="Modal"
        component={Modal}
        options={{
          headerShown: false,
        }}
      /> */}
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="DrawerComp"
        component={DrawerComp}
        initialParams={(email = "haad706")}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
