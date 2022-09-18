import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyStack} from './MyStack';

const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={MyStack} />
        {/* <Stack.Screen name="complete" component={Complete} />
        <Stack.Screen name="upcoming" component={Upcoming} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {Nav};
