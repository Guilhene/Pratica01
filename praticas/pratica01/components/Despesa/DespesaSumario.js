import { Text, View, StyleSheet } from "react-native";

function DespesaSumario({despesas, periodo}){
    const somaDespesas = despesas.reduce((total, despesa) => {
        return total + despesa.valor;
    }, 0);
    
    return(
        <View style={styles.container}>
            <Text style={styles.periodText}>{periodo}</Text>
            <Text style={styles.sumText}>R$ {somaDespesas.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#7209b7',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    periodText: {
        fontSize: 14,
        color: '#fff',
    },
    sumText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
});

export default DespesaSumario;
