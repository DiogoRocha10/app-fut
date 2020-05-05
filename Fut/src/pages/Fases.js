import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios'

const Fases = (props) => {

  const { navigation } = props;
  const { route } = props;
  const { campeonatoId } = route.params;
  
  const [fases, setFases] = useState([])
  const [mensagem, setMensagem] = useState([]);
  
  const token = 'live_7a272cfcee40b533c1778fcec94510'

    const getFases = () => {
      axios.get(`https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}`, 
      {headers: {'Authorization': `Bearer ${token}`}})
        .then((fases) => {
          const fasesTeste = fases.data.fases;
          if (fasesTeste.length < 1) {
            setMensagem("Campeonado não Iniciado");
          } else {
            setMensagem("Fases já ocorridas: ");
            const fasesFinalizadas = [];
            fasesTeste.map((fase) => {
              if (fase.status === "finalizado") {
                fasesFinalizadas.push(fase);
              }
            });
            setFases(fasesFinalizadas);
            console.log("Teste", fasesFinalizadas);
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
    };
    

    useEffect(
      () => {
        getFases()

      }, []
    )

    return(
      <View style={styles.container}>
        <Text> {mensagem} </Text>
      <FlatList
        data={fases}
        renderItem={
          ({ item }) =>
          <TouchableOpacity
          onPress={() =>
            navigation.replace("Jogos", {campeonatoId, faseId: item.fase_id,
            })
          }
          >
            <Text style={styles.item}>{item.nome}</Text>
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
  },
  
  item: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    marginLeft: "5%",
    marginTop: 5,
    padding: 3,
    textAlign: 'center'
  }, 
  
});