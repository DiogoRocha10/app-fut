import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios'

const Fases = (props) => {

  const { navigation } = props;
  const { route } = props;
  const { campeonatoId } = route.params;
  
  const [fases, setFases] = useState([])
  const [mensagem, setMensagem] = useState([]);
  
  const token = 'live_d1aa0187e5372b0090d8f278d40300'

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
        <Text style={styles.header}> {mensagem} </Text>
      <FlatList
        data={fases}
        renderItem={
          ({ item }) =>
          <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            navigation.replace("Jogos", {campeonatoId, faseId: item.fase_id,
            })
          }
          >
            <Text style={styles.textStyle}>{item.nome}</Text>
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
  alignItems: "center",
  marginTop: 10,
},
header: {
  fontSize: 24,
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
  backgroundColor: '#3AC330',
  borderWidth: 1,
  borderColor: '#000',
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 25,
  paddingLeft: 25,
  marginTop: 10,
  width: 200,
  borderRadius: 20
},

});