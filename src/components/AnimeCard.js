import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const AnimeCard = ({navigation, item}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('detail', {
          itemId: item.item.mal_id,
        })
      }
      style={styles.container}>
      <View style={styles.img_container}>
        <Image
          style={styles.img}
          source={{uri: item.item.images?.jpg.image_url}}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.right_container}>
        <View style={styles.general_contain1}>
          <Text numberOfLines={3} style={styles.title_contain}>
            {item.item.title ? item.item.title : 'Not Present'}
          </Text>
          <Text style={styles.rating_contain}>
            {item.item.rating ? item.item.rating : 'Not Present'}
          </Text>
        </View>
        <View style={styles.general_contain2}>
          <Text style={styles.gen_text}>
            {item.item.score ? item.item.score : 'Not Present'}
          </Text>
          <Text style={styles.gen_text}>
            {item.item.year ? item.item.year : 'Not Present'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {AnimeCard};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    minHeight: 120,
    maxHeight: 150,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img_container: {
    width: '30%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: '100%',
    borderRadius: 20,
  },
  right_container: {
    width: '65%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  general_contain1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title_contain: {
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  rating_contain: {
    width: '50%',
    textAlign: 'center',
    color: '#000000',
  },
  general_contain2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gen_text: {
    color: '#000000',
  },
});
