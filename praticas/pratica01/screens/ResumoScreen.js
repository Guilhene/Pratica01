import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { DespesasContext } from "../store/despesas-context";
import { fetchCategories } from "../util/http";
import DespesaSumario from "../components/Despesa/DespesaSumario";
import { Colors } from "../constants/theme";

function ResumoScreen() {
    const despesasCtx = useContext(DespesasContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories || []);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        getCategories();
    }, []);

    const totalPorCategoria = categories.map(cat => {
        const total = despesasCtx.despesas
            ? despesasCtx.despesas
                .filter(d => d && d.categoryId === cat.id)
                .reduce((sum, d) => sum + (d.valor || 0), 0)
            : 0;
        return { ...cat, total };
    }).filter(c => c.total > 0);

    const totalGeral = totalPorCategoria.reduce((sum, c) => sum + c.total, 0);

    return (
        <ScrollView style={styles.container}>
            <DespesaSumario despesas={despesasCtx.despesas} periodo="Resumo Geral" />
            
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Distribuição por Categoria</Text>
                {totalPorCategoria.map(cat => {
                    const percentage = totalGeral > 0 ? (cat.total / totalGeral) * 100 : 0;
                    return (
                        <View key={cat.id} style={styles.categoryRow}>
                            <View style={styles.categoryInfo}>
                                <Text style={styles.categoryName}>{cat.displayName}</Text>
                                <Text style={styles.categoryValue}>R$ {cat.total.toFixed(2)} ({percentage.toFixed(1)}%)</Text>
                            </View>
                            <View style={styles.progressBarBackground}>
                                <View style={[
                                    styles.progressBarFill, 
                                    { width: `${percentage}%`, backgroundColor: cat.background || Colors.primary500 }
                                ]} />
                            </View>
                        </View>
                    );
                })}
                {totalPorCategoria.length === 0 && (
                    <Text style={{ color: 'white', textAlign: 'center' }}>Nenhuma despesa registrada.</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary700,
    },
    chartContainer: {
        padding: 16,
        margin: 16,
        backgroundColor: Colors.primary500,
        borderRadius: 8,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    categoryRow: {
        marginBottom: 12,
    },
    categoryInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    categoryName: {
        color: 'white',
        fontWeight: 'bold',
    },
    categoryValue: {
        color: Colors.primary100,
        fontSize: 12,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: Colors.primary200,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 5,
    }
});

export default ResumoScreen;
