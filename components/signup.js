import React, { Component } from "react";
//import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Picker
} from "react-native";

export default class SignUpView extends Component {
  
  
    state = {
        name: "",
        email: "",
        password: "",
        timing: "",
        address: "",
        phone: 0,
        speciality: "",
        
    }
    handleChange=({ target })=> {
        this.setState({
          [target.name]: target.value
        });
        
    }
    handlesubmit=()=>{
        
        fetch("https://doctors-module.000webhostapp.com/api/doctor-signup.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            // body:  JSON.stringify(data)
            body:JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                timing: this.state.timing,
                address: this.state.address,
                phone:this.state.phone,
                speciality: this.state.speciality


            })
            }
            
            )
            .then(response => response.text())
            .then(data => console.log(data));
            
    }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 40, color: "#00b5ec" }}>
          Signup
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              id="Name"
              style={{ placeholderTextColor: "#00b5ec" }}
              style={styles.inputs}
              placeholder="Full name"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              id="Name"
              style={{ placeholderTextColor: "#00b5ec" }}
              style={styles.inputs}
              placeholder="'Time'"
              underlineColorAndroid="transparent"
              onChangeText={timing => this.setState({ timing })}
            />
          </View>
          {/* <Text>You are {this.state.name}</Text> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>
          {/* <Text>You are {this.state.email}</Text> */}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>
          {/* <Text>You are {this.state.password}</Text> */}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Speciality"
              underlineColorAndroid="transparent"
              onChangeText={speciality => this.setState({ speciality })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Phone"
              underlineColorAndroid="transparent"
              onChangeText={phone => this.setState({ phone })}
            />
          </View>
          {/* <Text>You are {this.state.phone}</Text> */}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Address"
              underlineColorAndroid="transparent"
              onChangeText={address => this.setState({ address })}
            />
          </View>
          {/* <Text>You are {this.state.address}</Text> */}

          {/* <Text style={styles.color}>Speciality</Text> */}

          <TouchableHighlight
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={this.handlesubmit}
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  color: {
    color: "#00b5ec"
  },
  container: {
    // paddingTop: 100,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#00b5ec"
  },
  formContainer: {
    marginTop: 50
  },
  inputContainer: {
    borderBottomColor: "#00b5ec",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 250,
    height: 45,
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
  signupButton: {
    backgroundColor: "#00b5ec",
    borderColor: "#00b5ec",
    borderWidth: 1
  },
  signUpText: {
    color: "#ffffff"
  }
});