import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromfav} from '../Redux/Slices/favouriteSlice';
import { EmptyList } from '../components';

const Favourites = ({navigation}) => {
  const data = useSelector(state => state.favourite.data);
  const dispatch = useDispatch();
  const DeleteFromFav = ok => {
    dispatch(removeFromfav(ok.mal_id));
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <FlatList
          //data={data.filter(val => val.airing)}
          data={data}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => <EmptyList />}
          keyExtractor={item => item.mal_id}
          renderItem={item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detail', {
                  itemId: item.item.mal_id,
                })
              }
              style={{
                width: '95%',
                height: 120,
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
              }}>
              <View
                style={{
                  width: '30%',
                  height: 110,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 100, width: '100%', borderRadius: 20}}
                  source={{uri: item.item.images?.jpg.image_url}}
                  resizeMode={'cover'}
                />
              </View>
              <View
                style={{
                  width: '65%',
                  height: 110,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{
                      width: '50%',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item.item.title}
                  </Text>
                  <Text style={{width: '50%', textAlign: 'center'}}>
                    {item.item.rating}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text>{item.item.score}</Text>
                  <Text>{item.item.year ? item.item.year : 'Not Present'}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => DeleteFromFav(item.item)}
                  style={{
                    width: '80%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Remove From Favourites
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export {Favourites};

const styles = StyleSheet.create({});
