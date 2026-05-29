import { createContext, useReducer } from 'react';

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: ({ descricao, valor, data, categoryId }) => {},
  setDespesas: (despesas) => {},
  deleteDespesa: (id) => {},
  updateDespesa: (id, { descricao, valor, data, categoryId }) => {},
});

function despesasReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableDespesaIndex = state.findIndex(
        (despesa) => despesa.id === action.payload.id
      );
      const updatableDespesa = state[updatableDespesaIndex];
      const updatedItem = { ...updatableDespesa, ...action.payload.data };
      const updatedDespesas = [...state];
      updatedDespesas[updatableDespesaIndex] = updatedItem;
      return updatedDespesas;
    case 'DELETE':
      return state.filter((despesa) => despesa.id !== action.payload);
    default:
      return state;
  }
}

function DespesasContextProvider({ children }) {
  const [despesasState, dispatch] = useReducer(despesasReducer, []);

  function addDespesa(despesaData) {
    dispatch({ type: 'ADD', payload: despesaData });
  }

  function setDespesas(despesas) {
    dispatch({ type: 'SET', payload: despesas });
  }

  function deleteDespesa(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateDespesa(id, despesaData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: despesaData } });
  }

  const value = {
    despesas: despesasState,
    addDespesa: addDespesa,
    setDespesas: setDespesas,
    deleteDespesa: deleteDespesa,
    updateDespesa: updateDespesa,
  };

  return (
    <DespesasContext.Provider value={value}>
      {children}
    </DespesasContext.Provider>
  );
}

export default DespesasContextProvider;
