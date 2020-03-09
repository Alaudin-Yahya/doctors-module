import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image
} from "react-native";
import { createStackNavigator } from "react-navigation";
import DrLogin from "./Components/DrLogin";
import QRCode from "./Components/QRGenerator";
import DrSignup from "./Components/DrSignup";
import ForgetPassword from "./Components/ForgetPassword";
import DrProfile from "./Components/DrProfile";
import EditProfile from "./Components/EditProfile";
import ChangePassword from "./Components/ChangePassword";
import VerifyPassword from "./Components/VerifyPassword";
import QRScanner from "./Components/QRCodeScanner";

class HelloWorldApp extends Component {
  state = {};
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center"
        }}
        style={{
          backgroundColor: "#ffffff",
          paddingTop: 70
        }}
      >
        <Image style={styles.stretch} source={require("./assets/splash.png")} />
        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          underlayColor="#00b5ec"
          onPress={() => this.props.navigation.navigate("signup")}
        >
          <Text style={styles.signUpText}>Signup</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate("login")}
          underlayColor="#00b5ec"
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate("QRCode")}
          underlayColor="#00b5ec"
        >
          <Text style={styles.loginText}>Change</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export default createStackNavigator({
  home: HelloWorldApp,
  login: DrLogin,
  signup: DrSignup,
  ForgetPassword: ForgetPassword,
  DrProfile: DrProfile,
  EditProfile: EditProfile,
  ChangePassword: ChangePassword,
  VerifyPassword: VerifyPassword,
  QRScanner: QRScanner
});
const styles = StyleSheet.create({
  color: {
    color: "#00b5ec"
  },
  container: {
    paddingTop: 30,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  formContainer: {
    marginTop: 30
  },
  inputContainer: {
    borderBottomColor: "#00b5ec",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    color: "#00b5ec"
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  signupButton: {
    backgroundColor: "#00b5ec",
    borderColor: "#00b5ec",
    borderWidth: 1.5
  },
  loginButton: {
    backgroundColor: "#00b5ec",
    borderColor: "#00b5ec",
    borderWidth: 1.5
  },
  signUpText: {
    color: "#ffffff"
  },
  loginText: {
    color: "#ffffff"
  }
});

// import RNLocation from 'react-native-location';

// RNLocation.configure({
//   distanceFilter: 5.0
// })

// RNLocation.requestPermission({
//   ios: "whenInUse",
//   android: {
//     detail: "coarse"
//   }
// }).then(granted => {
//     if (granted) {
//       this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
//         /* Example location returned
//         {
//           speed: -1,
//           longitude: -0.1337,
//           latitude: 51.50998,
//           accuracy: 5,
//           heading: -1,
//           altitude: 0,
//           altitudeAccuracy: -1
//           floor: 0
//           timestamp: 1446007304457.029,
//           fromMockProvider: false
//         }
//         */
//       })
//     }
//   })

// import React, { Component } from 'react';
// import {
//   Platform,
//   Text,
//   View,
//   StyleSheet,
//   Button,
//   Linking,
//   AppState
// } from 'react-native';
// // import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// import * as IntentLauncher from 'expo-intent-launcher';
// // import * as Expo from 'expo';
// import Modal from 'react-native-modal';
// export default class App extends Component {
//   state = {
//     location: null,
//     errorMessage: null,
//     isLocationModalVisible: false,
//     appState: AppState.currentState,
//     message:''
//   };

//   componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
//   }

//   handleAppStateChange = nextAppState => {
//     if (
//       this.state.appState.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       console.log('App has come to the foreground!');
//       this._getLocationAsync();
//     }
//     this.setState({ appState: nextAppState });
//   };

//   componentWillMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
//     // if (Platform.OS === 'android') {
//     //   this.setState({
//     //     errorMessage:
//     //       'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
//     //   });
//     // }
//     // else {
//       this._getLocationAsync();
//     // }
//   }

//   _getLocationAsync = async () => {
//     try {
//       let { status } = await Permissions.askAsync(Permissions.LOCATION);
//       if (status !== 'granted') {
//         this.setState({
//           errorMessage: 'Permission to access location was denied'
//         });
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       // location = await Location.reverseGeocodeAsync(location);
//       this.setState({ location });
//       fetch("https://doctors-module.000webhostapp.com/api/location.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       // body:  JSON.stringify(data)
//       body: JSON.stringify({
//         location: this.state.location
//       })
//       })
//       .then(response => response.text())
//       .then(data =>
//         this.setState({
//           message:data
//         })
//       );
//     } catch (error) {
//       let status = Location.getProviderStatusAsync();
//       if (!status.locationServicesEnabled) {
//         this.setState({ isLocationModalVisible: true });
//       }
//     }
//   };

//   openSetting = () => {
//     if (Platform.OS == 'ios') {
//       Linking.openURL('app-settings:');
//     } else {
//       IntentLauncher.startActivityAsync(
//         IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
//       );
//     }
//     this.setState({ openSetting: false });
//     return;
//   };

//   render() {
//     let text = 'Waiting..';
//     if (this.state.errorMessage) {
//       text = this.state.errorMessage;
//     } else if (this.state.location) {
//       text = JSON.stringify(this.state.location);
//     }
//     console.log(this.state.message)
//     return (
//       <View style={styles.container}>
//         <Modal
//           onModalHide={this.state.openSetting ? this.openSetting : undefined}
//           isVisible={this.state.isLocationModalVisible}
//         >
//           <View
//             style={{
//               height: 300,
//               width: 300,
//               backgroundColor: 'white',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//           >
//             <Button
//               onPress={() =>
//                 this.setState({
//                   isLocationModalVisible: false,
//                   openSetting: true
//                 })
//               }
//               title="Enable Location Services"
//             />
//           </View>
//         </Modal>
//         <Text style={styles.paragraph}>{text}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1'
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: 'center'
//   }
// });
