import axios from 'axios';

const BACKEND_URL = 'http://192.168.0.93:3000';

export async function storeTransaction(transactionData) {
  const response = await axios.post(BACKEND_URL + '/transactions', transactionData);
  return response.data;
}

export async function fetchTransactions() {
  const response = await axios.get(BACKEND_URL + '/transactions');
  return response.data;
}

export async function updateTransaction(id, transactionData) {
  const response = await axios.put(`${BACKEND_URL}/transactions/${id}`, transactionData);
  return response.data;
}

export async function deleteTransaction(id) {
  return axios.delete(`${BACKEND_URL}/transactions/${id}`);
}

export async function fetchCategories() {
  const response = await axios.get(BACKEND_URL + '/categories');
  return response.data;
}

export async function storeCategory(categoryData) {
  const response = await axios.post(BACKEND_URL + '/categories', categoryData);
  return response.data;
}
