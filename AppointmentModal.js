import React, { Component } from "react";
import {
  Modal,
  View,
  Button,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";

const Width = Dimensions.get("window").width * 0.8;
class AppointmentDetailModal extends Component {
  state = {};

  render() {
    let modalContent = null;
    if (this.props.selectedAppointment) {
      modalContent = (
        <View>
          <TouchableOpacity
            style={styles.modalCloseButtonContainer}
            onPress={() => this.props.closeModal()}
          >
            <Icon name="close" type="font-awesome" color="#05375a" size={18} />
          </TouchableOpacity>

          <Text style={styles.AppointmentDialogHeader}>Patient Details</Text>

          <Image
            style={styles.PatientImage}
            source={{
              uri: this.props.selectedAppointment.avatar_url,
            }}
          />
          <Text style={styles.patientName}>
            {this.props.selectedAppointment.name}
          </Text>
          <Text>Disease: {this.props.selectedAppointment.disease} Patient</Text>
          {/* <Text>{this.props.selectedAppointment.time}</Text> */}
          <Text>Age: {this.props.selectedAppointment.age}</Text>
        </View>
      );
    }
    return (
      <Modal
        visible={this.props.selectedAppointment === null ? false : true}
        animation="slide"
        onRequestClose={() => this.props.closeModal()}
        transparent={true}
      >
        <View style={styles.modalMainContainer}>
          <View style={styles.modalInnerContaier}>{modalContent}</View>
        </View>
      </Modal>
    );
  }
}

export default AppointmentDetailModal;
const styles = StyleSheet.create({
  modalMainContainer: {
    flex: 1,
    height: Dimensions.get("window").height * 0.7,
    paddingHorizontal: Dimensions.get("window").width * 0.1,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: Dimensions.get("window").height * 0.1,
  },
  modalInnerContaier: {
    flex: 1,
    width: Dimensions.get("window").width * 0.8,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 0,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 500,
    borderRadius: 10,
  },
  AppointmentDialogHeader: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
    marginTop: -20,
    marginBottom: 20,
    color: "#05375a",
  },
  PatientImage: {
    width: 85,
    height: 85,
    borderRadius: 45,
    alignSelf: "center",
  },
  patientName: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 15,
    marginTop: 30,
    color: "#05375a",
  },
  modalCloseButtonContainer: {
    width: 25,
    alignSelf: "flex-end",
  },
});
