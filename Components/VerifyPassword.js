import React, { Component } from "react";
import axios from "axios";
import { Icon } from "react-native-elements";
import DrLogin from "./DrLogin";

import { createStackNavigator } from "react-navigation";

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
  Linking,
  AppState,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import ValidationComponent from "react-native-form-validator";

export default class VerifyPassword extends ValidationComponent {
  constructor(props) {
    super(props);
    const { ProfileData } = this.props.navigation.state.params;
    this.ProfileData = ProfileData;
    this.state = {
      password: "",
      passwordThroughProps: this.props.navigation.state.params.password,
      verification: "0"
    };
  }

  CheckPassword = e => {
    console.log(this.state);
    console.log(this.props.navigation.state.params);
    var validatePassword = this.validate({
      password: { required: true, minlength: 1, maxlength: 30 }
    });
    if (validatePassword) {
      if (this.state.password === this.state.passwordThroughProps) {
        this.setState({
          verification: "1"
        });
        // this.props.navigation.navigate("ChangePassword", {
        //   ProfileData: this.props.navigation.state.params.ProfileData
        // });
      } else {
        alert("The Password you entered is Incorrect");
      }
    } else {
      alert("Password must contain alteast 8 characters");
    }
  };
  render() {
    return (
      <ScrollView>
        {this.state.verification !== "1" && (
          <View
            style={styles.container}
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
            }}
          >
            <KeyboardAvoidingView behavior="position">
              <View style={styles.imageContainer}>
                <Image
                  style={styles.stretch}
                  source={require("../assets/splash.png")}
                />
              </View>
              <View style={styles.formContainer}>
                <Text
                  style={{
                    fontSize: 20,
                    shadowOpacity: 10,
                    paddingBottom: 10,
                    textAlign: "center",
                    color: "#00b5ec"
                  }}
                >
                  Verify Password
                </Text>
                <View style={styles.inputContainer}>
                  <Icon name="lock" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Current Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={password => this.setState({ password })}
                    returnKeyType={"go"}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                    }}
                  />
                </View>
                <TouchableHighlight
                  style={[styles.buttonContainer, styles.signupButton]}
                  underlayColor="#00b5ec"
                  onPress={this.CheckPassword}
                >
                  <Text style={styles.signUpText}>Next</Text>
                </TouchableHighlight>
              </View>
            </KeyboardAvoidingView>

            {<Text>{"\n\n\n\n\n\n\n\n\n\n\n"}</Text>}
          </View>
        )}
        {this.state.verification === "1" &&
          this.props.navigation.navigate("ChangePassword", {
            ProfileData: this.props.navigation.state.params.ProfileData
          })}
      </ScrollView>
    );
  }
}
// export default SignUpView({
//   login: DrLogin
// });
const styles = StyleSheet.create({
  imageContainer: {
    // marginTop: 100
    alignItems: "center",
    marginTop: 30
  },
  stretch: {
    height: 100,
    width: 200
  },
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
    marginTop: 70
  },
  inputContainer: {
    borderBottomColor: "#00b5ec",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 5
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
