import { Stack } from 'expo-router';

export default function RootLayout(){
  return(
    <Stack>
      <Stack.Screen name='Welcome' options={{headerShown:false, headerStyle:{backgroundColor:"#111111"},
             }}/>
      <Stack.Screen name='SignIn' options={{title:"Back", headerShown:true, headerStyle:{backgroundColor:"#ff9a03"}}}/>
      <Stack.Screen name='SignUp' options={{title:"Back", headerShown:true, headerStyle:{backgroundColor:"#ff9a03"}}}/>
      <Stack.Screen name="(dashboard)" options={{title:"Dashboard", headerShown: true, headerTintColor:"#ff9a03",}}/>
      <Stack.Screen name="(checkout)" options={{title:"Dashboard", headerShown: false, headerTintColor:"#ff9a03",}}/>
    </Stack>
  )
}