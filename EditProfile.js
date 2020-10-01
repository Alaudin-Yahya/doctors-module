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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";

const EditProfileStack = createStackNavigator();
export default EditProfile = (props, {navigation} ) => {
  return (
    <EditProfileStack.Navigator
      initialRouteName=""
      text_header="Edit Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b5ec",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 14,
          flex: 1,
          alignItems: "center",

          textAlign: "center",
        },
        headerLeft: () => (
          <View
            style={{
              width: 40,
            }}
          >
            <TouchableOpacity onPress={() =>
                  props.navigation.navigate("Settings", {
                    email: props.route.params.email,
                  })
                }>
              <Icon
                name="chevron-left"
                type="feather"
                size={26}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
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
      <EditProfileStack.Screen name="Edit Profile" component={EditProfile} 
      initialParams={{
        email: props.route.params.email,
      }}
      />
    </EditProfileStack.Navigator>
  );
};

class EditProfile extends Component {
  
    state = {
      name: "",
      address: "",
      speciality: "",
      phone: "", response : null, updateResult:null, previousName:'', previousPhone:'', previousAddress:'', 
      result:
        "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
    }
  
  componentDidMount(){
    fetch("http://instrux.live/doctors_module/api/profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        email: this.props.route.params.email,
        
      }),
    }).then(response => response.json())
        .then(data =>
          this.setState({
            previousName: data.doctor_name,
            previousPhone: data.doctor_phone,
            previousAddress: data.doctor_address
          })
        )
  }
  updateProfile = () => {
    console.log('updating')
    fetch("http://instrux.live/doctors_module/api/edit-profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body:  JSON.stringify(data)
      body: JSON.stringify({
        name: this.state.name,
        email: this.props.route.params.email,
        // password: this.state.password,
        // timing: this.state.availability,
        address: this.state.address,
        phone: this.state.phone,
        // speciality: this.state.speciality,
      }),
    }).then(response => response.json())
    .then(data =>
      this.setState({
        updateResult: data
      })
    )
  }
  render() {
    console.log("edit profile", this.props.route.params.email)
    if (this.state.updateResult===1){
      alert("Profile Updated!")
    }
    const abc = this.state.showMainSubMenu;
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [1, 1],
        // quality: 1,
      });

      this.setState({ result: result.uri });
    };
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" enabled>
          <View style={styles.container}>
            <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />
            <Animatable.View
              animation="fadeIn"
              duraton="1500"
              style={styles.header}
            >
              <View style={styles.header_icon_container}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: "#00b5ec",
                    position: "absolute",
                    zIndex: 2,
                    right: -5,
                    bottom: 0,
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name="pencil"
                    color="#fff"
                    size={18}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.header_icon}
                  source={{
                    uri: this.state.result,
                  }}
                  size={15}
                />
              </View>
              {/* <Text style={styles.text_header}>Edit Profile Pic</Text> */}
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.text_footer}>
                
                Name<Text style={styles.errorMsg}>* </Text>
              </Text>
              <View style={styles.action}>
                <Icon
                  type="font-awesome"
                  name="user"
                  color="#00b5ec"
                  size={16}
                />
                <TextInput
                  placeholder={this.state.previousName}
                  autoCapitalize="none"
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

              <Text style={styles.text_footer}>
                Phone<Text style={styles.errorMsg}>* </Text>
              </Text>
              <View style={styles.action}>
                <Icon
                  type="font-awesome"
                  name="user"
                  color="#00b5ec"
                  size={16}
                />
                <TextInput
                  placeholder={this.state.previousPhone}
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
              <Text style={styles.text_footer}>
                Address<Text style={styles.errorMsg}>* </Text>
              </Text>
              <View style={styles.action}>
                <Icon
                  type="font-awesome"
                  name="user"
                  color="#00b5ec"
                  size={16}
                />
                <TextInput
                  placeholder={this.state.previousAddress}
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
              {/* <Text style={styles.text_footer}>
                Name<Text style={styles.errorMsg}>* </Text>
              </Text>
              <View style={styles.action}>
                <Icon
                  type="font-awesome"
                  name="user"
                  color="#00b5ec"
                  size={16}
                />
                <TextInput
                  placeholder="Your Name"
                  autoCapitalize="none"
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
              </View> */}

              <View style={styles.button}>
              <TouchableOpacity
                    style={styles.signIn}
                    style={
                      (styles.signIn,
                      {
                        width: "70%",
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
                    onPress={() => this.updateProfile()}
                  >
                <LinearGradient
                  style={styles.signIn}
                  colors={["#00b5ec", "#009398"]}
                  onPress={() => this.updateProfile()}
                >
                  <Text style={(styles.textSign, { color: "#fff" })}>
                    Update Profile
                  </Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 0,
    alignItems: "center",
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  text_header: {
    padding: 6,
    borderRadius: 15,
  },
  header_icon_container: {
    backgroundColor: "rgba(255, 255, 255,0.6)",
    borderRadius: 100,
    // marginBottom: 20,
  },
  header_icon: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingBottom: 5,
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
    width: "100%",
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
