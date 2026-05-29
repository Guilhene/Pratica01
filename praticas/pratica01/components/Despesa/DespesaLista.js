import { FlatList, StyleSheet } from "react-native";
import DespesaItem from '@/components/Despesa/DespesaItem'

function DespesaLista({ despesas }) {
    return (
        <FlatList 
            data={despesas} 
            renderItem={({ item }) => <DespesaItem item={item}/> }
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20
    }
});

export default DespesaLista;
