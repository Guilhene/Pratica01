import DespesaRecentes from '@/screens/DespesaRecentes';
import GerenciarDespensa from '@/screens/GerenciarDespesa';
import TodasDespesas from '@/screens/TodasDespesas';
import IconButton from '@/screens/IconButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree, useNavigationBuilder } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {

  const Tab = createBottomTabNavigator();

  function BottonTabScreen() {
    const navigation = useNavigationBuilder;

    return (
      <Tab.Navigator 
        /*screenOptions={{headerRight: () => <IconButton
          icon='add' size={24} onPress={() => { 
            
           } } color={undefined}/>
        }}*/
        screenOptions={({navigation} ) => ({ headerRight: () => <IconButton
          icon='add' size={24} onPress={() => {navigation.navigate('GerenciarDespesa')}}/>
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
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
