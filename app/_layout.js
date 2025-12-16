import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { TodoProvider } from '../context/TodoContext';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <AuthProvider>
      <TodoProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </TodoProvider>
    </AuthProvider>
  );
}

