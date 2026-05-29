import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

function DespesaSumario({despesas, periodo}){
    const somaDespesas = despesas ? despesas.reduce((total, despesa) => {
        if (!despesa || isNaN(Number(despesa.valor))) return total;
        return total + Number(despesa.valor);
    }, 0) : 0;
    
    return(
        <View style={styles.container}>
            <Text style={styles.period}>{periodo}</Text>
            <Text style={styles.sum}>R$ {somaDespesas.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: Colors.primary100,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
    },
    period: {
        fontSize: 12,
        color: Colors.primary700,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary800,
    }
});

export default DespesaSumario;