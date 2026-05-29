import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

function getDataFormatada(data) {
    const d = new Date(data);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

function formatCurrency(value) {
    const num = Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
}

function DespesaItem({item, onLongPress}) {
    return (
        <Pressable 
            onLongPress={() => onLongPress(item)}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.itemContainer}>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.description}>{item.descricao}</Text>
                    <Text style={styles.date}>{getDataFormatada(item.data)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>R$ {formatCurrency(item.valor)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    itemContainer: {
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: Colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    itemTextContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: 'white',
    },
    date: {
        fontSize: 12,
        color: Colors.primary100,
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: Colors.primary500,
        fontWeight: 'bold',
    }
})

export default DespesaItem;