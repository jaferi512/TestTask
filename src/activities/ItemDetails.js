import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getanimeDetails} from '../Redux/Slices/airingSlice';
import {addTofav, removeFromfav} from '../Redux/Slices/favouriteSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
const ItemDetails = ({route, navigation}) => {
  const {itemId} = route.params;
  const dispatch = useDispatch();
  const details = useSelector(state => state.airing.details);
  const loading = useSelector(state => state.airing.loading);
  const data = useSelector(state => state.favourite.data);
  console.log(JSON.stringify(details));

  const addTo = ok => {
    if (data.some(e => e.mal_id === details.mal_id)) {
      dispatch(removeFromfav(ok.mal_id));
    } else {
      dispatch(addTofav(ok));
    }
  };
  useEffect(() => {
    dispatch(getanimeDetails(itemId));
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{width: '100%', height: 300, overflow: 'hidden'}}>
        <Image
          style={{
            height: 280,
            width: '100%',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
          resizeMode={'contain'}
          source={{uri: details && details.images?.jpg.image_url}}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'white',
            height:40,
            width:40,
            borderRadius: 40 /2,
            justifyContent:'center',
            alignItems:'center'
          }}>
          {/* <Text style={{fontSize:20, fontWeight:'bold'}}>x</Text> */}
          <Icon name='arrow-back' size={25} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addTo(details)}
          style={{
            position: 'absolute',
            bottom: 40,
            right: 20,
            backgroundColor: 'white',
            height: 50,
            width: 50,
            borderRadius: 50 /2,
            justifyContent:'center',
            alignItems:'center'
          }}>
            {data.some(e => e.mal_id === details.mal_id) ? (
              <Icon2 name='heart-fill' size={25} color={'red'} />
            ) : (
              <Icon2 name='heart' size={25} color={'red'} />
            )}
          {/* <Image style={{height:35,width:35}} source={require('../assets/heart.png')} /> */}
        </TouchableOpacity>
      </View>
      <View style={{width: '95%', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Name:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.title}
          </Text>
        </View>
      </View>
      <View style={{width: '95%', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Rating:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.rating}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Score:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.score}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Season:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.season}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Episodes:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.episodes ? details.episodes : 'Not Present'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Duration:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.duration}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
          }}>
          <Text style={{width: '30%', textAlign: 'center'}}>Year:</Text>
          <Text
            style={{
              width: '60%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {details.year ? details.year : 'Not Present'}
          </Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          color={'red'}
          size={'large'}
          style={styles.loading}
        />
      ) : null}
    </View>
  );
};

export {ItemDetails};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  }
});
