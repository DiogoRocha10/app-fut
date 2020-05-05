import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button} from 'react-native';
import axios from 'axios'

const Jogos = (props) => {
  const token = 'live_d1aa0187e5372b0090d8f278d40300'
  const { navigation } = props;
  const { route } = props;
  const { campeonatoId, faseId } = route.params;

  const [jogos, setJogos] = useState([]);
  const [mensagem, setMensagem] = useState([]);

  const getJogos = () => {
    axios
      .get(
        `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/fases/${faseId}`,
        {headers: {'Authorization': `Bearer ${token}`}})
      
      .then((retorno) => {
        const chaves = retorno.data.chaves;
        const arrayChaves = [];

        for (var chave in chaves) {
          arrayChaves.push(chaves[chave]);
        }
        setJogos(arrayChaves);
        console.log(jogos);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    getJogos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={jogos}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => console.log(item)}>

            <Text style={styles.textStyle}>{item.ida[0].placar}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.email}
      />
      <Button
        title="Sair"
        onPress={() => navigation.replace("Login")}
        color="red"
      />
    </View>
  );
};

export default Jogos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 0,
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
    backgroundColor: '#3AC330',
    borderWidth: 1,
    borderColor: '#000',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
    width: 300,
    borderRadius: 20
  },
});