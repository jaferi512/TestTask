import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Favourites = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Favourites</Text>
      <TouchableOpacity onPress={() => navigation.navigate('detail')}>
        <Text>To Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Favourites};

const styles = StyleSheet.create({});
