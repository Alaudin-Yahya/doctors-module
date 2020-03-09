import React, { Component } from "react";
import { Icon } from "react-native-elements";
import ConfirmPasswordCode from "./ConfirmPasswordCode";
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
import ValidationComponent from "react-native-form-validator";

class VerifyEmail extends ValidationComponent {
  state = {
    responseForEmail: "0",
    msg: null
  };

  handleVerify = e => {
    var validateEmail = this.validate({
      email: { email: true, required: true }
    });
    if (validateEmail) {
      fetch(
        "https://doctors-module.000webhostapp.com/api/verify-email-forget-password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body:  JSON.stringify(data)
          body: JSON.stringify({
            email: this.state.email
          })
        }
      )
        .then(response => response.text())
        .then(data =>
          this.setState({
            responseForEmail: data,
            auth: true,
            msg: data
          })
        )

        .then(
          console.log(
            typeof this.state.responseForEmail,
            this.state.responseForEmail
          )
        );
    } else {
      alert("Enter a valid Email Address111111");
    }
  };

  render() {
    return (
      <View>
        {this.state.responseForEmail === "0" && (
          <KeyboardAvoidingView behavior="position">
            <View style={styles.container}>
              <Text
                style={{ fontWeight: "bold", fontSize: 40, color: "#00b5ec" }}
              >
                Verify Email
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
                {this.state.msg !== null && (
                  <Text>No such account exist!!</Text>
                )}
                <TouchableHighlight
                  underlayColor="#00b5ec"
                  style={[styles.buttonContainer, styles.forgetpassButton]}
                  onPress={this.handleVerify}
                >
                  <Text style={styles.forgetpassText}>Verify</Text>
                </TouchableHighlight>
                {/* <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text> */}
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
        {this.state.responseForEmail === "1" && (
          <ConfirmPasswordCode email={this.state.email} />
        )}
      </View>
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
    height: "100%",
    // justifyContent: "center",
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
  forgetpassButton: {
    backgroundColor: "#00b5ec",
    borderColor: "#00b5ec",
    borderWidth: 1,
    marginTop: 10
  },
  forgetpassText: {
    color: "#ffffff"
  }
});
export default VerifyEmail;
