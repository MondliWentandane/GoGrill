import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#ff9a03" />
          </View>} 
        persistor={persistor}>
        <Stack>
          <Stack.Screen name='Welcome' options={{headerShown: false, headerStyle: { backgroundColor: "#111111" },}}/>
          <Stack.Screen name='SignIn' options={{title: "Back", headerShown: true, headerStyle: { backgroundColor: "#ff9a03" },headerTintColor: "#ffffff",}}/>
          <Stack.Screen name='SignUp' options={{title: "Back", headerShown: true, headerStyle: { backgroundColor: "#ff9a03" },headerTintColor: "#ffffff",}}/>
          <Stack.Screen name="(dashboard)" options={{title: "Dashboard", headerShown: false, headerTintColor: "#ff9a03",headerStyle: { backgroundColor: "#ffffff" },}}/>
          <Stack.Screen name="(checkout)" options={{title: "Dashboard", headerShown: false, headerTintColor: "#ff9a03",}}/>
        </Stack>
      </PersistGate>
    </Provider>
  );
}