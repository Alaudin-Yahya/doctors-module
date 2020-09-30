import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
const { width, height } = Dimensions.get("screen");

class WebViewQRScanner extends Component {
  static navigationOptions = {
    header: null,
  };
  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false, // scanned
    response: "",
  };
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ type, data }) => {
    fetch("http://instrux.live/doctors_module/api/scanned-qr.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        code: data,
        email: this.props.route.params.email,
        // location: this.state.location
      }),
    })
      .then((response) => response.text())
      .then((data) =>
        this.setState({
          response: data,
        })
      )
      .then(
        console.log(
          this.state.response,
          "response of data submission thrugh scanned qr"
        )
      );
    // Do something here
    console.log(data);
    // alert(data);
    this.props.navigation.navigate("WebView", {
      data: data,
    });
  };
  render() {
    const { hasCameraPermission, isScanned } = this.state;
    // console.log(this.props.navigation)
    if (hasCameraPermission === null) {
      // requesting permission
      return (
        // <Spinner />
        <Text
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          Loading..
        </Text>
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
            alignItems: "center",
          }}
        >
          <Text>Scan code inside window {this.state.data}</Text>
          <BarCodeScanner
            onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanned}
            style={{
              height: height / 2,
              width: height,
            }}
          ></BarCodeScanner>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading..</Text>
        </View>
      );
    }
  }
}

export default WebViewQRScanner;
