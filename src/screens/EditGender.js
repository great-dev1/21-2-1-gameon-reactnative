/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {images} from '../common/images';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';
import AppStatusBar from '../components/AppStatusBar';
import {colors} from '../common/colors';

export default (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  const sports = useSelector((state) => state.main.data.sports);
  const seleted_item = () => {
    return (
      <Image source={images.genderSelected} style={styles.genderSelected} />
    );
  };
  const dispatch = useDispatch();
  const selected = (ge, index) => {
    let newGenders = setting.gender;
    newGenders[index].value = ge;
    dispatch(Actions.setSetting({...setting, gender: newGenders}));
  };
  const {navigate} = props.navigation;
  return (
    <>
      <AppStatusBar
        backgroundColor={colors.lightgreen}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView style={styles.container}>
        <LongHeader
          title={'Gender'}
          color={'white'}
          left={'green'}
          route={'Settings'}
          navigate={navigate}
          removeRightIcon
          dark
        />
        <View
          style={{
            backgroundColor: '#f8f8f8',
            paddingTop: 24,
            paddingHorizontal: 12,
          }}>
          <Text style={styles.text}>
            {
              'Setting a gender preference means that you will only be shown matches with the specified gender, however training and social events might still be mixed.'
            }
          </Text>
        </View>
        {setting.gender.map((gen, index) => {
          const sport = sports.find((sp) => sp._id === gen.sport);
          return (
            sport && (
              <View style={styles.gender} key={'gender' + index}>
                <View style={styles.lgender}>
                  <Image source={{uri: sport.imageUrl}} style={styles.racket} />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 17,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    {sport.name}
                  </Text>
                </View>
                <View style={styles.rgender}>
                  <View style={styles.item}>
                    <View>
                      <TouchableOpacity onPress={() => selected('male', index)}>
                        <Image source={images.genderM} style={styles.gRacket} />
                      </TouchableOpacity>

                      {gen.value === 'male' && seleted_item()}
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <TouchableOpacity
                        onPress={() => selected('female', index)}>
                        <Image source={images.genderW} style={styles.gRacket} />
                      </TouchableOpacity>
                      {gen.value === 'female' && seleted_item()}
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <TouchableOpacity onPress={() => selected('both', index)}>
                        <Image source={images.genderB} style={styles.gRacket} />
                      </TouchableOpacity>
                      {gen.value === 'both' && seleted_item()}
                    </View>
                  </View>
                </View>
              </View>
            )
          );
        })}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {},
  text: {
    color: 'grey',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular',
  },
  text2: {
    color: 'grey',
    fontSize: 21,
    fontFamily: 'ProximaNova-Regular',
  },
  item: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor: '#f8f8f8',
    height: 46,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  bar2: {
    backgroundColor: '#2ecc71',
    height: 48,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  gender: {
    flexDirection: 'row',
    padding: 10,
  },
  lgender: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rgender: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  racket: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  gRacket: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  genderSelected: {
    position: 'absolute',
    top: -10,
    left: 0,
    zIndex: -1,
  },
});
