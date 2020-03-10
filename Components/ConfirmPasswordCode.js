import React, { Component } from "react";
import { Icon } from "react-native-elements";
import Login from "./DrLogin";
import NewPassword from "./NewPassword";

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

class ConfirmPasswordCode extends Component {
  state = {
    auth_code: 0,
    response: "10",
    email : this.props.navigation.getParam('email')
  };
  confirmCode = e => {
    fetch(
      "https://doctors-module.000webhostapp.com/api/verify-code-forget-password.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body:  JSON.stringify(data)
        body: JSON.stringify({
          auth_code: this.state.auth_code,
          email: this.state.email
          // location: this.state.location
        })
      }
    )
      .then(response => response.text())
      .then(data =>
        this.setState({
          response: data
        })
      )
      .then(console.log(this.props.navigation.getParam('email')+this.state.response));
  };
  render() {
    console.log("in ConfirmPAsswordCode")
    
    return (
      <View>
        {(this.state.response === "0" || this.state.response === "10") && (
          <KeyboardAvoidingView behavior="position">
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Icon name="map-marker" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Authentication Code"
                    underlineColorAndroid="transparent"
                    onChangeText={auth_code => this.setState({ auth_code })}
                  />
                </View>
                {this.state.response === "0" && <Text>Incorrect Code!!</Text>}
                <TouchableHighlight
                  style={[styles.buttonContainer, styles.forgetpassButton]}
                  underlayColor="#00b5ec"
                  onPress={this.confirmCode}
                >
                  <Text style={styles.forgetpassText}>Confirm code</Text>
                </TouchableHighlight>
                {/* <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text> */}
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
        {this.state.response === "1" && (
          // <NewPassword email={this.props.email} />
          this.props.navigation.navigate('NewPassword', {
            email: this.state.email 
          })
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
export default ConfirmPasswordCode;
