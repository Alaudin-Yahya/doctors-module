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
  Animated,
  // ScrollView,
  Image,
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";

const ChangePasswordStack = createStackNavigator();
export default ChangePassword = (props, { navigation }) => {
  return (
    <ChangePasswordStack.Navigator
      initialRouteName=""
      text_header="Change Password"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b5ec",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 14,
          textAlign: "center",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{ position: "relative" }}>
              <Icon
                style={{ paddingLeft: 10 }}
                name="chevron-left"
                type="feather"
                size={26}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View
            style={{
              width: 40,
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text
                style={{
                  position: "absolute",
                  right: 8,
                  top: -5,
                  zIndex: 1,
                  backgroundColor: "red",
                  color: "#fff",
                  paddingVertical: 1,
                  paddingHorizontal: 4,
                  borderRadius: 20,
                  fontSize: 10,
                }}
              >
                9
              </Text>
              <Icon name="bell" type="font-awesome" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <ChangePasswordStack.Screen
        name="Change Password"
        component={ChangePassword}
        initialParams={{
          email: props.route.params.email,
        }}
      />
    </ChangePasswordStack.Navigator>
  );
};

class ChangePassword extends Component {
  state = {
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    check_textInputChange: false,
    secureTextEntryOldPassword: true,
    secureTextEntryNewPassword: true,
    secureTextEntryConfirmNewPassword: true,
    bool: true,
    errorMessageCurrentPassword: "",
    errorMessageNewPassword: "",
    errorMessageConfirmNewPassword: "",
    response: "",

    errorMessagePasswordCheck: "",
  };

  handle = (e) => {
    console.log(
      this.props.route.params.email,
      " ",
      this.state.currentPassword,
      " ",
      this.state.newPassword
    );
    fetch("http://instrux.live/doctors_module/api/change-password.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        email: this.props.route.params.email,
        password: this.state.currentPassword,
        newPassword: this.state.newPassword,
      }),
    })
      .then((response) => response.text())
      .then((data) =>
        this.setState({
          response: data,
        })
      );
  };

  changePassword = (e) => {
    var errorMessageCurrentPassword = "";
    var errorMessageNewPassword = "";
    var errorMessageConfirmNewPassword = "";
    var errorMessagePasswordCheck = "";

    if (this.state.currentPassword.length === 0) {
      errorMessageCurrentPassword = "Password is required";
    } else if (this.state.currentPassword.length < 8) {
      errorMessageCurrentPassword =
        "Password must contain atleast 8 characters";
    }
    if (this.state.newPassword.length === 0) {
      errorMessageNewPassword = "Password is required";
    } else if (this.state.newPassword.length < 8) {
      errorMessageNewPassword = "Password must contain atleast 8 characters";
    }
    if (this.state.confirmNewPassword.length === 0) {
      errorMessageConfirmNewPassword = "Password is required";
    } else if (this.state.confirmNewPassword.length < 8) {
      errorMessageConfirmNewPassword =
        "Password must contain atleast 8 characters";
    }

    if (
      errorMessageCurrentPassword === "" &&
      errorMessageNewPassword === "" &&
      errorMessageConfirmNewPassword === ""
    ) {
      if (this.state.newPassword === this.state.confirmNewPassword) {
        // alert("readdddddddddddddddddyyyyyyyyyyyyyyyyy");
        this.setState({
          errorMessageCurrentPassword,
          errorMessageNewPassword,
          errorMessageConfirmNewPassword,
        });

        this.handle();
      } else {
        errorMessagePasswordCheck = "Password do not match ";
        this.setState({
          errorMessageCurrentPassword,
          errorMessageNewPassword,
          errorMessagePasswordCheck,
          errorMessageConfirmNewPassword,
        });
      }
    } else {
      this.setState({
        errorMessageCurrentPassword,
        errorMessageNewPassword,
        errorMessageConfirmNewPassword,
      });
    }
  };
  resetState = (e) => {
    console.log(
      "chalrha  haiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    );
    this.setState({
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      check_textInputChange: false,
      secureTextEntryOldPassword: true,
      secureTextEntryNewPassword: true,
      secureTextEntryConfirmNewPassword: true,
      bool: true,
      errorMessageCurrentPassword: "",
      errorMessageNewPassword: "",
      errorMessageConfirmNewPassword: "",
      response: "",
      errorMessagePasswordCheck: "",
    });
    this.props.navigation.navigate("Settings");
  };

  showCurrentPassword = (e) => {
    this.setState({
      secureTextEntryOldPassword: !this.state.secureTextEntryOldPassword,
    });
  };
  showNewPassword = (e) => {
    this.setState({
      secureTextEntryNewPassword: !this.state.secureTextEntryNewPassword,
    });
  };
  showConfirmNewPassword = (e) => {
    this.setState({
      secureTextEntryConfirmNewPassword: !this.state
        .secureTextEntryConfirmNewPassword,
    });
  };

  render() {
    const abc = this.state.showMainSubMenu;
    console.log(
      this.state.response,
      "response  ",
      typeof this.state.response,
      "type",
      this.props.route.params.email
    );
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />

        {this.state.response === "" ||
        this.state.response === "Enter Correct Current Password" ? (
          <Animatable.View animation="fadeIn" style={styles.footer}>
            <Text
              style={[styles.text_footer, { fontWeight: "bold", fontSize: 14 }]}
            >
              Please enter your current password and new password{" "}
            </Text>
            <Text style={(styles.text_footer, { marginTop: 25 })}>
              Current Password<Text style={styles.errorMsg}>* </Text>
            </Text>
            <View style={styles.action}>
              <Icon type="font-awesome" name="lock" color="#00b5ec" size={18} />
              <TextInput
                placeholder="Your Current Password"
                autoCapitalize="none"
                secureTextEntry={
                  this.state.secureTextEntryOldPassword ? true : false
                }
                style={styles.textInput}
                onChangeText={(currentPassword) =>
                  this.setState({ currentPassword })
                }
              />
              <Icon
                type="font-awesome"
                name="eye-slash"
                name={
                  this.state.secureTextEntryOldPassword ? "eye-slash" : "eye"
                }
                color="#00b5ec"
                size={18}
                onPress={() => this.showCurrentPassword()}
              />
            </View>
            {this.state.errorMessageCurrentPassword === "" ? null : (
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
                  {this.state.errorMessageCurrentPassword}
                </Text>
              </View>
            )}
            <Text style={(styles.text_footer, { marginTop: 25 })}>
              New Password<Text style={styles.errorMsg}>* </Text>
            </Text>
            <View style={styles.action}>
              <Icon type="font-awesome" name="lock" color="#00b5ec" size={18} />
              <TextInput
                placeholder="Your New Password"
                autoCapitalize="none"
                secureTextEntry={
                  this.state.secureTextEntryNewPassword ? true : false
                }
                style={styles.textInput}
                onChangeText={(newPassword) => this.setState({ newPassword })}
              />
              <Icon
                type="font-awesome"
                name="eye-slash"
                name={
                  this.state.secureTextEntryNewPassword ? "eye-slash" : "eye"
                }
                color="#00b5ec"
                size={18}
                onPress={() => this.showNewPassword()}
              />
            </View>
            {this.state.errorMessageNewPassword === "" ? null : (
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
                  {this.state.errorMessageNewPassword}
                </Text>
              </View>
            )}
            <Text style={(styles.text_footer, { marginTop: 25 })}>
              Confirm New Password<Text style={styles.errorMsg}>* </Text>
            </Text>
            <View style={styles.action}>
              <Icon type="font-awesome" name="lock" color="#00b5ec" size={18} />
              <TextInput
                placeholder="Confirm Your New Password"
                autoCapitalize="none"
                secureTextEntry={
                  this.state.secureTextEntryConfirmNewPassword ? true : false
                }
                style={styles.textInput}
                onChangeText={(confirmNewPassword) =>
                  this.setState({ confirmNewPassword })
                }
              />
              <Icon
                type="font-awesome"
                name="eye-slash"
                name={
                  this.state.secureTextEntryConfirmNewPassword
                    ? "eye-slash"
                    : "eye"
                }
                color="#00b5ec"
                size={18}
                onPress={() => this.showConfirmNewPassword()}
              />
            </View>
            {this.state.errorMessageConfirmNewPassword === "" ? null : (
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
                  {this.state.errorMessageConfirmNewPassword}
                </Text>
              </View>
            )}
            {this.state.errorMessagePasswordCheck === "" ? null : (
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
                  {this.state.errorMessagePasswordCheck}
                </Text>
              </View>
            )}
            <View style={styles.button}>
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
                onPress={() => this.changePassword()}
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
                    Change
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : (
          this.resetState()
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b5ec",
  },

  footer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  text_header: {
    backgroundColor: "#00b5ec",
    padding: 6,
    borderRadius: 15,
  },

  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 14,
    marginTop: 20,
  },
  ListHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    // borderTopWidth:1,
    borderBottomColor: "#e4e4e4",
  },
  ListHeaderText: {
    fontSize: 15,
    color: "#05375a",

    flex: 1,
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
  SettingsSubMenu: {
    marginLeft: 2,
  },
  SettingsSubMenuItem: {
    flexDirection: "row",
    borderBottomColor: "#e4e4e4",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  SettingsSubMenuItemText: {
    fontSize: 13,
    color: "#05375a",
  },
  SettingsSubMenuItemIcon: {
    width: 30,
    flex: 1,
  },
});
