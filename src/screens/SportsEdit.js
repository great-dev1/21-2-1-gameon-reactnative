/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {colors} from '../common/colors';
import {images} from '../common/images';
import {LongHeader} from '../components/longHeader';
import {RFValue} from 'react-native-responsive-fontsize';
import AppStatusBar from '../components/AppStatusBar';

import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';

import APIKit from '../services/api';

export default (props) => {
  const dispatch = useDispatch();
  const [selectedSports, setSelectedSports] = useState([]);
  const [sports, setSports] = useState([]);
  const setting = useSelector((state) => state.main.data.setting);

  const seleted_item = (prop) => {
    const found = selectedSports.filter((item) => item.id === prop.id);
    if (found.length > 0) {
      return (
        <Image source={images.sport_selected} style={styles.sport_selected} />
      );
    } else {
      return null;
    }
  };
  useEffect(() => {
    APIKit.getsports().then(
      (response) => {
        console.log('getting sports list');
        const allSports = response.data;
        setSports(allSports);
        //get user sports profile
        APIKit.getsportsprofile().then(
          (resp) => {
            if (typeof resp !== 'undefined') {
              setSelectedSports(resp.data);
            }
            console.log(resp.data);
          },
          (error) => {
            console.log(error);
          },
        );
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  const onSave = () => {
    const {navigate} = props.navigation;
    if (!selectedSports.length) {
      Alert.alert('select at least one');
    } else {
      navigate('EditProfile');
    }
    console.log(selectedSports);
    if (selectedSports.length === 0) {
      Alert.alert('select at least one');
    } else {
      //patch sports profile
      const sports_payload = [];
      selectedSports.forEach((element) => {
        sports_payload.push(element.id);
      });
      const payload = {sports: sports_payload};
      APIKit.setsports(payload).then(
        (response) => {
          console.log(response);

          const genders = setting.gender;
          setting.gender = sports_payload.map((sport) => {
            const gender = genders.find((gen) => gen.sport === sport);
            return {
              sport,
              value: gender ? gender.value : 'both',
            };
          });

          dispatch(Actions.setSetting(setting));

          APIKit.setSetting(setting).then((resp1) => {
            console.log(resp1);
            navigate('EditProfile');
          });
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };
  const render = () => {
    const {navigate} = props.navigation;
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <LongHeader
            title={'Sports'}
            color={colors.lightgreen}
            bcolor={colors.lightgreen}
            route={'EditProfile'}
            navigate={navigate}
            removeRightIcon
          />
          <View style={styles.main}>
            <View style={styles.sectionTop}>
              <Text style={styles.tlabel}>{'Choose which sports '}</Text>
              <Text style={styles.tlabel}>{'you’d like to play'}</Text>
              <Text style={styles.tlabel}>{'_'}</Text>
              <Text style={styles.sublabel}>
                {'We’ll be adding more sports soon'}
              </Text>
            </View>
            <View style={styles.sectionMiddle}>
              {/* <View style={styles.middleSection}> */}
              {sports.map((prop, key) => {
                if (prop.enable) {
                  prop.id = prop._id;
                  return (
                    <TouchableOpacity
                      key={prop._id}
                      onPress={() => {
                        var arr = [...selectedSports];
                        const found = arr.filter((item) => item.id === prop.id);
                        if (found.length > 0) {
                          arr = arr.filter((item) => item.id !== prop.id);
                        } else {
                          arr.push(prop);
                        }
                        console.log(arr);
                        setSelectedSports(arr);
                      }}>
                      <View style={styles.item}>
                        <View>
                          {seleted_item(prop)}
                          <Image
                            source={{uri: prop.imageUrl}}
                            style={{
                              width: 100,
                              height: 100,
                              resizeMode: 'contain',
                              borderRadius: 50,
                            }}
                          />
                          <Text style={styles.sports_label}>{prop.name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <View style={styles.item} key={prop._id}>
                      <View>
                        <Image
                          source={{uri: prop.imageUrl}}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'contain',
                            borderRadius: 50,
                          }}
                        />
                        <Text style={styles.sports_label}>{prop.name}</Text>
                      </View>
                      <Image
                        source={images.sport_comiong_soon}
                        style={{position: 'absolute', top: 0}}
                      />
                    </View>
                  );
                }
              })}

              {/* </View> */}
            </View>
            <View style={styles.sectionBottom}>
              <View style={{width: '100%', borderRadius: 20}}>
                <TouchableOpacity style={styles.circle} onPress={onSave}>
                  <Text style={{color: '#fff', fontSize: 18}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  };
  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
  },
  sectionTop: {
    flex: 1.2,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 3,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  middleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coming_label: {
    position: 'absolute',
  },
  sports_label: {
    fontSize: RFValue(12, 580),
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
  },
  sport_selected: {
    position: 'absolute',
    top: -13,
    left: -13,
  },
  sectionBottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    flex: 3,
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    flex: 1,
    color: 'grey',
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  sublabel: {
    // flex: 1,
    color: 'grey',
    fontSize: RFValue(12, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  input: {
    width: '100%',
  },
  navBtn_prev: {
    width: 80,
    height: 80,
    backgroundColor: colors.red,
    borderRadius: 50,
  },
  navBtn_next: {
    width: 80,
    height: 80,
    backgroundColor: colors.lightgreen,
    borderRadius: 50,
  },
  circle: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
});
