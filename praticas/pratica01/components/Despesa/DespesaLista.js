import { FlatList, Text, View } from "react-native";
import DespesaItem from '@/components/Despesa/DespesaItem'
import DespesaRecentes from "@/screens/DespesaRecentes";

function renderDespesaItem(itemData) {
    return (
        <View>
            <Text>{itemData.item.descricao}</Text>
            <Text>R$ {itemData.item.valor}</Text>
        </View>
    )
}

function DespesaLista({ despesas }) {

    return (
        <FlatList data={despesas} renderItem={({ item }) => <DespesaItem item={item}/> }
            keyExtractor={(item) => item.id} />
    )
}



export default DespesaLista;