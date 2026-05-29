import { Stack } from 'expo-router';
import AuthContextProvider from '../store/auth-context';
import DespesasContextProvider from '../store/despesas-context';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <DespesasContextProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
          }}
        >
          {/* O (tabs) é o grupo de abas principais */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Telas que abrem por cima (modais ou pilhas) */}
          <Stack.Screen name="gerenciar" options={{ title: 'Gerenciar Despesa' }} />
          <Stack.Screen name="categoria" options={{ title: 'Nova Categoria' }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </DespesasContextProvider>
    </AuthContextProvider>
  );
}
