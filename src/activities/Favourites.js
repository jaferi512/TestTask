import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromfav} from '../Redux/Slices/favouriteSlice';
import {EmptyList, FavouriteCard} from '../components';

const Favourites = ({navigation}) => {
  const data = useSelector(state => state.favourite.data);
  const dispatch = useDispatch();
  const DeleteFromFav = ok => {
    dispatch(removeFromfav(ok.mal_id));
  };
  return (
    <View style={styles.contain}>
      <View style={styles.list_contain}>
        <FlatList
          //data={data.filter(val => val.airing)}
          data={data}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={() => <EmptyList />}
          keyExtractor={item => item.mal_id}
          renderItem={item => (
            <FavouriteCard
              navigation={navigation}
              item={item}
              onpress={() => DeleteFromFav(item.item)}
            />
          )}
        />
      </View>
    </View>
  );
};

export {Favourites};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: 'center',
  },
  list_contain: {
    flex: 1,
  },
  flatlist: {
    flexGrow: 1,
  },
});
