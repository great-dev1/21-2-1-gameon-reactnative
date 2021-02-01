/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../common/colors';
import AppStatusBar from '../components/AppStatusBar';
import Geocoder from 'react-native-geocoding';
import APIKit from '../services/api';
import {Input} from 'react-native-elements';

import * as Actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';

export default (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  const profile = useSelector((state) => state.main.data.profile);
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Geocoder.init('AIzaSyAeKw1f7h01OyvWvCfUKsRyTywseFWOWEk');
  }, []);
  const addNewLocation = () => {
    setModalVisible(true);
    setAddress('');
  };
  const onConfirmAdd = () => {
    if (address === '') {
      alert('Please input address');
      return;
    }
    if (setting.location.find((lo) => lo.address === address)) {
      Alert.alert('Already exist');
      return;
    }
    Geocoder.from(address)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log(location);
        APIKit.setSetting({
          ...setting,
          location: [
            ...setting.location.map((lo) => ({...lo, selected: false})),
            {...location, address: address, selected: true},
          ],
        }).then((resp) => {
          // console.log(resp);
          dispatch(Actions.setSetting(resp.data));
          setModalVisible(false);
        });
      })
      .catch((error) => {
        Alert.alert('Please enter a valid address');
      });
  };
  const onSelectLocation = (location, index) => {
    console.log(profile);
    var newLocations = setting.location.map((lo, ind) => ({
      ...lo,
      selected: ind === index,
    }));
    APIKit.setSetting({
      ...setting,
      location: newLocations,
    }).then((newSetting) => {
      console.log(newSetting);
      dispatch(Actions.setSetting(newSetting.data));
    });
  };
  const onCurrentLocation = () => {
    console.log(profile);
    var newLocations = setting.location.map((lo) => ({
      ...lo,
      selected: false,
    }));
    APIKit.setSetting({
      ...setting,
      location: newLocations,
    }).then((newSetting) => {
      console.log(newSetting);
      dispatch(Actions.setSetting(newSetting.data));
    });
  };
  const onCancelAdd = () => {
    setModalVisible(false);
  };
  const render = () => {
    const {navigate} = props.navigation;
    const isCurrentLocation = !setting.location.find((lo) => lo.selected);
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <LongHeader
            title={'Location'}
            color={'white'}
            bcolor={colors.gray}
            left={'green'}
            route={'Settings'}
            navigate={navigate}
            removeRightIcon
            dark
          />
          <View style={[styles.bar]}>
            <Text style={[styles.text2, {fontSize: 18, paddingTop: 6}]}>
              {'Set Location'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.category}
            onPress={() => onCurrentLocation()}>
            <Text style={styles.text2}>{'Current Location'}</Text>
            {isCurrentLocation && (
              <AntDesign name="check" size={20} color={'#007aff'} />
            )}
          </TouchableOpacity>
          {setting.location.map((lo, index) => (
            <TouchableOpacity
              onPress={() => onSelectLocation(lo, index)}
              style={[styles.category, {borderBottomWidth: 0}]}
              key={'location' + index}>
              <Text style={styles.text2}>{lo.address}</Text>
              {lo.selected && (
                <AntDesign name="check" size={20} color={'#007aff'} />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.bar2}
            onPress={addNewLocation}
            disabled={setting.location.length >= 5}>
            <Text
              style={[
                styles.text2,
                {fontSize: 18, paddingTop: 6, color: 'white'},
              ]}>
              {'Add New Location'}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: '#f8f8f8',
              paddingTop: 24,
              paddingHorizontal: 12,
            }}>
            <Text style={styles.text}>
              {
                'Here you can change your location so that you can swipe in a specific area.\n\nPlease note that by changing your location,some cards such as training and event cards speific to you may no longer be seen.\n\nUp to 5 can be saved.'
              }
            </Text>
          </View>
        </SafeAreaView>

        <Modal
          animationType={'slide'}
          visible={modalVisible}
          onRequestClose={() => onCancelAdd()}
          transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Input
                label="Address"
                placeholder="Enter an address"
                style={{width: '100%'}}
                value={address}
                onChangeText={(txt) => setAddress(txt)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <TouchableOpacity
                  style={{...styles.btn, backgroundColor: '#2ECC71'}}
                  onPress={onConfirmAdd}>
                  <Text style={{color: 'white'}}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onCancelAdd}
                  style={{
                    ...styles.btn,
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };
  return render();
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
    width: '90%',
  },
  item: {
    marginTop: 26,
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
  category: {
    flexDirection: 'row',
    // height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
  },
  btn: {
    height: 50,
    width: '40%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
