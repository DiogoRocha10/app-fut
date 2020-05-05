import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios'


const Authorization = (props) => {
  const { navigation } = props

  const token = 'live_87cd4f22785310efca483c144ae5ee'
  const [resultado, setResultado] = useState([])


    const getCampeonatos = () => {
      axios.get('https://api.api-futebol.com.br/v1/campeonatos', 
      {headers: {'Authorization': `Bearer ${token}`}})
        .then((resultado) => {
          setResultado(resultado.data)
        })
        .catch((erro) => {
          setResultado(erro)
        })

    }
    useEffect(
      () => {
        getCampeonatos()

      }, []
    )

    return(
      <View style={styles.container}>
      <FlatList
        data={resultado}
        renderItem={
          ({ item }) =>
            <TouchableOpacity
              onPress={() => navigation.navigate("Fases", {campeonatoId: item.campeonato_id })}
            >
              <Text style={styles.item}>
                {item.edicao_atual.nome}
              </Text>
            </TouchableOpacity>
        }
        keyExtractor={(item) => item.edicao_atual}
      />
    </View>
  );
}

export default Authorization

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  }, 
  
  item: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    marginLeft: "5%",
    marginTop: 5,
    padding: 3,
    textAlign: 'center'
  }
});