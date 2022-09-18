import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getanime} from '../Redux/Slices/completeSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {searchByName} from '../Redux/Slices/completeSlice';
import { EmptyList, AnimeCard } from '../components';
const Complete = ({navigation}) => {
  const loading = useSelector(state => state.complete.loading);
  const data = useSelector(state => state.complete.filteredUsers);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const page = useSelector(state => state.complete.pagination);
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#D3D3D3',
      }}>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 5,
          alignSelf: 'center',
          borderRadius: 10,
        }}>
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
        <View style={{flex: 1}}>
          <FlatList
            //data={data.filter(val => val.airing)}
            data={data}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={() => <EmptyList />}
            ListFooterComponent={() => (
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 8,
                  padding: 5,
                }}>
                {page?.current_page === 1 ? (
                  <View
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      padding: 5,
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => HandlePrevious()}
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'lightgreen',
                      borderRadius: 5,
                      padding: 5,
                    }}>
                    <Text>Previous</Text>
                  </TouchableOpacity>
                )}
                <Text style={{fontWeight: 'bold'}}>{page?.current_page}</Text>
                {page?.has_next_page ? (
                  <TouchableOpacity
                    onPress={() => HandleNext()}
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'lightgreen',
                      borderRadius: 5,
                      padding: 5,
                    }}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      padding: 5,
                    }}
                  />
                )}
              </View>
            )}
            //keyExtractor={item => item.mal_id}
            renderItem={item => (
              <AnimeCard navigation={navigation} item={item} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export {Complete};

const styles = StyleSheet.create({});
