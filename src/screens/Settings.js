/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import DeleteAccountModal from './DeleteAccountModal';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';
import {images} from '../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RangeSlider from 'rn-range-slider';
import AsyncStorage from '@react-native-community/async-storage';
import AppStatusBar from '../components/AppStatusBar';

import APIKit, {clearClientToken} from '../services/api';

import * as Actions from '../store/actions';
export default (props) => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.main.data.setting);
  const userImage = useSelector((state) => state.main.data.profile.imageUrl);
  const profileLocation = useSelector(
    (state) => state.main.data.profile.location,
  );

  const [deleteAccountModal, showDeleteAccount] = useState(false);
  const [curLocation, setCurLocation] = useState('Bristal, UK');

  useEffect(() => {
    const settingLocation = setting.location.find((lo) => lo.selected);
    if (settingLocation) {
      setCurLocation(settingLocation);
    } else {
      setCurLocation(profileLocation);
    }
  }, [setting.location, profileLocation]);

  const logout = (navigate) => {
    if (removeItemValue()) {
      navigate('Signin');
    }
  };
  const onEditGender = () => {
    props.navigation.navigate('EditGender');
  };
  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      clearClientToken();
      return true;
    } catch (exception) {
      return false;
    }
  };
  const deleteAccount = () => {
    APIKit.deleteAccount().then((resp) => {
      const {navigate} = props.navigation;
      logout(navigate);
    });
  };
  const {navigate} = props.navigation;
  return (
    <>
      <AppStatusBar
        backgroundColor={colors.lightgreen}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView style={styles.container}>
        <DeleteAccountModal 
        visible={deleteAccountModal}
        onCancel={() => showDeleteAccount(false)}
        onDelete={deleteAccount}
        />
        <LongHeader
          title={'Settings'}
          dark={true}
          left={colors.lightgreen}
          route={'Messages'}
          navigate={navigate}
          bcolor={colors.gray}
          removeLeft={true}
          removeRightIcon={true}
          rightText={'Done'}
        />
        <ScrollView style={styles.scrollView}>
          <View style={[styles.row, styles.divider_section]}>
            <Text>{''}</Text>
          </View>
          <TouchableOpacity onPress={() => navigate('EditProfile')}>
            <View style={[styles.row, styles.divider]}>
              <Image
                source={{uri: userImage}}
                style={[styles.avatar, {borderRadius: 999}]}
              />
              <Text style={styles.text}>{'Edit My Profile'}</Text>
              <AntDesign name="right" size={25} color={colors.gray} />
            </View>
          </TouchableOpacity>
          <View style={[styles.row, styles.divider_section, styles.noborder]}>
            <Text>{''}</Text>
          </View>
          <View style={[styles.row, styles.divider_section]}>
            <Text style={[styles.label, styles.bold]}>
              {'Discover Settings'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigate('LocationSwitch')}>
            <View style={[styles.row, styles.divider, styles.sub]}>
              <Text style={styles.label}>{'Location'}</Text>
              <Text style={styles.text}>
                {'My Current Location'}
                {'\n'}
                <Text style={styles.subtext}>{curLocation.address}</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.row]}>
            <Text style={styles.label}>{'Maximum Distance'}</Text>
          </View>
          <View style={[styles.row, styles.divider, styles.sub]}>
            <Text
              style={{
                textAlign: 'right',
                position: 'absolute',
                right: 10,
                top: 10,
              }}>
              {setting.distance[1]}
              {' mile'}
            </Text>
            <RangeSlider
              rangeEnabled={false}
              style={{width: '100%', height: 80}}
              gravity={'top'}
              min={0}
              max={60}
              initialLowValue={setting.distance[1]}
              initialHighValue={setting.distance[1]}
              step={1}
              selectionColor={colors.lightgreen}
              blankColor={colors.gray}
              labelBackgroundColor={colors.lightgreen}
              labelBorderColor={colors.lightgreen}
              onValueChanged={(low, high, fromUser) => {
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    distance: [setting.distance[0], low],
                  }),
                );
              }}
            />
          </View>

          <TouchableOpacity onPress={onEditGender}>
            <View style={[styles.row, styles.divider, styles.sub]}>
              <Text style={styles.label}>{'Gender'}</Text>
              <Text style={styles.text}>{'Select'}</Text>
              <AntDesign name="right" size={25} color={colors.gray} />
            </View>
          </TouchableOpacity>
          <View style={[styles.row]}>
            <Text style={styles.label}>{'Age Range'}</Text>
          </View>
          <View style={[styles.row, styles.divider]}>
            <Text
              style={{
                textAlign: 'left',
                position: 'absolute',
                right: 10,
                top: 10,
              }}>
              {setting.age[0]} {'-'} {setting.age[1]}
            </Text>
            <RangeSlider
              style={{width: '100%', height: 80, flex: 3}}
              gravity={'center'}
              min={18}
              max={40}
              initialLowValue={setting.age[0]}
              initialHighValue={setting.age[1]}
              step={1}
              selectionColor={colors.lightgreen}
              blankColor={colors.gray}
              labelBackgroundColor={colors.lightgreen}
              labelBorderColor={colors.lightgreen}
              onValueChanged={(low, high, fromUser) => {
                dispatch(Actions.setSetting({...setting, age: [low, high]}));
              }}
            />
          </View>
          <View style={[styles.row, styles.divider_section]} />
          <View style={[styles.row, styles.divider]}>
            <Text style={styles.label}>{'Be Seen by Friends'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(Actions.setSetting({...setting, seen: val}))
              }
              value={setting.seen}
            />
          </View>
          <View style={[styles.row, styles.divider_section, styles.noborder]}>
            <Text style={{width: '100%', color: colors.gray}}>
              {
                'Turning this on will allow your friends to find you on Armago. Turning this off means friends won’t be able to see you on the app.'
              }
            </Text>
          </View>
          <View style={[styles.row, styles.divider_section]}>
            <Text style={[styles.label, styles.bold]}>{'Notification'}</Text>
          </View>
          <View style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'New Matches'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    notifications: {...setting.notifications, matches: val},
                  }),
                )
              }
              value={setting.notifications.matches}
            />
          </View>
          <View style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'Messages'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    notifications: {...setting.notifications, messages: val},
                  }),
                )
              }
              value={setting.notifications.messages}
            />
          </View>
          <View style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'Training'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    notifications: {...setting.notifications, training: val},
                  }),
                )
              }
              value={setting.notifications.training}
            />
          </View>
          <View style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'Social'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    notifications: {...setting.notifications, socials: val},
                  }),
                )
              }
              value={setting.notifications.socials}
            />
          </View>
          <View style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'In App Vibration'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    notifications: {...setting.notifications, vibrations: val},
                  }),
                )
              }
              value={setting.notifications.vibrations}
            />
          </View>
          <View style={[styles.row, styles.sub]}>
            <Text style={styles.label}>{'In App Sounds'}</Text>
            <Switch
              onValueChange={(val) =>
                dispatch(
                  Actions.setSetting({
                    ...setting,
                    notifications: {...setting.notifications, sounds: val},
                  }),
                )
              }
              value={setting.notifications.sounds}
            />
          </View>
          <View
            style={[
              styles.row,
              styles.divider_section,
              {borderTopWidth: 0.3, borderTopColor: colors.gray},
            ]}>
            <Text style={[styles.label, styles.bold]}>{'Contact Us'}</Text>
          </View>
          <TouchableOpacity
            style={[styles.row, styles.divider]}
            onPress={() => Linking.openURL('http://armago.uk/support')}>
            <Text style={styles.btnText}>{'Help & Support'}</Text>
          </TouchableOpacity>
          <View style={[styles.row, styles.divider_section]} />
          <TouchableOpacity
            style={[styles.row, styles.divider]}
            onPress={() => Linking.openURL('http://armago.uk/rate')}>
            <Text style={styles.btnText}>{'Rate Us'}</Text>
          </TouchableOpacity>
          <View style={[styles.row, styles.divider_section]} />
          <TouchableOpacity
            style={[styles.row, styles.divider]}
            onPress={() => Linking.openURL('http://armago.uk/feedback')}>
            <Text style={styles.btnText}>{'Leave Feedback'}</Text>
          </TouchableOpacity>
          <View style={[styles.row, styles.divider_section]} />
          <View style={[styles.row, styles.divider_section]}>
            <Text style={[styles.label, styles.bold]}>{'Legal'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate('PrivacyPolicy');
            }}
            style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'Privacy Policy'}</Text>
            <AntDesign name="right" size={25} color={colors.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate('Terms');
            }}
            style={[styles.row, styles.divider, styles.sub]}>
            <Text style={styles.label}>{'Terms of Service'}</Text>
            <AntDesign name="right" size={25} color={colors.gray} />
          </TouchableOpacity>
          <View style={[styles.row, styles.sub]}>
            <Text style={styles.label}>{'Licenses'}</Text>
            <AntDesign name="right" size={25} color={colors.gray} />
          </View>
          <View style={[styles.row, styles.divider, {height: 1, padding: 0}]} />
          <TouchableOpacity onPress={() => logout(navigate)}>
            <View style={[styles.row, styles.divider]}>
              <Text style={styles.btnText}>{'Logout'}</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.row, styles.divider, {flexDirection: 'column'}]}>
            <Image source={images.logo} style={styles.bottomLogo} />
            <Text style={{fontSize: 15, color: colors.gray}}>
              {'Version 1.0.0'}
            </Text>
          </View>
          <View style={[styles.row, styles.divider_section]} />
          <TouchableOpacity
            style={[styles.row, styles.divider]}
            onPress={() => showDeleteAccount(true)}>
            <Text style={styles.btnText}>{'Delete Account'}</Text>
          </TouchableOpacity>
          <View style={[styles.row, styles.divider_section]} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // marginTop: -10
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  text: {
    flex: 1,
    color: 'grey',
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'ProximaNova-Regular',
  },
  subtext: {
    flex: 1,
    color: 'grey',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'ProximaNova-Regular',
  },
  btnText: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  label: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'ProximaNova-Regular',
  },
  bold: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.gray,
  },
  divider: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.3,
    bottom: 0,
  },
  divider_section: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.3,
    bottom: 0,
    backgroundColor: '#f8f7f8',
  },
  sub: {
    marginRight: 10,
  },
  noborder: {
    borderBottomWidth: 0,
  },
  bottomLogo: {
    width: '50%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
