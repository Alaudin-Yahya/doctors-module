import React from "react";
import HomeScreen from "./Home";
import DetailScreen from "./details";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Screen1 from "./Screens/Screen1";
// import Screen2 from "./Screens/Screen2";
// import Screen3 from "./Screens/Screen3";
// import Screen4 from "./Screens/Screen4";
import WebView from "./WebView";
import Appointments from "./Appointments";
import Patients from "./Patients";

const Tab = createMaterialBottomTabNavigator();

export default MainTabScree = (props) => {
  console.log('propstab', props.route.params.email)
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
          // email = {props.route.params}
      activeColor="#05375a"
      style={{ backgroundColor: "#05375a" }}
      // initialParams={{ email: props.route.params.email }}
      
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ email: props.route.params.email }}
        // email= {props.route.params.email}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#00b5ec",
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: "Appointments",
          tabBarColor: "#00b5ec",

          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="calendar" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Patients"
        component={Patients}
        options={{
          tabBarLabel: "Patients",
          tabBarColor: "#00b5ec",

          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="plus" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="WebView"
        initialParams={{ data: "" }}
        component={WebView}
        initialParams={{ data:" " ,email: props.route.params.email }}
        
        options={{
          tabBarLabel: "Web View",
          tabBarColor: "#00b5ec",

          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="qrcode" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
