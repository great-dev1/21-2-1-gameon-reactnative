/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Button, Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import APIKit from '../../services/api';

export default class Permission extends Component {
  state = null;
  constructor (props) {
    super (props);
    this.state = {
      showSelected: false,
    };
  }

  askPermission () {
    const {navigate} = this.props.navigation;
    Alert.alert (
      'Send You Notifications',
      'Notifications may include alerts, sounds and icon badges. These can be configured in Settings.',
      [
        {
          text: "Don't Allow",
          onPress: () => navigate ('Home'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            APIKit.getSetting ().then (resp => {
              resp.data.notifications = {
                matches: true,
                messages: true,
                training: true,
                socials: true,
                vibrations: true,
                sounds: true,
              };
              APIKit.setSetting (resp.data).then (() => {
                navigate ('Home');
              });
            });
          },
        },
      ],
      {cancelable: true}
    );
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>
              {
                'We need your permission to access your location and notifications - this helps us find players near you'
              }
            </Text>
          </View>
          <View style={styles.sectionMiddle}>
            <View style={styles.item}>
              <View>
                <Image source={images.gps} />
              </View>
            </View>
            <View style={styles.item}>
              <View>
                <Image source={images.bell} />
              </View>
            </View>
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate ('SetAvailability')}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.askPermission ()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
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
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 3,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
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
    fontSize: RFValue (12, 580),
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
    color: 'grey',
    textAlign: 'center',
    fontSize: RFValue (14, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  sublabel: {
    // flex: 1,
    color: 'grey',
    fontSize: RFValue (12, 580),
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
});
