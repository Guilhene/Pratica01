import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/theme';
import { storeCategory } from '../util/http';

function CriarCategoriaScreen() {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isIncome, setIsIncome] = useState(false);
  const router = useRouter();

  async function saveHandler() {
    if (name.trim().length === 0 || displayName.trim().length === 0) {
      Alert.alert('Entrada inválida', 'Por favor, preencha todos os campos.');
      return;
    }

    const categoryData = {
      name: name.trim().toLowerCase().replace(/\s/g, '_'),
      displayName: displayName.trim(),
      icon: 'tag', // Ícone padrão
      background: isIncome ? '#4caf50' : '#f44336',
      isIncome: isIncome
    };

    try {
      await storeCategory(categoryData);
      router.back();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      Alert.alert('Erro', 'Não foi possível criar a categoria.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Interno (ex: lazer)</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Nome de Exibição (ex: Lazer)</Text>
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>É Receita?</Text>
        <Pressable 
            onPress={() => setIsIncome(!isIncome)}
            style={[styles.switch, isIncome && styles.switchOn]}
        >
            <Text style={styles.switchText}>{isIncome ? 'SIM' : 'NÃO'}</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Salvar Categoria" onPress={saveHandler} color={Colors.primary500} />
      </View>
    </View>
  );
}

export default CriarCategoriaScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: Colors.primary700,
    },
    label: {
      fontSize: 14,
      color: 'white', // Melhor contraste
      marginBottom: 8,
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: Colors.primary100,
      padding: 12,
      borderRadius: 6,
      marginBottom: 16,
      fontSize: 16,
      color: Colors.primary800, // Texto escuro no input
      borderWidth: 1,
      borderColor: Colors.primary200,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    switch: {
      backgroundColor: '#f44336',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    switchOn: {
      backgroundColor: '#4caf50',
    },
    switchText: {
      color: 'white',
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: 10,
    }
  });
