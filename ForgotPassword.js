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
export default class ForgotPassword extends Component {
  state = {
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    emailExist: true,
    responseForVerifyEmail: "",
    errorMessageEmail: "",
  };

  handleEmailVerification = (e) => {
    var errorMessageEmail = "";
    if (this.state.email.length === 0) {
      errorMessageEmail = "Email is required";
    } else if (!this.validateEmail(this.state.email)) {
      errorMessageEmail = "Email is invalid";
    }
    if (errorMessageEmail === "") {
      // alert("asdasdasdasdas");
      fetch(
        "http://instrux.live/doctors_module/api/verify-email-forget-password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body:  JSON.stringify(data)
          body: JSON.stringify({
            email: this.state.email,
          }),
        }
      )
        .then((response) => response.text())

        .then((data) =>
          this.setState({
            responseForVerifyEmail: data,
            auth: true,
          })
        )

        .then(
          console.log(
            this.state.responseForVerifyEmail,
            "aaaaaaaaaaaaaaaaaaaaaaaaa"
          )
        );
    } else {
      this.setState({
        errorMessageEmail,
      });
    }
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
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" enabled>
        {this.state.responseForVerifyEmail === "" ||
        this.state.responseForVerifyEmail === "0" ? (
          <ScrollView style={{ backgroundColor: "#fff" }}>
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
                    source={require("./assets/padlock.png")}
                    size={15}
                  />
                </View>
                <Text style={styles.text_header}>Forgot Your Password?</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text
                  style={[
                    styles.text_footer,
                    { fontWeight: "bold", fontSize: 16 },
                  ]}
                >
                  Please enter your registered email to reset your password{" "}
                </Text>

                <View style={styles.action}>
                  <Text style={styles.errorMsg}>* </Text>
                  <Icon
                    type="font-awesome"
                    name="envelope-o"
                    color="#00b5ec"
                    size={16}
                  />
                  <TextInput
                    placeholder="Your Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(email) => this.setState({ email })}
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

                {this.state.responseForVerifyEmail === "0" && (
                  <View style={styles.actionError}>
                    <Icon
                      type="font-awesome"
                      name="info-circle"
                      color="#FF0000"
                      size={14}
                    />
                    <Text style={styles.errorMsg}>
                      No such account found. Please enter a registered email
                    </Text>
                  </View>
                )}
                {/* <Text>{typeof this.state.responseForVerifyEmail}</Text> */}
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
                {!this.state.emailExist ? (
                  <View style={styles.actionError}>
                    <Icon
                      type="font-awesome"
                      name="info-circle"
                      color="#FF0000"
                      size={14}
                    />
                    <Text style={styles.errorMsg}>
                      No such account found. Please enter a registered email
                    </Text>
                  </View>
                ) : null}

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
                    onPress={() => this.handleEmailVerification()}
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
                        Next
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
                      this.props.navigation.navigate("LoginScreen")
                    }
                  >
                    <Text style={(styles.textSign, { color: "#00b5ec" })}>
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </ScrollView>
        ) : (
          this.props.navigation.navigate("ResetPassword", {
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
    paddingVertical: 30,
    paddingBottom: 100,
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
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 5,

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
    fontSize: 11,
    marginLeft: 3,
  },
  button: {
    alignItems: "center",
    marginTop: 40,
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
