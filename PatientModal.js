import React, { Component } from "react";
import {
  Modal,
  View,
  Button,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

const Width = Dimensions.get("window").width * 0.8;
class PatientDetailModal extends Component {
  state = {};

  render() {
    let modalContent = null;
    if (this.props.selectedPatient) {
      modalContent = (
        <View>
          <TouchableOpacity
            style={styles.modalCloseButtonContainer}
            onPress={() => this.props.closeModal()}
          >
            <Icon
              name="close"
              type="font-awesome"
              color="#05375a"
              size={18}
              style={styles.modalCloseButton}
            />
          </TouchableOpacity>
          <Text style={styles.PatientDialogHeader}>Patient Details</Text>

          <Image
            style={styles.PatientImage}
            source={{
              uri: this.props.selectedPatient.avatar_url,
            }}
          />

          <Text style={styles.patientName}>
            {this.props.selectedPatient.name}
          </Text>
          <Text>Disease: {this.props.selectedPatient.disease} Patient</Text>
          {/* <Text>{this.props.selectedPatient.time}</Text> */}
          <Text>Age: {this.props.selectedPatient.age}</Text>
        </View>
      );
    }
    return (
      <Modal
        visible={this.props.selectedPatient === null ? false : true}
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

export default PatientDetailModal;

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
  PatientDialogHeader: {
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
