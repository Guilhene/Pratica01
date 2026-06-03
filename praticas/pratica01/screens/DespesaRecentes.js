import { useContext, useEffect, useState } from 'react';
import DespesaSaida from "@/components/Despesa/DespesaSaida";
import { DespesasContext } from '@/store/despesas-context';
import { fetchTransactions } from '@/util/http';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

function DespesaRecentes() {
    const despesasCtx = useContext(DespesasContext);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        async function getDespesas() {
            setIsFetching(true);
            try {
                const transactions = await fetchTransactions();
                // O backend retorna datas como string ISO, o context espera objetos Date?
                // Vamos converter para garantir consistência se necessário.
                const loadedTransactions = transactions.map(t => ({
                    ...t,
                    data: new Date(t.date),
                    descricao: t.description,
                    valor: t.value
                }));
                despesasCtx.setDespesas(loadedTransactions);
            } catch (error) {
                console.log(error);
            }
            setIsFetching(false);
        }

        getDespesas();
    }, []);

    function filtrarUltimos7Dias(despesas) {
        const hoje = new Date();
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(hoje.getDate() - 7);

        return despesas.filter(despesa => {
            const dataDespesa = new Date(despesa.data);
            return dataDespesa >= seteDiasAtras && dataDespesa <= hoje;
        });
    }

    if (isFetching) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const recentesDespesas = filtrarUltimos7Dias(despesasCtx.despesas);

    return (
        <DespesaSaida despesas={recentesDespesas} periodo={'Últimos 7 dias'} />
    );
}

export default DespesaRecentes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
