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
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    authenticationCode: "",
    response: "10",
  };

  handleVerifyCode = (e) => {
    fetch(
      "http://instrux.live/doctors_module/api/verify-code-forget-password.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body:  JSON.stringify(data)
        body: JSON.stringify({
          auth_code: this.state.authenticationCode,
          email: this.props.route.params.email,
          // location: this.state.location
        }),
      }
    )
      .then((response) => response.text())
      .then((data) =>
        this.setState({
          response: data,
        })
      )
      .then(console.log(this.state.response));
  };

  showPassword = (e) => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };
  render() {
    console.log(this.props);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" enabled>
        {this.state.response === "10" || this.state.response == "0" ? (
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
                    source={require("./assets/encryption.png")}
                    size={15}
                  />
                </View>
                <Text style={styles.text_header}>Reset Password!</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text
                  style={[
                    styles.text_footer,
                    { fontWeight: "bold", fontSize: 16 },
                  ]}
                >
                  <Text style={{ fontSize: 20 }}>Check your email</Text> we have
                  sent you a code to reset password{" "}
                </Text>

                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Your Code"
                      autoCapitalize="none"
                      style={styles.textInput}
                      maxLength={6}
                      value={this.state.val}
                      onChangeText={(authenticationCode) =>
                        this.setState({ authenticationCode })
                      }
                    />
                    {this.state.authenticationCode.length === 6 ? (
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
                  <View style={styles.actionError}>
                    <Icon
                      type="font-awesome"
                      name="info-circle"
                      color="#FF0000"
                      size={14}
                    />
                    <Text style={styles.errorMsg}>
                      Code must contain 6 digits{" "}
                    </Text>
                  </View>
                  {this.state.response === "0" && (
                    <Text style={styles.errorMsg}>Incorrect Code</Text>
                  )}
                </View>

                <View style={styles.button}>
                  <TouchableOpacity
                    disabled={
                      this.state.authenticationCode.length === 6 ? false : true
                    }
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
                    onPress={() => this.handleVerifyCode()}
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
          this.props.navigation.navigate("NewPassword", {
            email: this.props.route.params.email,
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
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingBottom: 5,
    width: "40%",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 5,

    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
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
