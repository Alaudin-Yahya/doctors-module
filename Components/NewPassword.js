import React, { Component } from "react";
import { Icon } from "react-native-elements";
import Login from "./DrLogin";

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

class NewPassword extends ValidationComponent {
  state = {
    password: "",
    c_password: "",
    response: ""
  };
  UpdatePass = e => {
    var validatePassword = this.validate({
      password: { required: true, minlength: 8, maxlength: 30 }
    });
    var validateConfirmPassword = this.validate({
      c_password: { required: true, minlength: 8, maxlength: 30 }
    });

    if (validatePassword || validateConfirmPassword || true) {
      /////yaad rkhna change krna hai :P
      if (this.state.password === this.state.c_password) {
        fetch(
          "https://doctors-module.000webhostapp.com/api/update-password.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body:  JSON.stringify(data)
            body: JSON.stringify({
              email: this.props.email,
              password: this.state.password
            })
          }
        )
          .then(response => response.text())
          .then(data =>
            this.setState({
              response: data
            })
          )
          .then(console.log(this.state.response));
      } else {
        alert("Password do not match");
      }
    } else {
      alert("Password must contain atleast 8 characters");
    }
  };
  render() {
    return (
      <KeyboardAvoidingView>
        {(this.state.response === "" ||
          this.state.response === "Failed to Update") && (
          <KeyboardAvoidingView behavior="position">
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Icon name="lock" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter New Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={password => this.setState({ password })}
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
                    placeholder="Re-enter New Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={c_password => this.setState({ c_password })}
                    returnKeyType={"next"}
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                  />
                </View>

                <TouchableHighlight
                  style={[styles.buttonContainer, styles.forgetpassButton]}
                  underlayColor="#00b5ec"
                  onPress={this.UpdatePass}
                >
                  <Text style={styles.forgetpassText}>Update Password</Text>
                </TouchableHighlight>
                {/* <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text> */}
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
        {this.state.response === "Password Updated" && <Login />}
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

export default NewPassword;
