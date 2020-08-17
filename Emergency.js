import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./header";
import AppointmentDetailModal from "./AppointmentModal";
import EmergencyDetailModal from "./EmergencyDetailModal";
import New from './NewComponent';
import { Icon } from "react-native-elements";
import * as RootNavigation from './RootNavigation';

const AppointmentStack = createStackNavigator();
export default AppointmentStackScreen = ({ navigation }) => {
  return (
    <AppointmentStack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00b5ec",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 14,
          flex: 1,
          textAlign: "center",
        },
        headerLeft: () => (
          <View
            style={{
              width: 40,
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="bars" type="font-awesome" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              width: 40,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Emergency')}>
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
                3
              </Text>
              <Icon name="bell" type="font-awesome" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <AppointmentStack.Screen name="Emergency" component={Emergency} />
      <AppointmentStack.Screen name="New" component={New} />
      
      </AppointmentStack.Navigator>
  );
};

class Emergency extends Component {
  state = {
    selectedAppointment: null,
    Appointments: [
      {
        name: "Farhan Khalid",
        key: 1,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/201",
        time: "9:30 am",
        age: 20,
        address: "Airport",
    coords: {
      "latitude": 24.9008,
      "longitude": 67.1681
    }
      },
      {
        name: "lala bhai",
        key: 3,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/203",
        time: "2:30 pm",
        age: 50,
        address: "bahadurabad",
    
        coords: {
          "latitude": 24.8822,
          "longitude": 67.0674
        }
      },
      {
        name: "Jackson",
        key: 4,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/204",
        time: "1:30 am",
        age: 30,
        address: "Nipa",
        coords: {
          "latitude": 24.9178,
          "longitude": 67.0972
        }
      },
      
    ],
  };

  closeModal = () => {
    this.setState({
      selectedAppointment: null,
    });
  };
  openModal = (selectedAppointmentKey) => {
    this.setState((prevState) => {
      return {
        selectedAppointment: prevState.Appointments.find((patient) => {
          return patient.key === selectedAppointmentKey;
        }),
      };
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, marginVertical: 10 }}>
          <EmergencyDetailModal
            selectedAppointment={this.state.selectedAppointment}
            closeModal={this.closeModal}
            // navigation={navigation}
          />
          {this.state.Appointments.map((appointment, i) => (
            <TouchableOpacity
              key={appointment.key}
              onPress={() => RootNavigation.navigate('New',  {locations: [{coords:appointment.coords}]} )}
          
            >
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginHorizontal: 20,

                    borderBottomWidth: 1,
                    borderColor: "#e4e4e4",
                    paddingVertical: 5,
                  }}
                >
                  <Image
                    style={{ width: 45, height: 45, borderRadius: 45 }}
                    source={{
                      uri: appointment.avatar_url,
                    }}
                    size={15}
                  />
                  <View
                    style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {appointment.name}
                    </Text>
                    <Text style={{ fontSize: 12 }}>{appointment.address}</Text>
                  </View>
                  <View style={{ width: 40, justifyContent: "center" }}>
                    <Icon
                      name="chevron-down"
                      type="font-awesome"
                      size={13}
                      color="#00b5ec"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}
