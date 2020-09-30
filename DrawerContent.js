import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  StatusBar,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Details from "./details";

import FeedStack from "./FeedStack";
import { Icon } from "react-native-elements";

export function DrawerContent(props, { navigation }) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
            size={50}
          />
          <Title style={styles.title}>Alaudin Yahya</Title>
          <Caption style={styles.caption}>{props.email}</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Patients</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Appointments</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            style={{ justifyContent: "center", height: 40 }}
            icon={({ color, size }) => (
              <Icon
                name="home"
                type="font-awesome"
                color="#05375a"
                size={18}
                style={{ width: 19 }}
              ></Icon>
            )}
            label="HomeScreen"
            labelStyle={{ color: "#05375a", fontSize: 12 }}
            onPress={() => {
              props.navigation.navigate("Home", {email: props.email});
            }}
          />
          <DrawerItem
            style={{ justifyContent: "center", height: 40 }}
            icon={({ color, size }) => (
              <Icon
                name="calendar-check-o"
                type="font-awesome"
                color="#05375a"
                size={17}
                style={{ width: 19 }}
              ></Icon>
            )}
            label="Appointments"
            labelStyle={{ color: "#05375a", fontSize: 12 }}
            onPress={() => {
              props.navigation.navigate("Appointments");
            }}
          />
          <DrawerItem
            style={{ justifyContent: "center", height: 40 }}
            icon={({ color, size }) => (
              <Icon
                name="plus"
                type="font-awesome"
                color="#05375a"
                size={18}
                style={{ width: 19 }}
              ></Icon>
            )}
            label="Patients"
            labelStyle={{ color: "#05375a", fontSize: 12 }}
            onPress={() => {
              props.navigation.navigate("Patients");
            }}
          />
          <DrawerItem
            style={{ justifyContent: "center", height: 40 }}
            icon={({ color, size }) => (
              <Icon
                style={{ width: 19 }}
                name="qrcode"
                type="font-awesome"
                color="#05375a"
                size={18}
              ></Icon>
            )}
            label="Web View"
            labelStyle={{ color: "#05375a", fontSize: 12 }}
            onPress={() => {
              props.navigation.navigate("WebView");
            }}
          />
          <DrawerItem
            style={{ justifyContent: "center", height: 40 }}
            icon={({ color, size }) => (
              <Icon
                style={{ width: 19 }}
                name="cogs"
                type="font-awesome"
                color="#05375a"
                size={18}
              ></Icon>
            )}
            label="Settings"
            labelStyle={{ color: "#05375a", fontSize: 12, padding: 0 }}
            onPress={() => {
              props.navigation.navigate("Settings",{email:props.email});
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: "#00b5ec",
    marginTop: -4,
    paddingVertical: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
