import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
  // ScrollView,
  Image,
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
// import { Home } from './Home';
export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    errorMessageEmail: "",
    errorMessagePassword: "",
    response: "",
  };

  handle = (e) => {
    
    fetch("http://instrux.live/doctors_module/api/doctor-login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          response: data,
        })
      );
  };
  handleLogin = (e) => {
    this.setState({
      response: "",
    });
    let data = {
      errorMessageEmail: "",
      errorMessagePassword: "",
    };

    if (this.state.email.length === 0) {
      data.errorMessageEmail = "Email is required";
    } else if (!this.validateEmail(this.state.email)) {
      data.errorMessageEmail = "Email is invalid";
    }

    if (this.state.password.length === 0) {
      data.errorMessagePassword = "Password is required";
    } 
    // else if (this.state.password.length < 8) {
    //   data.errorMessagePassword = "Password must contain atleast 8 characters";
    // }
    if (data.errorMessageEmail === "" && data.errorMessagePassword === "") {
      console.log("here");
      this.handle();
      this.setState({
        errorMessageEmail: data.errorMessageEmail,
        errorMessagePassword: data.errorMessagePassword,
      });
    } else {
      this.setState({
        errorMessageEmail: data.errorMessageEmail,
        errorMessagePassword: data.errorMessagePassword,
      });
    }

    // setTimeout(() => this.isNotEmpty(), 0);
  };
  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  showPassword = (e) => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };
  render() {
    console.log(this.state.response, "aa");
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" enabled>
        {this.state.response === "" || this.state.response === "0" ? (
          <ScrollView>
            <View style={styles.container}>
              <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />
              <Animatable.View
                animation="fadeIn"
                duraton="1500"
                style={styles.header}
              >
                <Text style={styles.text_header}>Welcome!</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}>
                  Email<Text style={styles.errorMsg}>* </Text>
                </Text>
                <View style={styles.action}>
                  <Icon
                    type="font-awesome"
                    name="user"
                    color="#00b5ec"
                    size={16}
                  />
                  <TextInput
                    placeholder="Your Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(email) => this.setState({ email })}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                    }}
                  />
                  {this.state.email.length !== 0 ? (
                    <Animatable.View animation="bounceIn">
                      <Icon
                        type="font-awesome"
                        name="check-circle"
                        color="#00b5ec"
                        size={16}
                      />
                    </Animatable.View>
                  ) : null}
                </View>
                {this.state.errorMessageEmail === "" ? null : (
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 2 }}>
                    <Icon
                      type="font-awesome"
                      name="info"
                      style={{ paddingVertical: 3, paddingHorizontal: 6 }}
                      backgroundColor="red"
                      color="white"
                      borderRadius={200}
                      size={10}
                    />
                    <Text style={styles.errorMsg}>
                      {this.state.errorMessageEmail}
                    </Text>
                  </View>
                )}
                <Text style={(styles.text_footer, { marginTop: 35 })}>
                  Password<Text style={styles.errorMsg}>* </Text>
                </Text>
                <View style={styles.action}>
                  <Icon
                    type="font-awesome"
                    name="lock"
                    color="#00b5ec"
                    size={18}
                  />
                  <TextInput
                    placeholder="Your Password"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureTextEntry ? true : false}
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({ password })}
                    ref={(input) => {
                      this.secondTextInput = input;
                    }}
                  />
                  <Icon
                    type="font-awesome"
                    name="eye-slash"
                    name={this.state.secureTextEntry ? "eye-slash" : "eye"}
                    color="#00b5ec"
                    size={18}
                    onPress={() => this.showPassword()}
                  />
                </View>
                {this.state.errorMessagePassword === "" ? null : (
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 2 }}>
                    <Icon
                      type="font-awesome"
                      name="info"
                      style={{ paddingVertical: 3, paddingHorizontal: 6 }}
                      backgroundColor="red"
                      color="white"
                      borderRadius={200}
                      size={10}
                    />
                    <Text style={styles.errorMsg}>
                      {this.state.errorMessagePassword}
                    </Text>
                  </View>
                )}
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ForgotPassword")
                    }
                  >
                    <Text style={styles.text_forgotPassword}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.state.response === "0" && (
                  <Text style={styles.errorMsg}>
                    Incorrect Email or Password
                  </Text>
                )}
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    style={
                      (styles.signIn,
                      {
                        width: "80%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        borderColor: "#00b5ec",
                        marginTop: 10,
                        borderWidth: 1,
                        height: 40,
                      })
                    }
                    onPress={() => this.handleLogin()}
                  >
                    <LinearGradient
                      style={{
                        width: "102%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        borderColor: "#00b5ec",
                        borderWidth: 1,
                        height: 40,
                      }}
                      colors={["#00b5ec", "#009398"]}
                    >
                      <Text style={(styles.textSign, { color: "#fff" })}>
                        Login
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      (styles.signIn,
                      {
                        width: "80%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        borderColor: "#00b5ec",
                        marginTop: 10,
                        borderWidth: 1,
                        height: 40,
                      })
                    }
                    onPress={() =>
                      this.props.navigation.navigate("SignupScreen")
                    }
                  >
                    <Text style={(styles.textSign, { color: "#00b5ec" })}>
                      Signup
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </ScrollView>
        ) : (
          this.props.navigation.navigate("DrawerComp", {
            email: this.state.email,
          })
        )}
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b5ec",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 80,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 100,
  },
  text_header: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 14,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    marginLeft: 10,
    color: "#05375a",
    fontSize: 13,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text_forgotPassword: {
    color: "#05375a",
    fontSize: 12,
    marginTop: 5,
  },
});
