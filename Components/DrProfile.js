// import './images/uni1';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Icon } from "react-native-elements";
import React, { Component } from "react";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileData: {},
      email: this.props.navigation.state.params.email,
      password: "",
      result: [],
      authenticated: true,
      name: "David",
      response:[]
    };
  }
  componentDidMount(){
    fetch("http://instrux.live/doctors_module/api/profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        email: this.state.email,
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          response: data
        })
      );
  }
  render() {
    // const { ProfileData } = this.props.navigation.state.params.ProfileData;
    console.log(this.state.response)
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://i.pinimg.com/originals/29/26/42/29264200fe74a640313b09043a6d0020.png"
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {/* {this.props.navigation.state.params.ProfileData["doctor_name"]} */}
              {this.state.response.doctor_name}
            </Text>
            <Text style={styles.info}>
              {/* {this.props.navigation.getParam("email")} */}
            </Text>
            <Text style={styles.description}>
              {/* {this.props.navigation.state.params.ProfileData[
                "doctor_speciality"
              ] +
                " " +
                "Specialist"} */}

              {this.state.response.doctor_speciality + " " + "Specialist"}
            </Text>
            <View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate("EditProfile", {
                    // ProfileData: this.props.navigation.state.params.ProfileData
                    ProfileData: this.state.response
                  })
                }
              >
                <Icon name="edit" type="font-awesome" color="white" />
                <Text style={{ color: "white" }}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate("VerifyPassword", {
                    // ProfileData: this.props.navigation.state.params.ProfileData,
                    // password: this.props.navigation.state.params.password
                    email : this.state.email
                  })
                }
              >
                <Icon name="lock" type="font-awesome" color="white" />
                <Text style={{ color: "white" }}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate("QRScanner", {
                    // email: this.props.navigation.state.params.ProfileData[
                    //   "doctor_email"
                    // ]
                    email : this.state.email
                  })
                }
                underlayColor="#00b5ec"
              >
                <Text style={{ color: "white" }}>Scan QR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00b5ec",
    borderColor: "#00b5ec",
    borderWidth: 1.5
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    // marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 5,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
