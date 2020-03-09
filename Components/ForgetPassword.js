import React, { Component } from "react";
import axios from "axios";
import { Icon } from "react-native-elements";
import ValidationComponent from "react-native-form-validator";
import VerifyEmail from "./VerifyEmail";

// import DrProfile from './DrProfile';
//import UpdatePass from './UpdatePass';
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
  KeyboardAvoidingView
} from "react-native";

class ForgetPassword extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      c_password: "",
      auth: true,
      form: true,
      update: false,
      res: 0,
      auth_code: 0,
      message: false,
      errorMessage: null,
      result: "",
      res1: 0,
      res2: false,
      last: false,
      responseForEmail: false //response of verification of email
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
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
            auth: true
          })
        )

        .then(
          console.log(this.state.responseForEmail, "aaaaaaaaaaaaaaaaaaaaaaaaa")
        );
    } else {
      alert("Enter a valid Email Address111111");
    }
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
          res1: data
        })
      );
  };

  UpdatePass = e => {
    var validatePassword = this.validate({
      password: { required: true, minlength: 8, maxlength: 30 }
    });
    var validateConfirmPassword = this.validate({
      c_password: { required: true, minlength: 8, maxlength: 30 }
    });

    if (validatePassword && validateConfirmPassword) {
      if (this.state.password === this.state.c_password) {
        fetch(
          "https://doctors-module.000webhostapp.com/api/update-password.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body:  JSON.stringify(data)
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
          }
        )
          .then(response => response.text())
          .then(data =>
            this.setState({
              res2: data
            })
          )
          .then(console.log(this.state.res2));
      } else {
        alert("Password do not match");
      }
    } else {
      alert("Password must contain atleast 8 characters");
    }
  };

  Check = e => {
    // if (e === "1") {
    //   if (this.state.responseForEmail === true) {
    //     return false;
    //   } else if (this.state.responseForEmail === false) {
    //     alert("No such account exists!!");
    //     this.setState({
    //       responseForEmail: ""
    //     });
    //     return true;
    //   } else {
    //     return true;
    //   }
    // }
    if (e === "2") {
      if (this.state.responseForEmail === true) {
        return true;
      } else {
        return false;
      }
    }
  };
  /* onLayout={event => {
                var { x, y, width, height } = event.nativeEvent.layout;
              }} */
  render() {
    return <View>{!this.state.responseForEmail && <VerifyEmail />}</View>;
  }
}
export default ForgetPassword;

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
