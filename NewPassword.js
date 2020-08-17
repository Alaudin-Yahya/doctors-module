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
export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    secureTextEntry1: true,
    secureTextEntry2: true,
    errorMessagePassword: "",
    errorMessageConfirmPassword: "",
    errorPasswordCheck: "",
    response: "",
  };

  resetPassword = (e) => {
    var errorMessagePassword = "";
    var errorPasswordCheck = "";
    var errorMessageConfirmPassword = "";

    if (this.state.password.length === 0) {
      errorMessagePassword = "Password is required";
    } else if (this.state.password.length < 8) {
      errorMessagePassword = "Password must contain atleast 8 characters";
    }
    if (this.state.confirmPassword.length === 0) {
      errorMessageConfirmPassword = "Password is required";
    } else if (this.state.confirmPassword.length < 8) {
      errorMessageConfirmPassword =
        "Password must contain atleast 8 characters";
    }

    if (errorMessagePassword === "" && errorMessageConfirmPassword === "") {
      if (this.state.password === this.state.confirmPassword) {
        fetch("http://instrux.live/doctors_module/api/update-password.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body:  JSON.stringify(data)
          body: JSON.stringify({
            email: this.props.route.params.email,
            password: this.state.password,
          }),
        })
          .then((response) => response.text())
          .then((data) =>
            this.setState({
              response: data,
            })
          )
          .then(console.log(this.state.response));
      } else {
        errorPasswordCheck = "Password do not match ";
        this.setState({
          errorPasswordCheck,
          errorMessagePassword,
          errorMessageConfirmPassword,
        });
      }
    } else {
      this.setState({
        errorMessagePassword,
        errorMessageConfirmPassword,
      });
    }
  };
  showPassword = (e) => {
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1,
    });
  };
  showConfirmPassword = (e) => {
    this.setState({
      secureTextEntry2: !this.state.secureTextEntry2,
    });
  };
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" enabled>
        {this.state.response === "" ||
        this.state.response === "Failed to Update" ? (
          <ScrollView>
            <View style={styles.container}>
              <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />
              <Animatable.View
                animation="fadeIn"
                duraton="1500"
                style={styles.header}
              >
                <View style={styles.header_icon_container}>
                  <Image
                    style={styles.header_icon}
                    source={require("./assets/smart-key.png")}
                    size={15}
                  />
                </View>
                <Text style={styles.text_header}>New Password</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}>
                  New Password<Text style={styles.errorMsg}>* </Text>
                </Text>
                <View style={styles.action}>
                  <Icon
                    type="font-awesome"
                    name="lock"
                    color="#00b5ec"
                    size={18}
                  />
                  <TextInput
                    placeholder="Your New Password"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureTextEntry1 ? true : false}
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({ password })}
                  />
                  <Icon
                    type="font-awesome"
                    name="eye-slash"
                    name={this.state.secureTextEntry1 ? "eye-slash" : "eye"}
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
                <Text style={(styles.text_footer, { marginTop: 35 })}>
                  Confirm New Password<Text style={styles.errorMsg}>* </Text>
                </Text>
                <View style={styles.action}>
                  <Icon
                    type="font-awesome"
                    name="lock"
                    color="#00b5ec"
                    size={18}
                  />
                  <TextInput
                    placeholder="Confirm Your Password"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureTextEntry2 ? true : false}
                    style={styles.textInput}
                    onChangeText={(confirmPassword) =>
                      this.setState({ confirmPassword })
                    }
                  />
                  <Icon
                    type="font-awesome"
                    name={this.state.secureTextEntry2 ? "eye-slash" : "eye"}
                    color="#00b5ec"
                    size={18}
                    onPress={() => this.showConfirmPassword()}
                  />
                </View>
                {this.state.errorMessageConfirmPassword === "" ? null : (
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
                      {this.state.errorMessageConfirmPassword}
                    </Text>
                  </View>
                )}
                {this.state.errorPasswordCheck === "" ? null : (
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
                      {this.state.errorPasswordCheck}
                    </Text>
                  </View>
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
                    onPress={() => this.resetPassword()}
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
                        Reset
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
          this.props.navigation.navigate("LoginScreen")
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 60,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  header_icon_container: {
    backgroundColor: "rgba(255, 255, 255,0.6)",
    borderRadius: 100,
    marginBottom: 20,
    padding: 20,
  },
  header_icon: {
    width: 80,
    height: 80,
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
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
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
