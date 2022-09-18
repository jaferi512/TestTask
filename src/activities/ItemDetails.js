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
    <View style={styles.main_contain}>
      <View style={styles.top_contain}>
        <Image
          style={styles.img}
          resizeMode={'contain'}
          source={{uri: details && details.images?.jpg.image_url}}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_contain}>
          <Icon name="arrow-back" size={25} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addTo(details)}
          style={styles.heart_contain}>
          {data.some(e => e.mal_id === details.mal_id) ? (
            <Icon2 name="heart-fill" size={25} color={'red'} />
          ) : (
            <Icon2 name="heart" size={25} color={'red'} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottom_contain}>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Name:</Text>
          <Text style={styles.right_txt}>
            {details.title ? details.title : 'Not Present'}
          </Text>
        </View>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Rating:</Text>
          <Text style={styles.right_txt}>
            {details.rating ? details.rating : 'Not Present'}
          </Text>
        </View>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Score:</Text>
          <Text style={styles.right_txt}>
            {details.score ? details.score : 'Not Present'}
          </Text>
        </View>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Season:</Text>
          <Text style={styles.right_txt}>
            {details.season ? details.season : 'Not Present'}
          </Text>
        </View>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Episodes:</Text>
          <Text style={styles.right_txt}>
            {details.episodes ? details.episodes : 'Not Present'}
          </Text>
        </View>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Duration:</Text>
          <Text style={styles.right_txt}>{details.duration}</Text>
        </View>
        <View style={styles.gen_contain}>
          <Text style={styles.left_txt}>Year:</Text>
          <Text style={styles.right_txt}>
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
  },
  main_contain: {
    flex: 1,
    alignItems: 'center',
  },
  top_contain: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  img: {
    height: 280,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  back_contain: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart_contain: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_contain: {
    width: '95%',
    alignItems: 'center',
  },
  gen_contain: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
  },
  left_txt: {
    width: '30%',
    textAlign: 'center',
  },
  right_txt: {
    width: '60%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
