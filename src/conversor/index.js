import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import api from '../services/api';

//https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=f4c5b41da8a16fc1e796
class Conversor extends Component{
    constructor(props){
        super(props);
        this.state = {
            moedaA: props.moedaA,
            moedaB: props.moedaB,
            moedaB_valor: 0,
            moedaA_valor: 0
        };

        this.converter = this.converter.bind(this)
    }

    async converter(){
       let de_para = this.state.moedaA + '_' + this.state.moedaB;
       const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=f4c5b41da8a16fc1e796`);
       let cotacao = response.data[de_para];

       let resultado = (cotacao * parseFloat(this.state.moedaB_valor));
       
       this.setState({
           valorConvertido: resultado.toFixed(2)
       });

       Keyboard.dismiss();
    }
  render(){
      const{moedaA, moedaB} = this.props
    return(
      <View style={styles.container}>
          <Text style={styles.titulo}>{moedaA} para {moedaB}</Text>
          <TextInput 
            placeholder="Valor" 
            style={styles.areaInput} 
            onChangeText={(moedaB_valor)=> this.setState({moedaB_valor})} 
            keyboardType="numeric"/>

          <TouchableOpacity style={styles.btnArea} onPress={this.converter}>
              <Text style={styles.btnTexto}>Converter</Text>
          </TouchableOpacity>

          <Text style={styles.valorConvertido} >
              {this.state.valorConvertido}
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
    //   backgroundColor: '#2069e0',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titulo:{
      fontSize: 30,
      fontWeight: "bold",
      color: "#000"  
    },
    areaInput:{
        width: 280,
        height: 45,
        backgroundColor: "#ccc",
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20,
        color: "#000",
        borderRadius: 5,
    },
    btnArea:{
        width: 150,
        height: 45,
        backgroundColor: "#1565c0",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    btnTexto:{
      fontSize: 15,
      fontWeight: "bold",
      color: "#fff"
    },
    valorConvertido: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#1565c0",
        marginTop: 15, 
    }
  });

export default Conversor;