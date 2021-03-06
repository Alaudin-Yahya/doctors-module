import React, { Component } from 'react'
import {StyleSheet, Text, View} from 'react-native';

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Game Zone </Text>
                </View>
            </View>
         );
    }
}
 
export default Header;

const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:"100%",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    headerText:{
        fontWeight:"bold",
        fontSize:20,
        color: "#333",
        letterSpacing:1
    }
})