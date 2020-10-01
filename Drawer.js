import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Home from "./Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import Details from "./details";
// import FirstPage
import MainTabScreen from "./MainTabScreen";
import Settings from "./Settings";
import ChangePassword from "./ChangePassword"
import EditProfile from "./EditProfile";
import WebViewQRScanner from "./WebViewQRScanner";
import Screen2 from "./Screens/Screen2";

const Drawer = createDrawerNavigator();
class DrawerComp extends Component {
  state = {response:null, email:'', data:''};
  componentDidMount(){
    fetch("http://instrux.live/doctors_module/api/profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        email: this.props.route.params.email,
        
      }),
    }).then(response => response.json())
        .then(data =>
          this.setState({
            data: data
          })
        )
  }
  render() {
    console.log(this.state.data.doctor_name, "at drawer comp");
    return (
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContent {...props} email={this.props.route.params.email} data={this.state.data}/>
        )}
        activeBackgroundColor="#00b5ec"
      > 
      {console.log('draer',this.props.route.params.email)}
        <Drawer.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          initialParams={{ email: this.props.route.params.email }}
          // drawerContent={(props) => (
          //   <MainTabScreen {...props} email={this.props.route.params.email} />
          // )}
        />
        <Drawer.Screen name="Settings" component={Settings}/>
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        <Drawer.Screen name="EditProfile" component={EditProfile} />
        <Drawer.Screen name="WebViewQRScanner" component={WebViewQRScanner} />
        <Drawer.Screen name="Screen2" component={Screen2} />

        {/* <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="DrawerComp" component={DrawerComp} /> */}
      </Drawer.Navigator>
    );
  }
}

export default DrawerComp;
