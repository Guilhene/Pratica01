import DespesaRecentes from '@/screens/DespesaRecentes';
import GerenciarDespensa from '@/screens/GerenciarDespesa';
import TodasDespesas from '@/screens/TodasDespesas';
import ResumoScreen from '@/screens/ResumoScreen';
import IconButton from '@/screens/IconButton'
import LoginScreen from '@/screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { AuthProvider, useAuth } from '@/store/auth-context';
import DespesasContextProvider from '@/store/despesas-context';

function Navigation() {
  const { user } = useAuth();

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottonTabScreen() {
    return (
      <Tab.Navigator 
        screenOptions={({navigation} ) => ({ 
          headerRight: () => <IconButton
            icon='add' size={24} onPress={() => {navigation.navigate('GerenciarDespesa')}}/>,
          headerTitle: () => (
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Gestão Financeira</Text>
              {user && <Text style={{fontSize: 12}}>Bem-vindo, {user.name}!</Text>}
            </View>
          )
        })}
        >
        <Tab.Screen 
          name='DespesaRecentes' component={DespesaRecentes} 
          options={{tabBarIcon: ({color, size}) => (
            <Ionicons name='hourglass' size={size} color={color} />),
            tabBarLabel: 'Recentes',
            title: 'Despesas Recentes',
            tabBarLabelStyle: { fontSize: 12 }
          }}
        ></Tab.Screen>
        <Tab.Screen 
        name='TodasDespesas' component={TodasDespesas}
        options={{tabBarIcon: ({color, size}) => (
          <Ionicons name='wallet-outline' size={size} color={color} />),
          tabBarLabel: 'Todas',
          title: 'Todas as Despesas',
          tabBarLabelStyle: {fontSize: 12}
        }}
        ></Tab.Screen>
        <Tab.Screen 
        name='Resumo' component={ResumoScreen}
        options={{tabBarIcon: ({color, size}) => (
          <Ionicons name='pie-chart-outline' size={size} color={color} />),
          tabBarLabel: 'Resumo',
          title: 'Resumo',
          tabBarLabelStyle: {fontSize: 12}
        }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Despesas' component={BottonTabScreen} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name='GerenciarDespesa' component={GerenciarDespensa}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default function HomeScreen() {
  return (
    <AuthProvider>
      <DespesasContextProvider>
        <Navigation />
      </DespesasContextProvider>
    </AuthProvider>
  );
}

