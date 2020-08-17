import React, { useState, useEffect }  from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./header";

import { Icon } from "react-native-elements";
import MapView from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

import Polyline from '@mapbox/polyline'

import  Marker from 'react-native-maps'

// const locations = require('./locations.json')
// import locations from './locations';
const { width, height } = Dimensions.get('screen');
const locations = [
  {
    "name": "ned",
    "id":1,
    "address": "uni road",
    "coords": {
      "latitude": 24.8822,
      "longitude": 67.0674
    }
  },
  {
    "name": "nipa",
    "id":2,
    "address": "uni road",
    "coords": {
      "latitude": 24.9178,
      "longitude": 67.0972
    }
  },
  {
    "name": "airport",
    "id":3,
    "address": "air road",
    "coords": {
      "latitude": 24.9008,
      "longitude": 67.1681
    }
  }
  
]

class Mapss extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locations: this.props.route.params.locations,
    direct : false
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    console.log("pass",this.props.route.params.coords)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )

    const { locations: [ sampleLocation ] } = this.state

    this.setState({
      desLatitude: sampleLocation.coords.latitude,
      desLongitude: sampleLocation.coords.longitude
    }, this.mergeCoords)
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      // console.log(concatEnd)
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=`)
      const respJson = await resp.json();
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      const distance = distanceTime.distance.text
      const time = distanceTime.duration.text
      var points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, time, direct : true })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  onMarkerPress = location => () => {
    const { coords: { latitude, longitude } } = location
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)
  }

  renderMarkers = () => {
    const { locations } = this.state
    // console.log('locations:',locations)
    return (
      <React.Fragment>
        {
          locations.map((location, idx) => {
            const {
              coords: { latitude, longitude }
            } = location
            // console.log('coords:',latitude)
            return (
              <MapView.Marker
                key={idx}
                coordinate={{ latitude, longitude }}
                onPress={this.onMarkerPress(location)}
              />
            )
          })
        }
     </React.Fragment>
    )
  }

  render() {
    const {
      time,
      coords,
      distance,
      latitude,
      longitude,
      destination
    } = this.state
    if (latitude) {
      return (
        <React.Fragment>
          <MapView
            showsUserLocation
            style={{ flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            loadingEnabled = {true}
            loadingIndicatorColor="#666666"
            loadingBackgroundColor="#eeeeee"
            moveOnMarkerPress = {false}
            showsUserLocation={true}
            showsCompass={true}
            showsPointsOfInterest = {false}
            provider="google">
            {/* {locations.map((marker:any)  => (  
                  <MapView.Marker
                    key={locations.id}
                    coordinate={{longitude, latitude}}
                    
                  />
            
            ))} */}
           
           {this.renderMarkers()}
         
          
            {this.state.direct && 
              <MapView.Polyline
              strokeWidth={2}
              strokeColor="red"
              coordinates={coords}
              />
            }
          
       
        </MapView>
        <Text style={{ fontWeight: 'bold',position: "absolute", left:10, bottom: 10, backgroundColor:"white"}}>Estimated Time: {time}</Text>
        <Text style={{ fontWeight: 'bold', position: "absolute", left:10,bottom: 30, flex:1, backgroundColor:"white"}}>Estimated Distance: {distance}</Text>
         
        </React.Fragment>
      
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission!</Text>
      </View>
    )
  }
}
export default Mapss;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
