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
import PatientDetailModal from "./PatientModal";

import { Icon } from "react-native-elements";

const PatientStack = createStackNavigator();
export default PatientStackScreen = ({ navigation }) => {
  return (
    <PatientStack.Navigator
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
      <PatientStack.Screen name="Patients" component={Patient} />
    </PatientStack.Navigator>
  );
};

class Patient extends Component {
  state = {
    bhaiHazirHai: true,
    // selectedPatient: {
    //   name: "Chris Jackson",
    //   key: 12,
    //   disease: "Diabetes",
    //   avatar_url: "https://picsum.photos/276",
    //   time: "1:30 am",
    //   age: 20,
    // },
    selectedPatient:null,
    Patients: [
      {
        name: "Amy Farha",
        key: 1,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/201",
        time: "9:30 am",
        age: 20,
      },
      {
        name: "Chris Jackson",
        key: 2,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/202",
        time: "11:30 pm",
        age: 40,
      },
      {
        name: "Amy Farha",
        key: 3,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/203",
        time: "2:30 pm",
        age: 50,
      },
      {
        name: "Chris Jackson",
        key: 4,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/204",
        time: "1:30 am",
        age: 30,
      },
      {
        name: "Amy Farha",
        key: 5,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/205",
        time: "9:30 am",
        age: 60,
      },
      {
        name: "Chris Jackson",
        key: 6,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/206",
        time: "11:30 pm",
        age: 70,
      },
      {
        name: "Amy Farha",
        key: 7,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/207",
        time: "2:30 pm",
        age: 80,
      },
      {
        name: "Chris Jackson",
        key: 8,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/208",
        time: "1:30 am",
        age: 12,
      },
      {
        name: "Amy Farha",
        key: 9,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/199",
        time: "9:30 am",
        age: 20,
      },
      {
        name: "Chris Jackson",
        key: 10,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/198",
        time: "11:30 pm",
        age: 40,
      },
      {
        name: "Amy Farha",
        key: 11,
        disease: "Heart Disease",
        avatar_url: "https://picsum.photos/197",
        time: "2:30 pm",
        age: 70,
      },
      {
        name: "Chris Jackson",
        key: 12,
        disease: "Diabetes",
        avatar_url: "https://picsum.photos/276",
        time: "1:30 am",
        age: 10,
      },
    ],
  };

  closeModal = () => {
    this.setState({
      selectedPatient: null,
    });
  };
  openModal = (selectedPatientKey) => {
    this.setState((prevState) => {
      return {
        selectedPatient: prevState.Patients.find((patient) => {
          return patient.key === selectedPatientKey;
        }),
      };
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, marginVertical: 10 }}>
          <PatientDetailModal
            selectedPatient={this.state.selectedPatient}
            closeModal={this.closeModal}
          />
          {this.state.Patients.map((patient, i) => (
            <TouchableOpacity
              key={patient.key}
              onPress={() => this.openModal(patient.key)}
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
                      uri: patient.avatar_url,
                    }}
                    size={15}
                  />
                  <View
                    style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{patient.name}</Text>
                    <Text style={{ fontSize: 12 }}>{patient.time}</Text>
                  </View>
                  <View style={{ width: 20, justifyContent: "center" }}>
                    <Icon
                      name="info"
                      type="font-awesome"
                      size={13}
                      color="#fff"
                      backgroundColor="#00b5ec"
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        borderRadius: 100,
                      }}
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
