import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Button, Alert, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter, useLocalSearchParams } from "expo-router";
import { DespesasContext } from "../store/despesas-context";
import { fetchCategories, storeTransaction, updateTransaction } from "../util/http";
import { Colors } from "../constants/theme";

function GerenciarDespesa() {
    const despesasCtx = useContext(DespesasContext);
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const editedDespesaId = params.despesaId;
    const isEditing = !!editedDespesaId;

    const selectedDespesa = despesasCtx.despesas.find(d => d.id === editedDespesaId);

    const [data, setData] = useState(selectedDespesa ? new Date(selectedDespesa.data) : new Date());
    const [valor, setValor] = useState(selectedDespesa ? selectedDespesa.valor.toString() : '');
    const [descricao, setDescricao] = useState(selectedDespesa ? selectedDespesa.descricao : '');
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(selectedDespesa ? selectedDespesa.categoryId : null);

    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        async function getCategories() {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                if (!selectedCategoryId && fetchedCategories.length > 0) {
                    setSelectedCategoryId(fetchedCategories[0].id);
                }
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        getCategories();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || data;
        setShowPicker(false);
        setData(currentDate);
    }

    const handleChangeValor = (text) => {
        const cleanText = text.replace(',', '.');
        const match = cleanText.match(/^\d*\.?\d{0,2}$/);
        if(match){
            setValor(cleanText);
        }
    }

    async function confirmHandler() {
        const transactionData = {
            description: descricao,
            value: +valor,
            date: data.toISOString(),
            categoryId: selectedCategoryId
        };

        const isValid = transactionData.description.trim().length > 0 && transactionData.value > 0 && !!transactionData.categoryId;

        if (!isValid) {
            Alert.alert('Dados inválidos', 'Por favor, preencha todos os campos corretamente.');
            return;
        }

        try {
            if (isEditing) {
                const updated = await updateTransaction(editedDespesaId, transactionData);
                despesasCtx.updateDespesa(editedDespesaId, {
                    descricao: updated.description,
                    valor: updated.value,
                    data: new Date(updated.date),
                    categoryId: updated.categoryId
                });
            } else {
                const created = await storeTransaction(transactionData);
                despesasCtx.addDespesa({
                    id: created.id,
                    descricao: created.description,
                    valor: created.value,
                    data: new Date(created.date),
                    categoryId: created.categoryId
                });
            }
            router.back();
        } catch (error) {
            console.error("Erro ao salvar transação:", error);
            Alert.alert('Erro', 'Não foi possível salvar a transação.');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.input}
                    maxLength={20} 
                    value={descricao}
                    onChangeText={setDescricao}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor da Despesa</Text>
                <TextInput style={styles.input}
                    keyboardType={'decimal-pad'}
                    maxLength={10}
                    value={valor}
                    onChangeText={handleChangeValor}
                />
            </View>                   

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Data da despesa</Text>
                <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
                    <Text>{data.toLocaleDateString('pt-BR')}</Text>
                </Pressable>
                { showPicker && (
                    <DateTimePicker value={data} mode='date'
                        display='default' onChange={onChange}
                    />
                )}
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.categoryHeader}>
                    <Text style={styles.label}>Categoria</Text>
                    <Pressable onPress={() => router.push('/categoria')}>
                        <Text style={styles.addCategoryText}>+ Nova Categoria</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryContainer}>
                    {categories.map(cat => (
                        <Pressable 
                            key={cat.id} 
                            onPress={() => setSelectedCategoryId(cat.id)}
                            style={[
                                styles.categoryItem, 
                                selectedCategoryId === cat.id && styles.selectedCategory
                            ]}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategoryId === cat.id && styles.selectedCategoryText
                            ]}>{cat.displayName}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button title={isEditing ? "Atualizar" : "Adicionar"} onPress={confirmHandler} color={Colors.primary500} />
                <View style={{ height: 10 }} />
                <Button title="Cancelar" onPress={() => router.back()} color={Colors.primary100} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: Colors.primary700,
    },
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 8
    },
    label:{
        fontSize: 14,
        marginBottom: 4,
        color: 'white', // Melhor contraste no fundo roxo
        fontWeight: 'bold'
    },
    input:{
        borderWidth: 1,
        borderColor: Colors.primary200,
        backgroundColor: Colors.primary100,
        padding: 10,
        borderRadius: 6,
        fontSize: 16,
        color: Colors.primary800, // Texto escuro dentro do input claro
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addCategoryText: {
        color: Colors.accent500,
        fontWeight: 'bold',
        fontSize: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    categoryItem: {
        padding: 10,
        backgroundColor: Colors.primary200,
        borderRadius: 20,
        margin: 2,
    },
    selectedCategory: {
        backgroundColor: Colors.primary500,
    },
    categoryText: {
        color: Colors.primary700,
    },
    selectedCategoryText: {
        color: 'white',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
    }
})

export default GerenciarDespesa;