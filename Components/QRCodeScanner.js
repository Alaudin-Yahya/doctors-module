import React from "react";

// import { Container, Spinner, TextH3 } from "../UI";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation";

import * as Permissions from "expo-permissions";
import { StackNavigator } from "react-navigation";
import CodeResult from "./CodeResult";
import { BarCodeScanner } from "expo-barcode-scanner";
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TouchableOpacity
//   } from 'react-native';

//import {window} from "../constants/Layout";
const { width, height } = Dimensions.get("screen");

export class ScannerScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false, // scanned
    response: ""
  };
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ type, data }) => {
    // Do something here
    console.log(data);
    // alert(data);
    this.props.navigation.navigate("CodeResult", {
      data: data
    });

    fetch("http://instrux.live/doctors_module/api/scanned-qr.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        code: data,
        email:this.props.navigation.state.params.email
        // location: this.state.location
      })
    })
      .then(response => response.text())
      .then(data =>
        this.setState({
          response: data
        })
      )
      .then(console.log(this.state.response));





  };
  render() {
    const { hasCameraPermission, isScanned } = this.state;
    // console.log(this.props.navigation)
    if (hasCameraPermission === null) {
      // requesting permission
      return (
        // <Spinner />
        <Text>Loading..</Text>
      );
    }
    if (hasCameraPermission === false) {
      //permission denied
      return (
        <View>
          <Text>Please grant Camera permission</Text>
        </View>
      );
    }
    if (
      hasCameraPermission === true &&
      !isScanned &&
      this.props.navigation.isFocused()
    ) {
      // we have permission and this screen is under focus
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Scan code inside window</Text>
          <BarCodeScanner
            onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanned}
            style={{
              height: height / 2,
              width: height
            }}
          ></BarCodeScanner>
        </View>
      );
    } else {
      return <Text>loading..</Text>;
    }
  }
}
//export default ScannerScreen;
export default createStackNavigator({
  home: ScannerScreen,
  CodeResult: CodeResult
  //   login: DrLogin,
  //   signup: DrSignup,
  //   profile: DrProfile
});
