import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios'

const Fases = (props) => {
    
    const token = 'live_7a272cfcee40b533c1778fcec94510'
    const [fases, setFases] = useState([])

    const { navigation } = props 

    const getFases = () => {
      axios.get('https://api.api-futebol.com.br/v1/campeonatos/2/fases', 
      {headers: {'Authorization': `Bearer ${token}`}})
        .then((fases) => {
          setFases(fases.data)
        })
        .catch((erro) => {
          setFases(erro)
        })

    }
    useEffect(
      () => {
        getFases()

      }, []
    )

    return(
      <View style={styles.container}>
      <FlatList
        data={fases}
        renderItem={
          ({ item }) =>
            <TouchableOpacity
              onPress={() =>console.log(item)}
            >
              <Text style={styles.item}>
                {item.nome} 
              </Text>
            </TouchableOpacity>
        }
        keyExtractor={(item) => item.campeonato_id}
      />

    </View>
  );
}

export default Fases

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  }, item: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    marginLeft: "5%",
    marginTop: 5,
    padding: 3,
    textAlign: 'center'
  }, tinyLogo: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 200
  }, containerFoto: {
    width: "100%",
    alignItems: "center"
  }
});