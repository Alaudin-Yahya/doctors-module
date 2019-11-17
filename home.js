import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class Home extends React.Component{
    state={
        tableHead: ['id', 'name', 'Skill', "timing","Ph:no"],
        num:0,
        result: [],
    }
    componentDidMount(){
        this.setState({
            
            num:1
        })
        fetch('https://doctors-module.000webhostapp.com/api/doctor.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    result:responseJson
                })
            })
            .catch((error) => {
                console.error(error);
              });
          
    }
    
    render(){
        var res = this.state.result;
        return(
            <View>
                {/* <Text>jeje</Text> */}
                {console.log(this.state.result)}
                <Text>Doctor dataset</Text>
                <Table >
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>

                        {this.state.result.map((item,index)=>{
                        return <View key={index}>
                            {/* <Rows data={this.state.result} textStyle={styles.text}/> */}
                        <Text style={{backgroundColor:"#ffe9ec"}} key={index}> {item.doctor_id}             {item.doctor_name}      {item.doctor_speciality}           {item.doctor_timing}      {item.doctor_phone}</Text>
                            {/* <Text key={index}>{item.doctor_speciality}</Text> */}
                            </View>
                            console.log(item.doctor_name)

                        })}
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });