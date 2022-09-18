import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getanime, searchByName} from '../Redux/Slices/upcomingSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {EmptyList, AnimeCard} from '../components';
const Upcoming = ({navigation}) => {
  const loading = useSelector(state => state.upcoming.loading);
  const data = useSelector(state => state.upcoming.filteredUsers);
  const page = useSelector(state => state.upcoming.pagination);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    dispatch(searchByName(searchTerm));
  }, [searchTerm]);

  const HandleNext = () => {
    dispatch(
      getanime({page: page.current_page + 1, limit: page.items.per_page}),
    );
  };
  const HandlePrevious = () => {
    dispatch(
      getanime({page: page.current_page - 1, limit: page.items.per_page}),
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(getanime({page: 0, limit: 25}));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.main_contain}>
      <View style={styles.input_contain}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Enter To Search"
        />
      </View>
      {loading ? (
        Array.from({length: 7}, () => Math.floor(Math.random() * 40)).map(
          function (ok, i) {
            return (
              <SkeletonPlaceholder key={i}>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  height={100}
                  width={'95%'}
                  alignSelf={'center'}
                  alignItems="center">
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={60}
                    borderRadius={20}
                  />
                  <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item
                      width={120}
                      height={20}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            );
          },
        )
      ) : (
        <View style={styles.list_contain}>
          <FlatList
            contentContainerStyle={styles.flatlist}
            ListEmptyComponent={() => <EmptyList />}
            //data={data.filter(val => val.airing)}
            ListFooterComponent={() => (
              <View style={styles.pagination_contain}>
                {page?.current_page === 1 ? (
                  <View style={styles.prev_contain2} />
                ) : (
                  <TouchableOpacity
                    onPress={() => HandlePrevious()}
                    style={styles.prev_contain}>
                    <Text>Previous</Text>
                  </TouchableOpacity>
                )}
                <Text style={styles.page}>{page?.current_page}</Text>
                {page?.has_next_page ? (
                  <TouchableOpacity
                    onPress={() => HandleNext()}
                    style={styles.prev_contain}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.prev_contain2} />
                )}
              </View>
            )}
            data={data}
            keyExtractor={item => item.mal_id}
            renderItem={item => (
              <AnimeCard navigation={navigation} item={item} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export {Upcoming};

const styles = StyleSheet.create({
  main_contain: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  input_contain: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
  list_contain: {
    flex: 1,
  },
  flatlist: {
    flexGrow: 1,
  },
  pagination_contain: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    padding: 5,
  },
  prev_contain: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 5,
    padding: 5,
  },
  prev_contain2: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  page: {
    fontWeight: 'bold',
  },
});
