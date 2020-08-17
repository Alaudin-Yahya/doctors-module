import React, { Component } from "react";
import Screen from "./Screen";

export const ProfileScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Profile" />
);
export const HomeScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Home" />
);
export const ActivityScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Activity" />
);
export const PatientsScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Patients" />
);
export const QRScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="QR" />
);
 