import { View, StyleSheet, Text } from "react-native";
import DespesaLista from "@/components/Despesa/DespesaLista";
import DespesaSumario from "./DespesaSumario";

function DespesaSaida({ despesas, periodo }) {
    let content = <Text style={styles.infoText}>Nenhuma despesa encontrada.</Text>;

    if (despesas.length > 0) {
        content = <DespesaLista despesas={despesas}/>;
    }

    return (
        <View style={styles.container}>
            <DespesaSumario despesas={despesas} periodo={periodo} />
            {content}
        </View>
    )
}

export default DespesaSaida;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 0,
        backgroundColor: '#f5f5f5'
    },
    infoText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});
