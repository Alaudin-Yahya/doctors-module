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

export default class SignUpView extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      timing: "",
      address: "",
      phone: 0,
      speciality: "",
      timing: "",
      auth: false,
      form: true,
      res: 0,
      auth_code: 0,
      message: false,
      location: null,
      errorMessage: null,
      isLocationModalVisible: false,
      appState: AppState.currentState,
      result: ""
    };
  }
  radio_props = [
    { label: "Male     ", value: "Male" },
    { label: "Female", value: "Female" }
  ];
  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }
  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      this._getLocationAsync();
    }
    this.setState({ appState: nextAppState });
  };

  componentWillMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    // if (Platform.OS === 'android') {
    //   this.setState({
    //     errorMessage:
    //       'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
    //   });
    // }
    // else {
    this._getLocationAsync();
    // }
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // location = await Location.reverseGeocodeAsync(location);
      this.setState({ location });
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        this.setState({ isLocationModalVisible: true });
      }
    }
  };
  openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    this.setState({ openSetting: false });
    return;
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSignup = e => {
    const data = this.state;
    // var validate=this.validate({
    //   name: {required: true},
    //   email: {email: true},
    //   password : {required:true, minlength:8, maxlength:30},
    //   timing:{required:true},
    //   phone: {numbers: true},
    //   address: {required:true},
    //   speciality: {required:true}
    // });
    var validateName = this.validate({
      name: { required: true }
    });
    var validateEmail = this.validate({
      email: { email: true, required: true }
    });
    var validatePassword = this.validate({
      password: { required: true, minlength: 8, maxlength: 30 }
    });
    var validateTiming = this.validate({
      timing: { required: true }
    });
    var validatePhone = this.validate({
      phone: { numbers: true, required: true, minlength: 11, maxlength: 11 }
    });
    var validateAdd = this.validate({
      address: { required: true }
    });
    var validateSpeciality = this.validate({
      speciality: { required: true }
    });

    if (
      validateName &&
      validatePassword &&
      validatePhone &&
      validateSpeciality &&
      validateTiming &&
      validateEmail &&
      validateAdd
    ) {
      this.setState({
        form: false,
        auth: true
      });
      //console.log("ywsss")
      fetch("https://doctors-module.000webhostapp.com/api/doctor-signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body:  JSON.stringify(data)
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          timing: this.state.timing,
          address: this.state.address,
          phone: this.state.phone,
          speciality: this.state.speciality
        })
      })
        .then(response => response.text())
        .then(data => console.log(data));
      //console.log(this.state.res);
      if (this.state.res == 1) {
        console.log("yes");
        this.setState({
          form: false,
          auth: true
        });
      }
    } else if (!validateName) {
      alert("Name is required");
    } else if (!validateEmail) {
      alert("Enter a valid Email Address");
    } else if (!validatePassword) {
      alert("Password must contain alteast 8 characters");
    } else if (!validateTiming) {
      alert("Timing is required");
    } else if (!validatePhone) {
      alert("Enter a valid Phone number");
    } else if (!validateSpeciality) {
      alert("Specialty is required");
    } else if (!validateAdd) {
      alert("Address is required");
    }
  };

  confirmEmail = e => {
    fetch("https://doctors-module.000webhostapp.com/api/confirm-email.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        auth_code: this.state.auth_code,
        email: this.state.email
        // location: this.state.location
      })
    })
      .then(response => response.text())
      .then(data =>
        this.setState({
          message: data
        })
      );
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  saveLocation = () => {
    fetch("https://doctors-module.000webhostapp.com/api/location.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        // auth_code: this.state.auth_code,
        email: this.state.email,
        location: this.state.location
      })
    })
      .then(response => response.text())
      .then(data => console.log("ok"));
  };
  render() {
    if (this.state.message) {
      console.log("binole");
      this.saveLocation();
    }
    return (
      <ScrollView>
        <View
          style={styles.container}
          onLayout={event => {
            var { x, y, width, height } = event.nativeEvent.layout;
          }}
        >
          <Modal
            onModalHide={this.state.openSetting ? this.openSetting : undefined}
            isVisible={this.state.isLocationModalVisible}
          >
            <View
              style={{
                height: 300,
                width: 300,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                onPress={() =>
                  this.setState({
                    isLocationModalVisible: false,
                    openSetting: true
                  })
                }
                title="Enable Location Services"
              />
            </View>
          </Modal>

          {this.state.form && (
            <KeyboardAvoidingView behavior="position">
              <View style={styles.formContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 40,
                    color: "#00b5ec",
                    paddingLeft: 65,
                    paddingBottom: 20
                  }}
                >
                  Register
                </Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="stethoscope"
                    type="font-awesome"
                    color="#00b5ec"
                  />
                  <TextInput
                    id="Name"
                    style={{ placeholderTextColor: "#00b5ec" }}
                    style={styles.inputs}
                    placeholder="Full-Name"
                    underlineColorAndroid="transparent"
                    onChangeText={name => this.setState({ name })}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                    }}
                  />
                </View>

                {/* <Text>You are {this.state.name}</Text> */}
                <View style={styles.inputContainer}>
                  <Icon name="envelope" type="font-awesome" color="#00b5ec" />
                  <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={email => this.setState({ email })}
                    returnKeyType={"next"}
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    onSubmitEditing={() => {
                      this.thirdTextInput.focus();
                    }}
                  />
                </View>
                {/* <Text>You are {this.state.email}</Text> */}

                <View style={styles.inputContainer}>
                  <Icon name="lock" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={password => this.setState({ password })}
                    returnKeyType={"next"}
                    ref={input => {
                      this.thirdTextInput = input;
                    }}
                    onSubmitEditing={() => {
                      this.fourthTextInput.focus();
                    }}
                  />
                </View>

                {/* <Text>You are {this.state.password}</Text> */}

                <View style={styles.inputContainer}>
                  <Icon name="star" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Speciality"
                    underlineColorAndroid="transparent"
                    onChangeText={speciality => this.setState({ speciality })}
                    returnKeyType={"next"}
                    ref={input => {
                      this.fourthTextInput = input;
                    }}
                    onSubmitEditing={() => {
                      this.fifthTextInput.focus();
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon name="clock-o" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    id="Name"
                    style={{ placeholderTextColor: "#00b5ec" }}
                    style={styles.inputs}
                    placeholder="Time"
                    underlineColorAndroid="transparent"
                    onChangeText={timing => this.setState({ timing })}
                    returnKeyType={"next"}
                    ref={input => {
                      this.fifthTextInput = input;
                    }}
                    onSubmitEditing={() => {
                      this.sixthTextInput.focus();
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon name="phone" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Phone"
                    underlineColorAndroid="transparent"
                    onChangeText={phone => this.setState({ phone })}
                    returnKeyType={"next"}
                    ref={input => {
                      this.sixthTextInput = input;
                    }}
                    onSubmitEditing={() => {
                      this.seventhTextInput.focus();
                    }}
                  />
                </View>
                {/* <Text>You are {this.state.phone}</Text> */}

                <View style={styles.inputContainer}>
                  <Icon name="map-marker" type="font-awesome" color="#00b5ec" />

                  <TextInput
                    style={styles.inputs}
                    placeholder="Address"
                    underlineColorAndroid="transparent"
                    onChangeText={address => this.setState({ address })}
                    // returnKeyType = { "next" }
                    ref={input => {
                      this.seventhTextInput = input;
                    }}
                  />
                </View>
                <View style={(styles.formContainer, { paddingTop: 0 })}>
                  <Text
                    style={{
                      color: "#00b5ec",
                      fontSize: 17
                    }}
                  >
                    Gender
                  </Text>
                  <RadioForm
                    radio_props={this.radio_props}
                    initial={0}
                    onPress={value => {
                      this.setState({ value: value });
                    }}
                    buttonColor={"#00b5ec"}
                    buttonInnerColor={"#00b5ec"}
                    buttonInnerColor={"#00b5ec"}
                    labelColor={"#00b5ec"}
                    selectedButtonColor={"#00b5ec"}
                    formHorizontal={true}
                    buttonOuterSize={15}
                    buttonTextActiveStyle={{ color: "#00b5ec" }}
                    buttonStyle={{
                      color: "#00b5ec"
                    }}
                    style={{
                      color: "#00b5ec",
                      paddingBottom: 20,
                      fontSize: 12,
                      paddingTop: 10,
                      marginLeft: 25
                    }}
                  />
                </View>
                {/* <Text>You are {this.state.address}</Text> */}

                {/* <Text style={styles.color}>Speciality</Text> */}
                {/* <KeyboardAwareScrollView  getTextInputRefs={() => { return [this._textInputRef];}}>
            <TextInput style={styles.inputs} placeholder={'My Input'} ref={(r) => { this._textInputRef = r; }}/>
          </KeyboardAwareScrollView> */}
                <TouchableHighlight
                  style={[styles.buttonContainer, styles.signupButton]}
                  underlayColor="#00b5ec"
                  onPress={this.handleSignup}
                >
                  <Text style={styles.signUpText}>Register</Text>
                </TouchableHighlight>
                <Text
                  style={{ color: "#00b5ec", marginBottom: 50, marginTop: -10 }}
                >
                  Already have an account?
                  {"  "}
                  <Text
                    onPress={() => this.props.navigation.navigate("login")}
                    style={{
                      color: "#00b5ec",
                      fontSize: 15,
                      textDecorationLine: "underline"
                    }}
                  >
                    Login
                  </Text>
                </Text>
              </View>
            </KeyboardAvoidingView>
          )}
          {this.state.auth && (
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
              <TouchableHighlight
                style={[styles.buttonContainer, styles.signupButton]}
                underlayColor="#00b5ec"
                onPress={this.confirmEmail}
              >
                <Text style={styles.signUpText}>Confirm email</Text>
              </TouchableHighlight>
              {this.state.message && (
                <Text style={styles.input}>'Account Created' </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
// export default SignUpView({
//   login: DrLogin
// });
const styles = StyleSheet.create({
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
    marginTop: 0
  },
  inputContainer: {
    borderBottomColor: "#00b5ec",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 15,
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
  signupButton: {
    backgroundColor: "#00b5ec",
    borderColor: "#00b5ec",
    borderWidth: 1
  },
  signUpText: {
    color: "#ffffff"
  }
});
