import { FlatList } from "react-native";
import DespesaItem from './DespesaItem';

function DespesaLista({ despesas, onLongPress }) {

    return (
        <FlatList 
            data={despesas} 
            renderItem={({ item }) => {
                if (!item) return null;
                return <DespesaItem item={item} onLongPress={onLongPress}/>;
            }}
            keyExtractor={(item) => item?.id || Math.random().toString()} 
        />
    )
}

export default DespesaLista;