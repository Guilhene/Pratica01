import { StyleSheet, View, Text, Pressable } from "react-native";
import DespesaLista from "./DespesaLista";
import DespesaSumario from "./DespesaSumario";
import OptionModal from "./OptionModal";
import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import { DespesasContext } from "../../store/despesas-context";
import { deleteTransaction } from "../../util/http";
import { Colors } from "../../constants/theme";

function DespesaSaida({ despesas, periodo }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();
    const despesasCtx = useContext(DespesasContext);

    function handleLongPress(item) {
        setSelectedItem(item);
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
        setSelectedItem(null);
    }

    function handleEdit() {
        const itemToEdit = selectedItem;
        handleCloseModal();
        router.push({ pathname: '/gerenciar', params: { despesaId: itemToEdit.id } });
    }

    async function handleDelete() {
        const idToDelete = selectedItem.id;
        handleCloseModal();
        try {
            await deleteTransaction(idToDelete);
            despesasCtx.deleteDespesa(idToDelete);
        } catch (error) {
            console.error("Erro ao excluir despesa:", error);
        }
    }

    return (
        <View style={styles.container}>
            <DespesaSumario despesas={despesas} periodo={periodo} />
            <DespesaLista despesas={despesas} onLongPress={handleLongPress} />
            <OptionModal 
                visible={modalVisible} 
                onClose={handleCloseModal} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                itemDescription={selectedItem?.descricao}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary700,
    }
});

export default DespesaSaida;