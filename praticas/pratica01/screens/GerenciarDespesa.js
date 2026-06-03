import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Button, Alert, ActivityIndicator } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DespesasContext } from '@/store/despesas-context';
import { storeTransaction, updateTransaction, deleteTransaction, fetchCategories, storeCategory } from '@/util/http';
import { Colors } from '@/constants/theme';

function GerenciarDespesa() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const route = useRoute();
    const navigation = useNavigation();
    const despesasCtx = useContext(DespesasContext);

    const editDespesaId = route.params?.despesaId;
    const isEditing = !!editDespesaId;

    const selectedDespesa = despesasCtx.despesas.find(d => d.id === editDespesaId);

    const [data, setData] = useState(isEditing ? new Date(selectedDespesa.data) : new Date());
    const [valor, setValor] = useState(isEditing ? selectedDespesa.valor.toString() : '');
    const [descricao, setDescricao] = useState(isEditing ? selectedDespesa.descricao : '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(isEditing ? selectedDespesa.categoryId : '');

    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar Despesa' : 'Adicionar Despesa'
        });
    }, [navigation, isEditing]);

    useEffect(() => {
        async function getCategories() {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                if (!isEditing && fetchedCategories.length > 0) {
                    setSelectedCategoryId(fetchedCategories[0].id);
                }
            } catch (error) {
                console.log(error);
                Alert.alert('Erro', 'Não foi possível carregar as categorias.');
            }
            setIsLoadingCategories(false);
        }
        getCategories();
    }, [isEditing]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || data;
        setShowPicker(false);
        setData(currentDate);
    }

    const [showPicker, setShowPicker] = useState(false);

    const handleChangeValor = (text) => {
        const cleanText = text.replace(',', '.');
        const match = cleanText.match(/^\d*\.?\d{0,2}$/);
        if (match) {
            setValor(cleanText);
        }
    }

    async function handleAddCategory() {
        if (newCategoryName.trim().length === 0) return;
        setIsAddingCategory(true);
        try {
            const newCat = await storeCategory({
                name: newCategoryName.toLowerCase().replace(/\s/g, '_'),
                displayName: newCategoryName,
                icon: 'cash',
                background: '#ccc',
                isIncome: false
            });
            setCategories(prev => [...prev, newCat]);
            setSelectedCategoryId(newCat.id);
            setNewCategoryName('');
        } catch (_error) {
            Alert.alert('Erro', 'Não foi possível criar a categoria.');
        }
        setIsAddingCategory(false);
    }

    async function confirmHandler() {
        const transactionData = {
            description: descricao,
            value: +valor,
            date: data.toISOString(),
            categoryId: selectedCategoryId
        };

        const isValidValue = !isNaN(transactionData.value) && transactionData.value > 0;
        const isValidDesc = transactionData.description.trim().length > 0;
        const isValidCat = !!transactionData.categoryId;

        if (!isValidValue || !isValidDesc || !isValidCat) {
            Alert.alert('Entrada Inválida', 'Por favor verifique os campos.');
            return;
        }

        setIsSubmitting(true);
        try {
            if (isEditing) {
                const updated = await updateTransaction(editDespesaId, transactionData);
                despesasCtx.updateDespesa(editDespesaId, {
                    ...updated,
                    data: new Date(updated.date),
                    descricao: updated.description,
                    valor: updated.value
                });
            } else {
                const created = await storeTransaction(transactionData);
                despesasCtx.addDespesa({
                    ...created,
                    data: new Date(created.date),
                    descricao: created.description,
                    valor: created.value
                });
            }
            navigation.goBack();
        } catch (_error) {
            Alert.alert('Erro', 'Não foi possível salvar a despesa.');
            setIsSubmitting(false);
        }
    }

    async function deleteHandler() {
        setIsSubmitting(true);
        try {
            await deleteTransaction(editDespesaId);
            despesasCtx.deleteDespesa(editDespesaId);
            navigation.goBack();
        } catch (_error) {
            Alert.alert('Erro', 'Não foi possível excluir a despesa.');
            setIsSubmitting(false);
        }
    }

    if (isSubmitting) {
        return <ActivityIndicator size="large" style={styles.container} />;
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
                <Text style={styles.label}>Data</Text>
                <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
                    <Text>{data.toLocaleDateString('pt-BR')}</Text>
                </Pressable>
                { showPicker && (
                    <DateTimePicker value={data} mode='date'
                    display='default' onChange={onChangeDate}
                    />
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria</Text>
                {isLoadingCategories ? <ActivityIndicator /> : (
                    <View style={styles.categoriesGrid}>
                        {categories.map(cat => (
                            <Pressable 
                                key={cat.id} 
                                style={[styles.categoryItem, selectedCategoryId === cat.id && styles.selectedCategory]}
                                onPress={() => setSelectedCategoryId(cat.id)}
                            >
                                <Text style={[styles.categoryText, selectedCategoryId === cat.id && styles.selectedCategoryText]}>
                                    {cat.displayName}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nova Categoria</Text>
                <View style={styles.row}>
                    <TextInput 
                        style={[styles.input, {flex: 1, marginBottom: 0}]}
                        value={newCategoryName}
                        onChangeText={setNewCategoryName}
                        placeholder="Nome da categoria"
                    />
                    <Button title="+" onPress={handleAddCategory} disabled={isAddingCategory} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button title={isEditing ? 'Atualizar' : 'Adicionar'} onPress={confirmHandler} color="#7209b7" />
                {isEditing && (
                    <View style={{marginTop: 10}}>
                        <Button title="Excluir" onPress={deleteHandler} color="red" />
                    </View>
                )}
                <View style={{marginTop: 10}}>
                    <Button title="Cancelar" onPress={() => navigation.goBack()} color="#666" />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    inputContainer:{
        marginBottom: 15
    },
    label:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333'
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        fontSize: 16
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    categoryItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#7209b7',
        marginBottom: 5
    },
    selectedCategory: {
        backgroundColor: '#7209b7'
    },
    categoryText: {
        color: '#7209b7',
        fontSize: 12
    },
    selectedCategoryText: {
        color: '#fff'
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40
    }
})

export default GerenciarDespesa;
