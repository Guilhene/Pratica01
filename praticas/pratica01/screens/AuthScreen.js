import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/theme';
import { useRouter } from 'expo-router';

function AuthScreen() {
  const [enteredName, setEnteredName] = useState('');
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  function loginHandler() {
    const nameIsValid = enteredName.trim().length > 0;

    if (!nameIsValid) {
      Alert.alert('Entrada inválida', 'Por favor, insira um nome válido.');
      return;
    }

    authCtx.authenticate(enteredName);
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Gestão Financeira</Text>
      <Text style={styles.subtitle}>Por favor, digite seu nome para continuar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={enteredName}
        onChangeText={setEnteredName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={loginHandler} color={Colors.primary500} />
      </View>
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.primary700,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white', // Melhor contraste
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 16,
    color: Colors.primary800, // Texto escuro no input
    borderWidth: 1,
    borderColor: Colors.primary200,
  },
  buttonContainer: {
    width: '100%',
  },
});
