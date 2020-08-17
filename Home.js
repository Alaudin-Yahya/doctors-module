import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import New from './NewComponent';
import Header from "./header";
import Emergency from './Emergency';

import { Icon } from "react-native-elements";
// import { black } from "react-native-paper/lib/typescript/src/styles/colors";

const HomeStack = createStackNavigator();
export default HomeStackScreen = ( { navigation }) => {
  return (
    <HomeStack.Navigator
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
            <TouchableOpacity onPress={() => navigation.navigate("Emergency")}
          >
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
      <HomeStack.Screen name="Home" component={Home}  />
      <HomeStack.Screen name="New" component={New} />
      <HomeStack.Screen name="Emergency" component={Emergency} />
    </HomeStack.Navigator>
  );
};

class Home extends Component {
  state = {};
  render() {
    // console.log('props', this.props.email)
  
    return (
      <View>
      <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri:'https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/2/1/2131.10-doctor-icon-iconbunny.jpg'}}/>
          {/* <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text>Alaudin Yahya</Text>
              
              
            </View>
          </View> */}
           <View style={styles.body}>
           <View style={styles.bodyContent}>
            
          <Text style={styles.name}>All In One Health App</Text>
          {/* <Text style={styles.info}>{this.props.route.params.email}</Text> */}
              <Text style={styles.description}>Powered by</Text>
              <Text style={styles.description}>National Centre of AI</Text>
              
          </View>
          </View>
          </View>
    );
  }
}
// class New extends Component {
//   state = {};
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>map screen</Text>
//         {/* <Button
//           title="Go to Detailssssss"
//           onPress={() => this.props.navigation.navigate("Details")}
//           color="#00b5ec"
//         /> */}
//       </View>
//     );
//   }
// }
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:	'#000000',
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    // flex: 1,
    alignItems: 'center',
    padding:30,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
