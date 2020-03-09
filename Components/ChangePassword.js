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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import Modal from "react-native-modal";
import ValidationComponent from "react-native-form-validator";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import NewPassword from "./NewPassword";

export default class ChangePassword extends ValidationComponent {
  constructor(props) {
    super(props);
    const { ProfileData } = this.props.navigation.state.params;
    this.ProfileData = ProfileData;
    this.state = {
      //   name: this.ProfileData.doctor_name,
      email: this.ProfileData.doctor_email,
      //   timing: this.ProfileData.doctor_timing,
      //   address: this.ProfileData.doctor_address,
      //   phone: this.ProfileData.doctor_phone,
      //   speciality: this.ProfileData.doctor_speciality,
      //   auth_code: 0,
      confirmNewPassword: "",
      NewPassword: "",
      response: "",
      form: 1
    };
  }

  ChangePassword = e => {
    const data = this.state;
    var validateNewPassword = this.validate({
      NewPassword: { required: true, minlength: 8, maxlength: 30 }
    });
    var validateConfirmNewPassword = this.validate({
      confirmNewPassword: { required: true, minlength: 8, maxlength: 30 }
    });

    if (this.state.NewPassword === this.state.confirmNewPassword) {
      if (validateNewPassword && validateConfirmNewPassword) {
        console.log("sending data");
        fetch(
          "https://doctors-module.000webhostapp.com/api/change-password.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body:  JSON.stringify(data)
            body: JSON.stringify({
              password: this.state.NewPassword,
              email: this.state.email
            })
          }
        )
          .then(response => response.text())
          .then(data => console.log("response is ", data, typeof data))
          .then(
            this.setState({
              response: data
            })
          );
      } else if (!validateNewPassword) {
        alert("New Password must contain alteast 8 characters");
      } else if (!validateConfirmNewPassword) {
        alert("Password must contain alteast 8 characters");
      }
    } else {
      alert("Password do not match");
    }
  };
  render() {
    return (
      <ScrollView>
        {console.log(
          this.state.response,
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        )}
        {(this.state.response === "" || this.state.response === "0") && (
          <View
            style={styles.container}
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
            }}
          >
            {this.state.form && (
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
                    Change Password
                  </Text>
                  <View style={styles.inputContainer}>
                    <Icon name="lock" type="font-awesome" color="#00b5ec" />
                    <TextInput
                      style={styles.inputs}
                      placeholder="New Password"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      onChangeText={NewPassword =>
                        this.setState({ NewPassword })
                      }
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        this.secondTextInput.focus();
                      }}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon name="lock" type="font-awesome" color="#00b5ec" />

                    <TextInput
                      style={styles.inputs}
                      placeholder="Confirm New Password"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      onChangeText={confirmNewPassword =>
                        this.setState({ confirmNewPassword })
                      }
                      returnKeyType={"go"}
                      ref={input => {
                        this.secondTextInput = input;
                      }}
                    />
                  </View>
                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.signupButton]}
                    underlayColor="#00b5ec"
                    onPress={this.ChangePassword}
                  >
                    <Text style={styles.signUpText}>Change</Text>
                  </TouchableHighlight>
                </View>
              </KeyboardAvoidingView>
            )}
            {<Text>{"\n\n\n\n\n\n\n\n\n\n\n"}</Text>}
          </View>
        )}
        {this.state.response !== "" &&
          this.state.response !== "0" &&
          this.props.navigation.navigate("DrProfile", {
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
