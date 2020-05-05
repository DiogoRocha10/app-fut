import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button} from 'react-native';
import axios from 'axios'

const Jogos = (props) => {
  const token = 'live_87cd4f22785310efca483c144ae5ee'
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
      <Text> {mensagem} </Text>
      <FlatList
        data={jogos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item)}>
            <Text style={styles.item}>{item.ida[0].placar}</Text>
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
    marginTop: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    marginLeft: "5%",
    marginTop: 10,
    padding: 3,
    textAlign: "center",
  },
});