import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Airing,
  Complete,
  Upcoming,
  Favourites,
  ItemDetails,
} from '../activities';
import {createDrawerNavigator} from '@react-navigation/drawer';
// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEdgeWidth: 0,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Favorites" component={Favourites} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="pending" color={color} size={25} />
          ),
        }}
        name="airing"
        component={Airing}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="done-all" color={color} size={25} />
          ),
        }}
        name="complete"
        component={Complete}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="next-plan" color={color} size={25} />
          ),
        }}
        name="upcoming"
        component={Upcoming}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Hom" component={MyDrawer} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="detail" component={ItemDetails} />
      </Stack.Group>
      {/* <Stack.Screen screenOptions={{ presentation: 'modal' }} name="detail" component={ItemDetails} /> */}
    </Stack.Navigator>
  );
}

export {MyStack};
