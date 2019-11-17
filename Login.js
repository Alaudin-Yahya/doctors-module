import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { 
    StyleSheet, 
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Button,
    Alert
 } from 'react-native';

import logoImage from './images/logo.png';
import Signup from './Signup';

const {width: WIDTH} = Dimensions.get('window');

export default function App() {

  // onBtnPress=()=> {
  //  // alert('Moving to Sign Up!');
  //  console.log('abcd');
  //   <Signup/>
  // }
  return (
    <ImageBackground  style={ styles.backgroundContainer } 
                  source={require('./images/background1.jpg')}
>
        <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.Logo}>
            </Image>
            <Text style={styles.logoText}>Welcome Doctor!</Text>
        
            <TextInput
            style={styles.login_input}
            placeholder={"Enter User Name"}
            //  placeholderTextColor={'rgba(225,225,225,0.7'}
            underlineColorAndroid={'transparent'}
          />

          <TextInput
            style={styles.login_input}
            placeholder={"password"}
            secureTextEntry={true}
            //  placeholderTextColor={'rgba(225,225,225,0.7'}
            underlineColorAndroid={'transparent'}
          />    

          <TouchableOpacity  style={styles.btn_Login}>
        <Text
            style={styles.login_text}
            >Login</Text>

        </TouchableOpacity>

        <View>
          <TouchableOpacity  style={styles.extra_text} > 
            <Text style={{fontSize:15}}   onPress={() => this.props.navigation.navigate('Signup')} >No Account? SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.extra_text}>
            <Text style={{textAlign: "center", fontSize: 15}}>Forget Password?</Text>
          </TouchableOpacity>
          
        </View>
          
        </View>
      
    

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    alignItems: 'center',
    flexDirection: 'column',  
  },
  Logo:
  {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginTop: 50
  },
  logoContainer:
  {
    alignItems:'center'
  },
  logoText:
  {
    fontSize: 20,
    color:'#070533',
    fontWeight: '500',
    marginTop: 20,
    opacity: 0.9

  },
  login_input : {
    width: WIDTH-55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    marginHorizontal: 25,
    backgroundColor: '#e2e1ed',
    marginTop: 30
  // flex: 1
  },
  inputContainer:{
    marginTop: 10
  },
  loginContainer:
  {
    marginBottom: 50,
    alignItems: 'center',
  },

  btn_Login:
  {
    width: WIDTH-55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#070533',
    justifyContent:'center',
    marginTop: 20

  },
  login_text:
  {
    color: '#fcf9f7',
    fontSize: 16,
    textAlign: 'center'
  },
  extra_text:
  {
    color: '#070533',
    textAlign:'center',
    marginTop: 10
  }

});
