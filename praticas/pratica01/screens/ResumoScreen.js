import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { DespesasContext } from '@/store/despesas-context';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function ResumoScreen() {
  const despesasCtx = useContext(DespesasContext);
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'MONTH', 'YEAR'
  
  const hoje = new Date();
  const [selectedMonth, setSelectedMonth] = useState(hoje.getMonth());
  const anoAtual = hoje.getFullYear();

  const despesasFiltradas = despesasCtx.despesas.filter(despesa => {
    const dataDespesa = new Date(despesa.data);
    if (filterMode === 'MONTH') {
      return dataDespesa.getMonth() === selectedMonth && dataDespesa.getFullYear() === anoAtual;
    } else if (filterMode === 'YEAR') {
      return dataDespesa.getFullYear() === anoAtual;
    }
    return true;
  });

  const despesasPorCategoria = despesasFiltradas.reduce((acc, despesa) => {
    const categoryName = despesa.category?.displayName || 'Outros';
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += despesa.valor;
    return acc;
  }, {});

  const data = Object.keys(despesasPorCategoria).map((category, index) => ({
    name: category,
    population: despesasPorCategoria[category],
    color: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0', '#ffb703', '#fb8500'][index % 7],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const total = despesasFiltradas.reduce((acc, despesa) => acc + despesa.valor, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filterContainer}>
        <Pressable 
          style={[styles.filterButton, filterMode === 'ALL' && styles.activeFilter]} 
          onPress={() => setFilterMode('ALL')}
        >
          <Text style={[styles.filterText, filterMode === 'ALL' && styles.activeFilterText]}>Tudo</Text>
        </Pressable>
        <Pressable 
          style={[styles.filterButton, filterMode === 'MONTH' && styles.activeFilter]} 
          onPress={() => setFilterMode('MONTH')}
        >
          <Text style={[styles.filterText, filterMode === 'MONTH' && styles.activeFilterText]}>Mês</Text>
        </Pressable>
        <Pressable 
          style={[styles.filterButton, filterMode === 'YEAR' && styles.activeFilter]} 
          onPress={() => setFilterMode('YEAR')}
        >
          <Text style={[styles.filterText, filterMode === 'YEAR' && styles.activeFilterText]}>Ano</Text>
        </Pressable>
      </View>

      {filterMode === 'MONTH' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthSelector}>
          {MONTHS.map((month, index) => (
            <Pressable 
              key={month} 
              style={[styles.monthItem, selectedMonth === index && styles.selectedMonthItem]}
              onPress={() => setSelectedMonth(index)}
            >
              <Text style={[styles.monthText, selectedMonth === index && styles.selectedMonthText]}>
                {month}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <Text style={styles.periodText}>
        {filterMode === 'ALL' && 'Todas as despesas'}
        {filterMode === 'MONTH' && `Despesas de ${MONTHS[selectedMonth]} / ${anoAtual}`}
        {filterMode === 'YEAR' && `Despesas de ${anoAtual}`}
      </Text>

      <View style={styles.card}>
        <Text style={styles.title}>Distribuição por Categoria</Text>
        {data.length > 0 ? (
          <PieChart
            data={data}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma despesa neste período.</Text>
          </View>
        )}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total no Período</Text>
        <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

export default ResumoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#7209b7',
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: '#fff',
  },
  monthSelector: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingVertical: 5
  },
  monthItem: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7209b7',
  },
  selectedMonthItem: {
    backgroundColor: '#7209b7',
  },
  monthText: {
    color: '#7209b7',
    fontSize: 12,
    fontWeight: 'bold'
  },
  selectedMonthText: {
    color: '#fff',
  },
  periodText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  totalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 30
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7209b7',
  },
  emptyContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
  },
});
