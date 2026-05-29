import { useContext, useEffect, useState } from 'react';
import DespesaSaida from '../components/Despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { fetchTransactions } from '../util/http';

function DespesaRecentes() {
    const despesasCtx = useContext(DespesasContext);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        async function getDespesas() {
            setIsFetching(true);
            try {
                const transactions = await fetchTransactions();
                const mappedTransactions = (transactions || [])
                    .filter(t => t !== null && t !== undefined)
                    .map(t => ({
                        id: t.id,
                        descricao: t.description,
                        valor: +t.value, // Força conversão para número
                        data: new Date(t.date),
                        categoryId: t.categoryId
                    }));
                despesasCtx.setDespesas(mappedTransactions);
            } catch (error) {
                console.error("Erro ao buscar despesas:", error);
            }
            setIsFetching(false);
        }

        getDespesas();
    }, []);

}

export default DespesaRecentes;