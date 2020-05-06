import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const Authorization = (props) => {
  const { navigation } = props;
  const [resultados, setResultados] = useState([]);
  const token = 'live_8a89fdbd81efb8400bd66bdce6fc0c'

  const getChampionships = () => {
    axios
      .get("https://api.api-futebol.com.br/v1/campeonatos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((retorno) => {
        setResultados(retorno.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    getChampionships();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Seja Bem-Vindo </Text>
      <FlatList
        data={resultados}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              navigation.replace("Fases", { campeonatoId: item.campeonato_id })
            }
          >
            <Text style={styles.textStyle}>{item.nome_popular}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default Authorization;

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