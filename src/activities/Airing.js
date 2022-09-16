import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getanime} from '../Redux/Slices/airingSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Airing = ({navigation}) => {
  const stat = useSelector(state => state.airing);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getanime());
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Airing</Text>
      {stat.loading
        ? ['0', '1', '2', '3', '4'].map(function (ok, i) {
            return (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  height={100}
                  width={'90%'}
                  alignItems="center">
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={60}
                    borderRadius={50}
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
          })
        : null}
      <TouchableOpacity onPress={() => navigation.navigate('detail')}>
        <Text>To Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Airing};

const styles = StyleSheet.create({});
