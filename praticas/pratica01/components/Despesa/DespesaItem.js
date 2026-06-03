import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { DespesasContext } from '@/store/despesas-context';
import { deleteTransaction } from '@/util/http';

function getDataFormatada(data) {
    if (!(data instanceof Date)) {
        data = new Date(data);
    }
    return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({item}) {
    const navigation = useNavigation();
    const despesasCtx = useContext(DespesasContext);

    function handlePress() {
        navigation.navigate('GerenciarDespesa', {
            despesaId: item.id
        });
    }

    async function handleDelete() {
        try {
            await deleteTransaction(item.id);
            despesasCtx.deleteDespesa(item.id);
        } catch (_error) {
            Alert.alert('Erro', 'Não foi possível excluir a despesa.');
        }
    }

    function handleLongPress() {
        Alert.alert(
            'Opções',
            'O que você deseja fazer?',
            [
                { text: 'Editar', onPress: handlePress },
                { text: 'Excluir', onPress: handleDelete, style: 'destructive' },
                { text: 'Cancelar', style: 'cancel' }
            ]
        );
    }

    return (
        <Pressable 
            onPress={handlePress} 
            onLongPress={handleLongPress}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.itemContainer}>
                <View style={styles.itemTextMain}>
                    <Text style={styles.dateText}>{getDataFormatada(item.data)}</Text>
                    <Text style={styles.descriptionText}>{item.descricao}</Text>
                    {item.category && <Text style={styles.categoryText}>{item.category.displayName}</Text>}
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>R$ {item.valor.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.7,
    },
    itemTextMain: {
        flex: 3,
    },
    dateText: {
        fontSize: 10,
        color: '#666',
        marginBottom: 2,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    categoryText: {
        fontSize: 12,
        color: '#7209b7',
        marginTop: 2,
    },
    amountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    }
})

export default DespesaItem;
