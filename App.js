import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { UserAuthContextProvider} from './context/AuthContext';
import Index from './Index';

export default function App() {
  return (
    <UserAuthContextProvider>
      <NavigationContainer>
      <Index></Index>
      </NavigationContainer>
    </UserAuthContextProvider>
  );
}

