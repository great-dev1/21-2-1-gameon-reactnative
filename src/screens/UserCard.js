/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlipCard from 'react-native-flip-card';
import {colors} from '../common/colors';
import {images} from '../common/images';
export const {width, height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Input} from 'react-native-elements';

import {useSelector} from 'react-redux';
// import * as Actions from '../store/actions';

import {Dropdown} from 'react-native-material-dropdown';

import APIKit from '../services/api';

function DateView(props) {
  console.log(props);
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor: props.value[0] ? colors.green : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor: props.value[1] ? colors.green : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor: props.value[2] ? colors.green : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  );
}

const fullWeekDays = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednsday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};
const reasons = [
  {
    value: 'Inappropriate profile picture',
  },
  {
    value: 'Harassment',
  },
  {
    value: 'Impersonation',
  },
  {
    value: 'Discrimination',
  },
  {
    value: 'Other',
  },
];

export default (props) => {
  const [availability, setAvailability] = useState([]);
  const [universitieName, setUniversitieName] = useState('');
  const [reason, setReason] = useState('');
  const [reasonTxt, setReasonTxt] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const myAvaliablity = useSelector(
    (state) => state.main.data.profile.availability,
  );
  // const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    weekdays = weekdays.concat(weekdays.slice(0, today.getDay()));
    weekdays = weekdays.slice(today.getDay(), weekdays.length);
    let availableDays = weekdays.filter(
      (w) =>
        (props.user.availability[w].includes(true) ||
          props.user.availability[w].includes('true') ||
          props.user.availability[w].includes('1') ||
          props.user.availability[w].includes(1)) &&
        myAvaliablity &&
        (myAvaliablity[w].includes(true) ||
          myAvaliablity[w].includes(1) ||
          myAvaliablity[w].includes('1') ||
          myAvaliablity[w].includes('true')),
    );
    console.log('availableDays', availableDays);
    setAvailability(availableDays);
  }, [myAvaliablity, props.user.availability]);
  useEffect(() => {
    console.log('userCard', props.universities);
    const university = props.universities.find(
      (uni) => uni._id === props.user.bio.university,
    );
    if (university) {
      setUniversitieName(university.name);
    }
  }, [props.universities, props.user.bio.university]);
  const _toCapital = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  };

  const reportUser = () => {
    setReason('');
    setReasonTxt('');
    setReportModalVisible(true);
    console.log('modal:true');
  };

  const confirmReportUesr = () => {
    APIKit.reportUser({user: props.user.id, reason}).then((resp) => {
      console.log('report user', resp.data);
      setReportModalVisible(false);
      props.handleReportUser();
    });
  };

  const _reportModal = () => {
    return (
      <Modal
        animationType={'slide'}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
        transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 6,
                  textAlign: 'center',
                  width: '100%',
                }}>
                Report User
              </Text>
              <View style={{width: '90%'}}>
                <Dropdown
                  label={'Please select a reason type.'}
                  data={reasons}
                  onChangeText={(txt) => {
                    setReason(txt);
                    console.log(txt);
                  }}
                />
              </View>
              <Input
                label="Reason Detail"
                placeholder="Enter the reason"
                style={{width: '100%', margin: 0, padding: 0}}
                value={reasonTxt}
                onChangeText={(value) => setReasonTxt(value)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <TouchableOpacity
                disabled={reason === ''}
                style={{...styles.btn, backgroundColor: '#2ECC71'}}
                onPress={() => {
                  confirmReportUesr();
                }}>
                <Text style={{color: 'white'}}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setReportModalVisible(false);
                }}
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
    );
  };
  return (
    <>
      <View style={styles.container}>
        <FlipCard
          friction={15}
          flipHorizontal={true}
          flipVertical={false}
          clickable={true}
          useNativeDriver={false}>
          {/* Face Side */}
          <View style={styles.main}>
            {props.user.mFriends.length !== 0 && (
              <Image source={images.group} style={styles.groupImg} />
            )}

            <View style={{flex: 1, padding: 15}}>
              <Image source={{uri: props.user.imageUrl}} style={styles.img} />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 20,
                  marginVertical: 15,
                }}>
                <Text style={[styles.title]}>
                  {props.user.firstName}, {props.user.age}
                </Text>
                {props.user.ability.length !== 0 && (
                  <Text style={[styles.text, {marginVertical: 6}]}>
                    {_toCapital(props.user.ability[0].level)}
                  </Text>
                )}
                <Text style={styles.text}>
                  {'Studies at ' + universitieName}
                </Text>
                <Text style={styles.text}>
                  {parseInt(parseFloat(props.user.distance) / 1609.34, 10) +
                    ' Miles Away'}
                </Text>
              </View>
              <View style={styles.bar}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  {availability.slice(0, 2).map((w) => (
                    <TouchableOpacity style={styles.circle} key={w}>
                      <Text style={styles.text_date}>{w.toUpperCase()}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Image
                  source={{uri: props.user.sport[0].thumbnail}}
                  style={styles.racket}
                />
              </View>
            </View>
          </View>

          {/* Back Side */}
          <View style={styles.main}>
            {props.user.mFriends.length !== 0 && (
              <Image source={images.group} style={styles.groupImg} />
            )}

            {/* <View style={{flex:1}}> */}
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: props.user.imageUrl}}
                  style={styles.back_img}
                />
                <Text style={styles.text1}>
                  {props.user.firstName}, {props.user.age}
                </Text>
              </View>
              <Text style={styles.text2}>{props.user.bio.description}</Text>
            </View>

            <View
              style={[
                {
                  width: '100%',
                  height: '100%',
                  flex: 1.4,
                  paddingHorizontal: 15,
                  paddingTop: 10,
                  backgroundColor: colors.darkBlue,
                },
              ]}>
              <Text style={styles.text6}>{'Matching Availability'}</Text>
              {availability.slice(0, 2).map((w) => (
                <DateView
                  data={fullWeekDays[w]}
                  value={props.user.availability[w]}
                  key={w}
                />
              ))}
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => props.setTogglePanel(true, props.user)}>
                <AntDesign name="down" size={30} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, padding: 15}}>
              <Text style={styles.text6}>{'Mutual Friends'}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                }}>
                {props.user.mFriends.slice(0, 5).map((friend) => (
                  <View style={styles.m_avatar}>
                    <Image source={{uri: friend.imageUrl}} />
                    <Text style={styles.text7}>
                      {friend.firstName + ' ' + friend.lastName}
                    </Text>
                  </View>
                ))}
              </View>
              {props.user.mFriends.length > 5 && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                  onPress={() => props.setToggleFollowPanel(true)}>
                  <AntDesign name="down" size={30} color={'white'} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  width: '100%',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => reportUser()}>
                <AntDesign
                  name="exclamationcircleo"
                  size={30}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>
        </FlipCard>
      </View>
      {_reportModal()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginHorizontal: 30,
    justifyContent: 'center',
    borderRadius: 60,
  },
  cardstack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: 10
    // marginVertical : 10,
  },
  card: {
    width: width,
    height: responsiveHeight(63),
  },
  mask: {
    width: '100%',
  },
  circle: {
    backgroundColor: colors.green,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  img: {
    flex: 1.5,
    width: '100%',
    // height: 300,
    borderRadius: 50,
  },
  back_img: {
    width: width / 4.5,
    height: 60,
    top: 10,
    left: 10,
    borderRadius: 20,
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40,
  },
  m_avatar: {
    flex: 0.2,
    textAlign: 'center',
    padding: 10,
  },
  text: {
    color: colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: 'ProximaNova-Bold',
  },
  text1: {
    color: colors.white,
    fontSize: 30,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    left: 20,
    top: 15,
  },
  text2: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    top: 20,
    marginHorizontal: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  text6: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  text7: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    fontSize: RFValue(23, 580),
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  racket: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 8,
    backgroundColor: 'white',
  },
  text4: {
    color: 'white',
    marginTop: 6,
    fontSize: 30,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700',
  },
  text5: {
    color: 'white',
    marginTop: 12,
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700',
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_date: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  circle_date: {
    backgroundColor: colors.green,
    width: 35,
    height: 35,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 1,
  },
  text_date: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
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
