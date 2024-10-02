import login from './login'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login"  component = {login} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
