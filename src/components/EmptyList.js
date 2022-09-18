import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text>Empty List</Text>
    </View>
  );
};

export {EmptyList};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
