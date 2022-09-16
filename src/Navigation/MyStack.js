import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Airing,
  Complete,
  Upcoming,
  Favourites,
  ItemDetails,
} from '../activities';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEdgeWidth: 0,
      }}>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Favourites" component={Favourites} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="airing" component={Airing} />
      <Tab.Screen name="complete" component={Complete} />
      <Tab.Screen name="upcoming" component={Upcoming} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Hom" component={MyDrawer} />
      <Stack.Screen name="detail" component={ItemDetails} />
    </Stack.Navigator>
  );
}

export {MyStack};