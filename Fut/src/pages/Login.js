import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const Login = (props) => {

    const [usuario, setUsuario] = useState("Diogo")
    const [password, setPassword] = useState("123")
    const [msg, setMsg] = useState("")

    const { navigation } = props

    const getLogin = () => {
        if (usuario === "Diogo" && password === "123") {
            navigation.navigate("Authorization", { usuario })
        } else {
            setMsg("Usuário ou senha inválidos!")
        }

    }

    return (
        <View style={styles.container}>
            <Text>{msg}</Text>
            <TextInput
                style={styles.caixaTexto}
                placeholder="Usuário"
                onChangeText={(valor) => setUsuario(valor)}
                value={usuario}
            />
            <TextInput
                style={styles.caixaTexto}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(valor) => setPassword(valor)}
                value={password}
            />
            <View style={styles.botaoDefault}>
                <Button
                    title="Login"
                    onPress={() => getLogin()}
                />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    caixaTexto: {
        borderWidth: 1,
        borderColor: 'gray',
        width: "90%",
        padding: 5,
        marginTop: 5
    },
    botaoDefault: {
        width: "40%",
        padding: 5,
        marginTop: 5
    }
});
