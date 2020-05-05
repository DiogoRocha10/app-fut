import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios'


const Authorization = (props) => {
  const { navigation } = props

  const token = 'live_d1aa0187e5372b0090d8f278d40300'
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
        <Text style={styles.header}> Seja Bem-Vindo </Text>
      <FlatList
        data={resultado}
        renderItem={
          ({ item }) =>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate("Fases", {campeonatoId: item.campeonato_id })}
            >
              <Text style={styles.textStyle}>
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
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    fontSize: 36,
    margin: 50
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#0057e7',
    borderWidth: 1,
    borderColor: '#000',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 300,
    borderRadius: 20
  }
});