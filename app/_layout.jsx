import { AuthProvider } from '@/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from './login'
import Admin from './admin'
import Customer from './customer'


const Stack = createNativeStackNavigator()

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={login}/>
          <Stack.Screen name="Admin" component={Admin}/>
          <Stack.Screen name="Customer" component={Customer}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
