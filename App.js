// import React, { Component } from "react";
// import DrSignup from "./Components/DrSignup";
// import DrLogin from "./Components/DrLogin";
// import {
//   Text,
//   View,
//   ScrollView,
//   TouchableHighlight,
//   Button
// } from "react-native";
// class HelloWorldApp extends Component {
//   render() {
//     return (
//       <ScrollView>
//         <DrSignup />
//         {/* <DrLogin /> */}
//       </ScrollView>
//     );
//   }
// }
// export default HelloWorldApp;

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
import DrSignup from "./Components/DrSignup";

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
          paddingTop: 90
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
          style={[styles.buttonContainer, styles.signupButton]}
          underlayColor="#00b5ec"
          onPress={() => this.props.navigation.navigate("login")}
        >
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
export default createStackNavigator({
  home: HelloWorldApp,
  login: DrLogin,
  signup: DrSignup
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
    borderWidth: 1
  },
  signUpText: {
    color: "#ffffff"
  }
});
