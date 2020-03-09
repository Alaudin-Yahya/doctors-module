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

export default class EditProfile extends ValidationComponent {
  constructor(props) {
    super(props);
    const { ProfileData } = this.props.navigation.state.params;
    this.ProfileData = ProfileData;
    this.state = {
      name: this.ProfileData.doctor_name,
      email: this.ProfileData.doctor_email,
      timing: this.ProfileData.doctor_timing,
      address: this.ProfileData.doctor_address,
      phone: this.ProfileData.doctor_phone,
      speciality: this.ProfileData.doctor_speciality,
      auth_code: 0,
      response: "",
      form: 1
    };
  }
  radio_props = [
    { label: "Male     ", value: "Male" },
    { label: "Female", value: "Female" }
  ];

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  editData = e => {
    console.log(this.state);
    const data = this.state;
    var validate = this.validate({
      name: { required: true },
      email: { email: true },
      password: { required: true, minlength: 8, maxlength: 30 },
      timing: { required: true },
      phone: { numbers: true },
      address: { required: true },
      speciality: { required: true }
    });
    var validateName = this.validate({
      name: { required: true }
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
      validatePhone &&
      validateSpeciality &&
      validateTiming &&
      validateAdd
    ) {
      console.log("sending data");
      fetch("https://doctors-module.000webhostapp.com/api/edit-profile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body:  JSON.stringify(data)
        body: JSON.stringify({
          name: this.state.name,
          timing: this.state.timing,
          address: this.state.address,
          phone: this.state.phone,
          speciality: this.state.speciality,
          email: this.state.email
        })
      })
        .then(response => response.text())
        .then(data => console.log("response is ", data));
    } else if (!validateName) {
      alert("Name is required");
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
  render() {
    return (
      <ScrollView>
        {this.state.response === "" && (
          <View
            style={styles.container}
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
            }}
          >
            <Modal
              onModalHide={
                this.state.openSetting ? this.openSetting : undefined
              }
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
                      paddingBottom: 20,
                      paddingLeft: 20
                    }}
                  >
                    Edit Profile
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
                      underlineColorAndroid="transparent"
                      onChangeText={name => this.setState({ name })}
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        this.secondTextInput.focus();
                      }}
                      placeholder={this.ProfileData.doctor_name}
                    />
                  </View>

                  {/* <Text>You are {this.state.name}</Text> */}

                  <View style={styles.inputContainer}>
                    <Icon name="star" type="font-awesome" color="#00b5ec" />

                    <TextInput
                      style={styles.inputs}
                      placeholder={this.ProfileData.doctor_speciality}
                      underlineColorAndroid="transparent"
                      onChangeText={speciality => this.setState({ speciality })}
                      returnKeyType={"next"}
                      ref={input => {
                        this.thirdTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.fourthTextInput.focus();
                      }}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon name="clock-o" type="font-awesome" color="#00b5ec" />

                    <TextInput
                      id="Name"
                      style={{ placeholderTextColor: "#00b5ec" }}
                      style={styles.inputs}
                      placeholder={this.ProfileData.doctor_timing}
                      underlineColorAndroid="transparent"
                      onChangeText={timing => this.setState({ timing })}
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
                    <Icon name="phone" type="font-awesome" color="#00b5ec" />

                    <TextInput
                      style={styles.inputs}
                      placeholder={this.ProfileData.doctor_phone}
                      underlineColorAndroid="transparent"
                      onChangeText={phone => this.setState({ phone })}
                      returnKeyType={"next"}
                      ref={input => {
                        this.fifthTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.sixthTextInput.focus();
                      }}
                    />
                  </View>
                  {/* <Text>You are {this.state.phone}</Text> */}

                  <View style={styles.inputContainer}>
                    <Icon
                      name="map-marker"
                      type="font-awesome"
                      color="#00b5ec"
                    />

                    <TextInput
                      style={styles.inputs}
                      placeholder={this.ProfileData.doctor_address}
                      underlineColorAndroid="transparent"
                      onChangeText={address => this.setState({ address })}
                      // returnKeyType = { "next" }
                      ref={input => {
                        this.sixthTextInput = input;
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
                    onPress={this.editData}
                  >
                    <Text style={styles.signUpText}>Register</Text>
                  </TouchableHighlight>
                </View>
              </KeyboardAvoidingView>
            )}
            {<Text>{"\n\n\n\n\n\n\n\n\n\n\n"}</Text>}
          </View>
        )}
        {this.state.response === "1" &&
          this.props.navigation.navigate("DrProfile")}
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
