import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import { ListItem, Avatar, Icon } from "react-native-elements";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class AppoinmentCard extends Component {
  state = {};
  render() {
    return (
      <View style={card.cardContainer}>
        <View style={card.cardDateContainer}>
          <Icon name="user" type="font-awesome" color="#fff" size={20} />
        </View>
        <View style={card.cardContent}>
          <Text style={card.cardContentName}>
            {this.props.appointment.name}
          </Text>
          <Text>{this.props.appointment.subtitle}</Text>
        </View>
        <View>
          <View style={card.cardTimeContainer}>
            <Icon
              name="clock-o"
              type="font-awesome"
              color="#00b5ec"
              size={18}
            />
            <Text style={card.cardTime}>{this.props.appointment.time}</Text>
          </View>
          <View>
            <TouchableHighlight style={card.cardConfirmButton}>
              <Text style={card.cardConfirmButtonText}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

export default AppoinmentCard;
const card = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    height: 75,
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#bcbec1"
  },
  cardDateContainer: {
    marginTop: 5,
    backgroundColor: "#00b5ec",
    padding: 10,
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    marginLeft: 10,
    minWidth: wp("60%")
  },
  cardContentName: {
    fontSize: 15,
    fontWeight: "bold"
  },
  cardTimeContainer: {
    flexDirection: "row"
  },
  cardTime: {
    marginLeft: 3
  },
  cardConfirmButton: {
    marginTop: 5,
    alignItems: "center",
    padding: 5,
    backgroundColor: "#00b5ec",
    borderWidth: 1,
    borderColor: "#00b5ec",
    borderRadius: 15,
    maxWidth: wp("18%"),
    minWidth: wp("18%")
  },
  cardConfirmButtonText: {
    color: "#fff",
    justifyContent: "center"
  }
});
