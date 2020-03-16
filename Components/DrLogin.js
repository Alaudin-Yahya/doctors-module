import React, { Component } from "react";
import axios from "axios";
import { Icon } from "react-native-elements";
import DrProfile from "./DrProfile";
// import { DrawerNavigator } from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Picker,
  KeyboardAvoidingView
} from "react-native";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSignup = e => {
    fetch("http://instrux.live/doctors_module/api/doctor-login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          response: data
        })
      );
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  render() {
    // var response = this.state.response;
    console.log(this.state.response)
    return (
      <KeyboardAvoidingView behaviour="position">
          <View
            style={styles.container}
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 40, color: "#00b5ec" }}
            >
              Login
            </Text>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Icon name="envelope" type="font-awesome" color="#00b5ec" />
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={email => this.setState({ email })}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                />
              </View>
              {/* <Text>You are {this.state.email}</Text> */}
              <View style={styles.inputContainer}>
                <Icon name="lock" type="font-awesome" color="#00b5ec" />

                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({ password })}
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                />
              </View>
              {/* <Text>You are {this.state.password}</Text> */}
              {/* <Text>You are {this.state.address}</Text> */}
              {/* <Text style={styles.color}>Speciality</Text> */}
              {
                this.state.response === '0' && <Text style={styles.responseText}>Incorrect Email or Password</Text>
              }
              <TouchableHighlight
                underlayColor="#00b5ec"
                style={[styles.buttonContainer, styles.signupButton]}
                onPress={this.handleSignup}
              >
                <Text style={styles.signUpText}>Login</Text>
              </TouchableHighlight>
              <Text
                onPress={() => this.props.navigation.navigate("VerifyEmail")}
                style={{
                  color: "#00b5ec",
                  fontSize: 15,
                  textDecorationLine: "underline"
                }}
              >
                Forgot Password?
              </Text>
              <Text
                style={{ color: "#00b5ec", marginBottom: 50, marginTop: 5 }}
              >
                Not Registered?
                {"  "}
                <Text
                  onPress={() => this.props.navigation.navigate("signup")}
                  style={{
                    color: "#00b5ec",
                    fontSize: 15,
                    textDecorationLine: "underline"
                  }}
                >
                  Register
                </Text>
              </Text>
              <Text>{"\n\n\n\n\n\n\n\n\n"}</Text>
            </View>
          </View>
        
        {this.state.response !== "" &&
          this.state.response !== "0" &&
          (console.log("runninggggggggggggggggg"),
          this.props.navigation.navigate("DrProfile", {
            // ProfileData: this.state.response,
            // password: this.state.password
            email: this.state.email
          }))
          }
          
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  responseText: {
    color: "rgb(255,0,0)",
    fontSize: 15
  },
  color: {
    color: "#00b5ec"
  },
  container: {
    paddingTop: 100,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  formContainer: {
    marginTop: 50
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
    borderWidth: 1,
    marginTop: 10
  },
  signUpText: {
    color: "#ffffff"
  }
});
