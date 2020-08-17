import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";



const FirstPageStack = createStackNavigator();



// export default FirstPageScreen = ({ navigation }) => {
//     return (
//       <FirstPageStack.Navigator
//         initialRouteName=""
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: "#009378",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontSize: 14,
//             marginLeft: -60,
//             textAlign: "center",
//           },
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <View style={{ position: "relative" }}>
//                 <Icon
//                   style={{ paddingLeft: 10 }}
//                   name="menu"
//                   type="feather"
//                   size={26}
//                   color="#fff"
//                 />
//               </View>
//             </TouchableOpacity>
//           ),
//         }}
//       >
//         <FirstPageStack.Screen name="FirstPage" component={FirstPage} />
//       </FirstPageStack.Navigator>
//     );
//   };
  
export default class FirstPage extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>First Page Screen</Text>
        <Button
          title="Go to Drawer"
          onPress={() => this.props.navigation.navigate("DrawerComp")}
          color="#009378"
        />
      </View>
    );
  }
}


