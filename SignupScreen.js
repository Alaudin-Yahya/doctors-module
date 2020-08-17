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
export default class SignupScreen extends Component {
  state = {
    //                      states for data
    name: "",
    email: "",
    password: "",
    availability: "",
    address: "",
    speciality: "",
    phone: "",
    //                          states for error messages
    errorMessageName: "",
    errorMessageEmail: "",
    errorMessagePassword: "",
    errorMessagePhone: "",
    errorMessageAvailability: "",
    errorMessageAddress: "",
    errorMessageSpeciality: "",

    //                          states for input fields
    check_textInputChange: false,
    secureTextEntry1: true,
    secureTextEntry2: true,
    marginTopForInputFields: 25,

    //                          states for screen manipulation
    form: true,
    auth: false,
    auth_code: "",
    message: false,

    //                          states for form steps
    step1: true,
    step2: false,
    step3: false,
    countStep: 1,
  };

  verifyEmail = (e) => {
    fetch("http://instrux.live/doctors_module/api/confirm-email.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        auth_code: this.state.auth_code,
        email: this.state.email,
        // location: this.state.location
      }),
    })
      .then((response) => response.text())
      .then((data) =>
        this.setState({
          message: data,
        })
      );
  };

  sendAuthenticationCode = () => {
    alert("bhejdia");
    fetch("http://instrux.live/doctors_module/api/doctor-signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        timing: this.state.availability,
        address: this.state.address,
        phone: this.state.phone,
        speciality: this.state.speciality,
      }),
    }).then((response) => response.text());
    // .then((data) => console.log(data, "sendauth"));
  };
  handleRegister = (e) => {
    let errorMessages = {
      errorMessageName: "",
      errorMessageEmail: "",
      errorMessagePassword: "",
      errorMessagePhone: "",
      errorMessageAvailability: "",
      errorMessageAddress: "",
      errorMessageSpeciality: "",
    };
    if (this.state.email.length === 0) {
      errorMessages.errorMessageEmail = "Email is required";
    } else if (!this.validateEmail(this.state.email)) {
      errorMessages.errorMessageEmail = "Email is invalid";
    }

    if (this.state.password.length === 0) {
      errorMessages.errorMessagePassword = "Password is required";
    } else if (this.state.password.length < 8) {
      errorMessages.errorMessagePassword =
        "Password must contain atleast 8 characters";
    }
    if (this.state.address.length === 0) {
      errorMessages.errorMessageAddress = "Address is required";
    }
    if (this.state.speciality.length === 0) {
      errorMessages.errorMessageSpeciality = "Speciality is required";
    }
    if (this.state.phone.length === 0) {
      errorMessages.errorMessagePhone = "Phone Number is required";
    } else if (this.state.phone.length !== 11) {
      errorMessages.errorMessagePhone = "Phone Number is invalid";
    }
    if (this.state.availability.length === 0) {
      errorMessages.errorMessageAvailability = "Availability is required";
    }
    if (this.state.name.length === 0) {
      errorMessages.errorMessageName = "Name is required";
    }

    if (
      errorMessages.errorMessageEmail === "" &&
      errorMessages.errorMessagePassword === "" &&
      errorMessages.errorMessageName === "" &&
      errorMessages.errorMessagePhone === "" &&
      errorMessages.errorMessageSpeciality === "" &&
      errorMessages.errorMessageAddress === "" &&
      errorMessages.errorMessageAvailability === ""
    ) {
      this.sendAuthenticationCode();
      this.setState({
        form: false,
        errorMessageEmail: errorMessages.errorMessageEmail,
        errorMessagePassword: errorMessages.errorMessagePassword,
        errorMessageName: errorMessages.errorMessageName,
        errorMessagePhone: errorMessages.errorMessagePhone,
        errorMessageSpeciality: errorMessages.errorMessageSpeciality,
        errorMessageAddress: errorMessages.errorMessageAddress,
        errorMessageAvailability: errorMessages.errorMessageAvailability,
      });
    } else {
      this.setState({
        errorMessageEmail: errorMessages.errorMessageEmail,
        errorMessagePassword: errorMessages.errorMessagePassword,
        errorMessageName: errorMessages.errorMessageName,
        errorMessagePhone: errorMessages.errorMessagePhone,
        errorMessageSpeciality: errorMessages.errorMessageSpeciality,
        errorMessageAddress: errorMessages.errorMessageAddress,
        errorMessageAvailability: errorMessages.errorMessageAvailability,
      });
    }
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

  nextStep = (e) => {
    if (this.state.step1 && !this.state.step2 && !this.state.step3) {
      this.setState({
        step2: true,
        countStep: this.state.countStep + 1,
      });
    } else if (this.state.step1 && this.state.step2 && !this.state.step3) {
      this.setState({
        step3: true,
        countStep: this.state.countStep + 1,
      });
    }
  };
  previousStep = (e) => {
    if (this.state.step1 && this.state.step2 && !this.state.step3) {
      this.setState({
        step2: false,
        countStep: this.state.countStep - 1,
      });
    }
    if (this.state.step1 && this.state.step2 && this.state.step3) {
      this.setState({
        step3: false,
        countStep: this.state.countStep - 1,
      });
    }
  };

  formFirstStepValidation = (e) => {
    let errorMessages = {
      errorMessageName: "",
      errorMessageEmail: "",
      errorMessagePassword: "",
    };
    if (this.state.email.length === 0) {
      errorMessages.errorMessageEmail = "Email is required";
    } else if (!this.validateEmail(this.state.email)) {
      errorMessages.errorMessageEmail = "Email is invalid";
    }

    if (this.state.password.length === 0) {
      errorMessages.errorMessagePassword = "Password is required";
    } else if (this.state.password.length < 8) {
      errorMessages.errorMessagePassword =
        "Password must contain atleast 8 characters";
    }
    if (this.state.name.length === 0) {
      errorMessages.errorMessageName = "Name is required";
    }
    if (
      errorMessages.errorMessageName === "" &&
      errorMessages.errorMessagePassword === "" &&
      errorMessages.errorMessageEmail === ""
    ) {
      this.setState({
        errorMessageEmail: errorMessages.errorMessageEmail,
        errorMessagePassword: errorMessages.errorMessagePassword,
        errorMessageName: errorMessages.errorMessageName,
        step2: true,
        countStep: this.state.countStep + 1,
      });
    } else {
      this.setState({
        errorMessageEmail: errorMessages.errorMessageEmail,
        errorMessagePassword: errorMessages.errorMessagePassword,
        errorMessageName: errorMessages.errorMessageName,
      });
    }
  };

  formSecondStepValidation = () => {
    let errorMessages = {
      errorMessagePhone: "",
      errorMessageAvailability: "",

      errorMessageSpeciality: "",
    };

    if (this.state.speciality.length === 0) {
      errorMessages.errorMessageSpeciality = "Speciality is required";
    }
    if (this.state.phone.length === 0) {
      errorMessages.errorMessagePhone = "Phone Number is required";
    } else if (this.state.phone.length !== 11) {
      errorMessages.errorMessagePhone = "Phone Number is invalid";
    }
    if (this.state.availability.length === 0) {
      errorMessages.errorMessageAvailability = "Availability is required";
    }

    if (
      errorMessages.errorMessagePhone === "" &&
      errorMessages.errorMessageSpeciality === "" &&
      errorMessages.errorMessageAvailability === ""
    ) {
      this.setState({
        step3: true,
        countStep: this.state.countStep + 1,

        errorMessagePhone: errorMessages.errorMessagePhone,
        errorMessageSpeciality: errorMessages.errorMessageSpeciality,
        errorMessageAvailability: errorMessages.errorMessageAvailability,
      });
    } else {
      this.setState({
        errorMessagePhone: errorMessages.errorMessagePhone,
        errorMessageSpeciality: errorMessages.errorMessageSpeciality,
        errorMessageAvailability: errorMessages.errorMessageAvailability,
      });
    }
  };

  formLastStepValidation = (e) => {
    let errorMessages = {
      errorMessageAddress: "",
    };

    if (this.state.address.length === 0) {
      errorMessages.errorMessageAddress = "Address is required";
    }

    if (errorMessages.errorMessageAddress === "") {
      this.sendAuthenticationCode();
      this.setState({
        form: false,

        errorMessageAddress: errorMessages.errorMessageAddress,
      });
    } else {
      this.setState({
        errorMessageAddress: errorMessages.errorMessageAddress,
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" enabled>
        {this.state.form ? (
          <ScrollView style={{ backgroundColor: "#00b5ec" }}>
            <View style={styles.container}>
              <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />
              <Animatable.View animation="fadeIn" style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={{ alignSelf: "center", fontSize: 12 }}>
                  Step {this.state.countStep} of 3{" "}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    width: "80%",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 4,
                      backgroundColor: this.state.step1 ? "#05375a" : "#e4e4e4",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                      marginLeft: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      padding: 7,
                      height: 4,
                      backgroundColor: this.state.step1 ? "#05375a" : "#e4e4e4",
                      borderRadius: 7,
                      alignSelf: "center",
                    }}
                  ></View>
                  <View
                    style={{
                      flex: 1,
                      height: 4,
                      backgroundColor: this.state.step2 ? "#05375a" : "#e4e4e4",
                    }}
                  ></View>
                  <View
                    style={{
                      padding: 7,
                      height: 4,
                      backgroundColor: this.state.step2 ? "#05375a" : "#e4e4e4",
                      borderRadius: 7,
                    }}
                  ></View>
                  <View
                    style={{
                      flex: 1,
                      height: 4,
                      backgroundColor: this.state.step3 ? "#05375a" : "#e4e4e4",
                    }}
                  ></View>
                  <View
                    style={{
                      padding: 7,
                      height: 4,
                      backgroundColor: this.state.step3 ? "#05375a" : "#e4e4e4",
                      borderRadius: 7,
                      marginRight: 10,
                    }}
                  ></View>
                </View>
                {/*                                               Form Step one                                          */}

                {this.state.step1 && !this.state.step2 && !this.state.step3 && (
                  <React.Fragment>
                    {/*                                               Name Input                                          */}
                    <Text style={styles.text_footer}>
                      Name<Text style={styles.errorMsg}>* </Text>
                    </Text>
                    <View style={styles.action}>
                      <Icon
                        type="font-awesome"
                        name="stethoscope"
                        color="#00b5ec"
                        size={18}
                      />
                      <TextInput
                        placeholder="Your Name"
                        value={this.state.name}
                        style={styles.textInput}
                        onChangeText={(name) => this.setState({ name })}
                      />
                      {this.state.name.length !== 0 ? (
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
                    {this.state.errorMessageName === "" ? null : (
                      <View
                        style={{ flex: 1, flexDirection: "row", marginTop: 2 }}
                      >
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
                          {this.state.errorMessageName}
                        </Text>
                      </View>
                    )}
                    {/*                                               Email Input                                          */}

                    <Text
                      style={
                        (styles.text_footer,
                        { marginTop: this.state.marginTopForInputFields })
                      }
                    >
                      Email<Text style={styles.errorMsg}>* </Text>
                    </Text>
                    <View style={styles.action}>
                      <Icon
                        type="font-awesome"
                        name="envelope"
                        color="#00b5ec"
                        size={16}
                      />
                      <TextInput
                        placeholder="Your Email"
                        autoCapitalize="none"
                        value={this.state.email}
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
                    {this.state.errorMessageEmail === "" ? null : (
                      <View
                        style={{ flex: 1, flexDirection: "row", marginTop: 2 }}
                      >
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
                    {/*                                               Password Input                                          */}

                    <Text
                      style={
                        (styles.text_footer,
                        { marginTop: this.state.marginTopForInputFields })
                      }
                    >
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
                        value={this.state.password}
                        autoCapitalize="none"
                        secureTextEntry={
                          this.state.secureTextEntry1 ? true : false
                        }
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
                      <View
                        style={{ flex: 1, flexDirection: "row", marginTop: 2 }}
                      >
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
                    <View style={styles.button}>
                      {/*                                          Next to Form's Second Step Button                                         */}

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
                        onPress={() => this.formFirstStepValidation()}
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
                    </View>
                  </React.Fragment>
                )}

                {/*                                               Form Step two                                         */}

                {this.state.step1 && this.state.step2 && !this.state.step3 && (
                  <React.Fragment>
                    {/*                                               Speciality Input                                          */}

                    <Text
                      style={
                        (styles.text_footer,
                        { marginTop: this.state.marginTopForInputFields })
                      }
                    >
                      Speciality<Text style={styles.errorMsg}>* </Text>
                    </Text>
                    <View style={styles.action}>
                      <Icon
                        type="font-awesome"
                        name="star"
                        color="#00b5ec"
                        size={16}
                      />
                      <TextInput
                        placeholder="Your Speciality"
                        autoCapitalize="none"
                        value={this.state.speciality}
                        style={styles.textInput}
                        onChangeText={(speciality) =>
                          this.setState({ speciality })
                        }
                      />
                      {this.state.speciality.length !== 0 ? (
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
                    {this.state.errorMessageSpeciality === "" ? null : (
                      <View
                        style={{ flex: 1, flexDirection: "row", marginTop: 2 }}
                      >
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
                          {this.state.errorMessageSpeciality}
                        </Text>
                      </View>
                    )}
                    {/*                                               Availability Input                                          */}

                    <Text
                      style={
                        (styles.text_footer,
                        { marginTop: this.state.marginTopForInputFields })
                      }
                    >
                      Availability<Text style={styles.errorMsg}>* </Text>
                    </Text>
                    <View style={styles.action}>
                      <Icon
                        type="font-awesome"
                        name="clock-o"
                        color="#00b5ec"
                        size={16}
                      />
                      <TextInput
                        placeholder="Your Availability"
                        value={this.state.availability}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(availability) =>
                          this.setState({ availability })
                        }
                      />
                      {this.state.availability.length !== 0 ? (
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
                    {this.state.errorMessageAvailability === "" ? null : (
                      <View
                        style={{ flex: 1, flexDirection: "row", marginTop: 2 }}
                      >
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
                          {this.state.errorMessageAvailability}
                        </Text>
                      </View>
                    )}
                    {/*                                               Phone Input                                          */}

                    <Text
                      style={
                        (styles.text_footer,
                        { marginTop: this.state.marginTopForInputFields })
                      }
                    >
                      Phone<Text style={styles.errorMsg}>* </Text>
                    </Text>
                    <View style={styles.action}>
                      <Icon
                        type="font-awesome"
                        name="phone"
                        color="#00b5ec"
                        size={16}
                      />
                      <TextInput
                        placeholder="Your Phone"
                        value={this.state.phone}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(phone) => this.setState({ phone })}
                      />
                      {this.state.phone.length !== 0 ? (
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
                    {this.state.errorMessagePhone === "" ? null : (
                      <View
                        style={{ flex: 1, flexDirection: "row", marginTop: 2 }}
                      >
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
                          {this.state.errorMessagePhone}
                        </Text>
                      </View>
                    )}
                    <View style={[styles.button, { paddingTop: 10 }]}>
                      {/*                                          Next Button to Third Step                                         */}

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
                        onPress={() => this.formSecondStepValidation()}
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
                      {/*                                            Previous Button                                         */}

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
                        onPress={() => this.previousStep()}
                      >
                        <Text style={(styles.textSign, { color: "#00b5ec" })}>
                          Previous
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </React.Fragment>
                )}

                {/*                                               Form Step one                                         */}

                {this.state.step1 && this.state.step2 && this.state.step3 && (
                  <React.Fragment>
                    {/*                                               Address Input                                          */}

                    <View style={{ flex: 1 }}>
                      <Text
                        style={
                          (styles.text_footer,
                          { marginTop: this.state.marginTopForInputFields })
                        }
                      >
                        Address<Text style={styles.errorMsg}>* </Text>
                      </Text>
                      <View style={styles.action}>
                        <Icon
                          type="font-awesome"
                          name="map-marker"
                          color="#00b5ec"
                          size={16}
                        />
                        <TextInput
                          placeholder="Your Address"
                          autoCapitalize="none"
                          style={styles.textInput}
                          onChangeText={(address) => this.setState({ address })}
                        />
                        {this.state.address.length !== 0 ? (
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
                      {this.state.errorMessageAddress === "" ? null : (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 2,
                          }}
                        >
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
                            {this.state.errorMessageAddress}
                          </Text>
                        </View>
                      )}
                      <View style={[styles.button, { marginTop: 150 }]}>
                        {/*                                          Next Button                                         */}

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
                          onPress={() => this.formLastStepValidation()}
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
                              Register
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        {/*                                            Previous Button                                         */}

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
                          onPress={() => this.previousStep()}
                        >
                          <Text style={(styles.textSign, { color: "#00b5ec" })}>
                            Previous
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </React.Fragment>
                )}
              </Animatable.View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.container}>
            {/*                                             Screen for email verification                        */}

            <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />
            <Animatable.View animation="fadeIn" style={styles.header}>
              <Text style={styles.text_header}>Verify your email!</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text
                style={[
                  styles.text_footer,
                  { fontWeight: "bold", fontSize: 16 },
                ]}
              >
                <Text style={{ fontSize: 20 }}>Check your mailbox</Text> we have
                sent you a code to verify your email{" "}
              </Text>
              {/*                                               Authorization Code Input                                          */}
              <Text style={styles.text_footer}>
                Authorization Code<Text style={styles.errorMsg}>* </Text>
              </Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.actionAuthorization}>
                  <TextInput
                    placeholder="Your Code"
                    autoCapitalize="none"
                    style={styles.textInput}
                    maxLength={6}
                    onChangeText={(auth_code) => this.setState({ auth_code })}
                  />
                  {this.state.auth_code.length === 6 ? (
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
              </View>

              {/* {!this.state.message? null : (
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
                    {this.state.errorMessageName}
                  </Text>
                </View>
              )} */}

              {/*                                            Button Fields for Email Verification                                      */}
              <View style={styles.button}>
                {/*                                          verify Button                                         */}

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
                  onPress={() => this.verifyEmail()}
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
                      Verify
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
            {this.state.message &&
              this.props.navigation.navigate("DrawerComp", {
                email: this.state.email,
              })}
          </View>
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
    backgroundColor: "#00b5ec",
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
    paddingTop: 10,
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
  actionAuthorization: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingBottom: 5,
    width: "40%",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,

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
});
