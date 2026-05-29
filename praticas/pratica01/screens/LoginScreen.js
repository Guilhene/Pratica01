import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../store/auth-context';
import { Colors } from '../constants/theme';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  function loginHandler() {
    if (username.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, insira um nome de usuário.');
      return;
    }
    login(username);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={loginHandler} color={Colors.primary500 || '#7209b7'} />
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});
