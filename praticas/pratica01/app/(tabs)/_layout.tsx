import { Tabs, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import IconButton from '../../screens/IconButton';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/auth-context';

export default function TabsLayout() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  // Redireciona para Auth se não houver usuário
  useEffect(() => {
    if (!authCtx.userName) {
      router.replace('/auth');
    }
  }, [authCtx.userName]);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: Colors.accent500,
        tabBarInactiveTintColor: Colors.primary100,
        headerLeft: () => (
          <IconButton
            icon="exit-outline"
            size={24}
            color="white"
            onPress={() => authCtx.logout()}
          />
        ),
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            color="white"
            onPress={() => router.push('/gerenciar')}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `Olá, ${authCtx.userName || 'Usuário'}`,
          tabBarLabel: 'Movimentações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resumo"
        options={{
          title: 'Resumo Mensal',
          tabBarLabel: 'Resumo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
