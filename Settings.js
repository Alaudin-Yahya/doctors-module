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
import {DrawerComp} from './Drawer';
import {Home} from './Home';
import { createStackNavigator } from "@react-navigation/stack";
import * as RootNavigation from './RootNavigation';
const SettingsStack = createStackNavigator();
export default SettingsStackScreen = (props, { navigation }) => {
  return (
    <SettingsStack.Navigator
      initialRouteName=""
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
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
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
            {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
            </TouchableOpacity> */}
          </View>
        ),
      }}
    >
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        initialParams={{
          email: props.route.params.email,
          data: props.route.params.data
        }}
        screenOptions={{
          headerTitle: () => <Header />,
        }}
      />
      
    </SettingsStack.Navigator>
  );
};

class Settings extends Component {
  state = {
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    showMainSubMenu: false,
    showSecuritySubMenu: false,
  };

  showPassword = (e) => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  showMainSubMenu = (e) => {
    this.setState({
      showMainSubMenu: !this.state.showMainSubMenu,
    });
  };
  showSecuritySubMenu = (e) => {
    this.setState({
      showSecuritySubMenu: !this.state.showSecuritySubMenu,
    });
  };
  render() {
    const abc = this.state.showMainSubMenu;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#00b5ec" barStyle="dark-content" />

        <Animatable.View animation="fadeIn" style={styles.footer}>
          <View style={styles.ListHeader}>
            <Text style={styles.ListHeaderText}>Main</Text>
            <TouchableOpacity
              style={[
                styles.text_header,
                this.state.showMainSubMenu
                  ? styles.rotateMainMenu
                  : styles.unrotateMainMenu,
              ]}
              onPress={() => this.showMainSubMenu()}
            >
              <Icon
                name="chevron-down"
                type="font-awesome"
                color="#fff"
                size={15}
              />
            </TouchableOpacity>
          </View>
          {this.state.showMainSubMenu ? (
            <Animatable.View style={styles.SettingsSubMenu} animation="fadeIn">
              {console.log('Steeings', this.props.route.params.email)}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("EditProfile", {
                    email: this.props.route.params.email,
                    data: this.props.route.params.data
                  })
                }
              >
                <View style={styles.SettingsSubMenuItem}>
                  <Icon
                    name="pencil"
                    type="font-awesome"
                    color="#00b5ec"
                    size={18}
                    style={styles.SettingsSubMenuItemIcon}
                  />
                  <Text style={{ flex: 1 }}>Edit Profile</Text>
                  <Icon
                    name="chevron-right"
                    type="font-awesome"
                    color="#00b5ec"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.SettingsSubMenuItem}>
                <Icon
                  name="camera"
                  type="font-awesome"
                  color="#00b5ec"
                  size={18}
                  style={styles.SettingsSubMenuItemIcon}
                />
                <Text style={{ flex: 1 }}>Update Profile Picture</Text>
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#00b5ec"
                  size={15}
                />
              </View>
            </Animatable.View>
          ) : null}
          <View style={styles.ListHeader}>
            <Text style={styles.ListHeaderText}>Security and Privacy</Text>
            <TouchableOpacity
              style={[
                styles.text_header,
                this.state.showSecuritySubMenu
                  ? styles.rotateMainMenu
                  : styles.unrotateMainMenu,
              ]}
              onPress={() => this.showSecuritySubMenu()}
            >
              <Icon
                name="chevron-down"
                type="font-awesome"
                color="#fff"
                size={15}
              />
            </TouchableOpacity>
          </View>
          {this.state.showSecuritySubMenu ? (
            <Animatable.View style={styles.SettingsSubMenu} animation="fadeIn">
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ChangePassword", {
                    email: this.props.route.params.email,
                  })
                }
              >
                <View style={styles.SettingsSubMenuItem}>
                  <Icon
                    name="lock"
                    type="font-awesome"
                    color="#00b5ec"
                    size={25}
                    style={styles.SettingsSubMenuItemIcon}
                  />
                  <Text style={{ flex: 1 }}>Change Password</Text>
                  <Icon
                    name="chevron-right"
                    type="font-awesome"
                    color="#00b5ec"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ) : null}
        </Animatable.View>
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
  rotateMainMenu: {
    transform: [{ rotate: "180deg" }],
  },
  unrotateMainMenu: {
    transform: [{ rotate: "0deg" }],
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
