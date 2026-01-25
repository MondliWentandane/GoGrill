import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='Checkout' options={{title:"Checkout", }}/>
    </Stack>
  )
}

export default _layout