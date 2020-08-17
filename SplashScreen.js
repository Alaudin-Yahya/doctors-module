import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image,
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";

export default class SplashScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            source={require("./assets/logo1.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.title}>
            Stay connected with Doctor and Stay Healthy!!
          </Text>
          <Text style={styles.text}>Signin with account</Text>
          <Animatable.View style={styles.button} animation="fadeInRight">
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <LinearGradient
                style={styles.signIn}
                colors={["#00b5ec", "#9398"]}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#fff"
                  size={14}
                  style={{ marginTop: 2, marginLeft: 5 }}
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("screen");
const height_logo = height * 0.2;
const width_logo = width * 0.85;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop:100
  },
  footer: {
    flex: 1,
    backgroundColor: "#00b5ec",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
    color: "#fff",
  },
  logo: {
    width: width_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
