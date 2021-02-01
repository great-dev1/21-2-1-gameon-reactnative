/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
export const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as Actions from '../store/actions';
import {Dropdown} from 'react-native-material-dropdown';
import APIKit from '../services/api';
import {Input} from 'react-native-elements';

import Menu, {MenuItem} from 'react-native-material-menu';

export function LongHeader(props) {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonTxt, setReasonTxt] = useState('');

  const dispatch = useDispatch();
  const reasons = [
    {
      value: 'Reason 1',
    },
    {
      value: 'Reason 2',
    },
    {
      value: 'Reason 3',
    },
  ];
  var _menu = null;

  const setMenuRef = (ref) => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
  };

  // const deleteMatch = () => {
  //   hideMenu();
  // };

  const reportUser = () => {
    hideMenu();
    setReason('');
    setReportModalVisible(true);
    console.log('modal:true');
  };

  const confirmReportUesr = () => {
    APIKit.reportUser({user: props.userId, reason}).then((resp) => {
      console.log('report user', resp.data);
      setReportModalVisible(false);
      blockChat();
    });
  };

  const blockChat = () => {
    console.log('block user', props.userId);
    APIKit.blockUser({user: props.userId}).then((resp) => {
      console.log('block user', resp.data);
      hideMenu();
      APIKit.getContacts().then((contacts) => {
        dispatch(Actions.setContacts(contacts.data));
        props.navigate(props.route);
      });
    });
  };

  const showMenu = () => {
    if (props.rightIcon) {
      _menu.show();
    } else {
      if (props.handleRefresh) {
        props.handleRefresh();
      }
    }
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
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: props.color,
            borderBottomWidth: 0.3,
            borderBottomColor: props.bcolor,
          },
        ]}>
        {_reportModal()}
        <View style={styles.top_middle}>
          {props.avatar && <Image source={props.avatar} style={styles.user} />}
          <Text style={[styles.text, props.dark && {color: 'black'}]}>
            {props.title}
          </Text>
          {/* <Text style={styles.text}>{'         '}</Text> */}
        </View>
        {!props.removeLeft && (
          <TouchableOpacity
            onPress={() => props.navigate(props.route)}
            style={{flexDirection: 'row'}}>
            <AntDesign
              name="left"
              size={25}
              color={props.left ? props.left : 'white'}
            />
            <Text style={{color: props.left, top: 3}}>{props.leftText}</Text>
          </TouchableOpacity>
        )}
        {!props.removeRightIcon && !props.rightMenu && (
          <TouchableOpacity onPress={() => showMenu()}>
            <AntDesign
              name={props.rightIcon ? props.rightIcon : 'reload1'}
              size={25}
              color={props.left ? props.left : 'white'}
            />
          </TouchableOpacity>
        )}
        {props.rightMenu && (
          <Menu
            ref={setMenuRef}
            button={
              <TouchableOpacity onPress={() => showMenu()}>
                <AntDesign
                  name={props.rightIcon ? props.rightIcon : 'reload1'}
                  size={25}
                  color={props.left ? props.left : 'white'}
                />
              </TouchableOpacity>
            }>
            <MenuItem onPress={() => blockChat()}>Block Chat</MenuItem>
            <MenuItem onPress={() => reportUser()}>Report User</MenuItem>
            {/* <MenuItem onPress={() => deleteMatch()}>Delete Match</MenuItem> */}
          </Menu>
        )}
        {props.removeRightIcon && (
          <View style={styles.top_end}>
            <TouchableOpacity
              onPress={() => {
                dispatch(Actions.saveSetting());
                dispatch(Actions.clearHistory());
                dispatch(Actions.setCurUser({}));
                props.navigate('Home');
              }}>
              <Text style={{color: props.left}}>{props.rightText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  text: {
    color: 'white',
    fontFamily: 'ProximaNova-Bold',
    fontSize: 20,
    left: 5,
  },
  user: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  top_middle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    // position : 'absolute',
    // marginHorizontal : 10,
    // left: responsiveScreenWidth(40),
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_end: {
    flex: 1,
    position: 'absolute',
    right: 15,
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
