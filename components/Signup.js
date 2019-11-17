import React from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    Dimensions,
    TouchableOpacity, 
    KeyboardAvoidingView,
 } from 'react-native';
// import {Icon} from 'react-native-vector-icons/ionicons';
import logoImage from './images/logo.png';

const {width: WIDTH} = Dimensions.get('window');

export default function App() {    
  return (
  <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}
            >
              <ImageBackground  style={ styles.backgroundContainer } 
                  source={require('./images/background.jpg')}
>
        <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.Logo}>
            </Image>
            <Text style={styles.logoText}>Welcome Doctor!</Text>
            
            {/* <Icon name='md-person' size={10} color={'white'} syles={styles.icon}/> */}
            <TextInput
            style={styles.login_input}
            placeholder={"Enter User Name"}
            underlineColorAndroid={'transparent'}
          />

          <TextInput
            style={styles.login_input}
            placeholder={"password"}
            secureTextEntry={true}
            //  placeholderTextColor={'rgba(225,225,225,0.7'}
            underlineColorAndroid={'transparent'}
          />    
          <TextInput
            style={styles.login_input}
            placeholder={"Email"}
            underlineColorAndroid={'transparent'}
          />    

          <TextInput
            style={styles.login_input}
            placeholder={'Avalaibility'}
            //  placeholderTextColor={'rgba(225,225,225,0.7'}
            underlineColorAndroid={'transparent'}
          />    

          <TextInput
            style={styles.login_input}
            placeholder={"Address"}
            secureTextEntry={true}
            //  placeholderTextColor={'rgba(225,225,225,0.7'}
            underlineColorAndroid={'transparent'}
          />    

          <TextInput
            style={styles.login_input}
            placeholder={"Speciality"}
            secureTextEntry={true}
            //  placeholderTextColor={'rgba(225,225,225,0.7'}
            underlineColorAndroid={'transparent'}
          />    


          <TouchableOpacity  style={styles.btn_Signup}>
        <Text
            style={styles.login_text}
            >SignUp</Text>

        </TouchableOpacity>
        </View>
    </ImageBackground>

</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    alignItems: 'center',
    flexDirection: 'column'
  
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
    marginTop: 10
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

  btn_Signup:
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

});




