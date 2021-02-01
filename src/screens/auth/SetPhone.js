/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Alert,
  PixelRatio,
  Platform,
  TextInput,
} from 'react-native';
import {findIndex, get} from 'lodash';
import {CountryCodeList} from './CountryCodes';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Button, Icon} from 'react-native-elements';
import APIKit from '../../services/api';
import CountryPicker from 'react-native-country-picker-modal';

export default class SetPhone extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: true,
      cca2: CountryCodeList[findIndex(CountryCodeList, (o) => o === 'GB')],
      country: null,
      isKeyboardOpen: false,
      phone: '',
    };
  }
  _keyboardDidHide() {
    this.setState({isKeyboardOpen: false});
  }
  _keyboardDidShow() {
    this.setState({isKeyboardOpen: true});
  }
  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
  next(navigate) {
    if (this.state.phone === '') {
      Alert.alert('Please input your phone number.');
    } else {
      const params = get(this.props, 'navigation.state.params', null);
      const {phone, country} = this.state;
      let phoneNum = '';
      if (country && country.callingCode.length > 0) {
        phoneNum = `+${country.callingCode[0]}${phone}`;
      } else {
        phoneNum = `+44${phone}`;
      }
      let payload = {
        phone: phoneNum,
      };
      let user = null;
      if (params) {
        const {provider, googleAuth, fbAuth, appleAuth} = params;
        user = params.user;
        payload = {
          ...payload,
          provider,
          appleAuth,
          googleAuth,
          fbAuth,
        };
      }
      APIKit.sendSMSCode(payload)
        .then(({data}) => {
          if (data.success) {
            let props = {phone: phoneNum};
            if (user) {
              props = {
                ...props,
                user,
              };
            }
            navigate('SetSmsCode', props);
          }
        })
        .catch((error) => {
          console.log(error, '[ERROR]');
          Alert.alert(error.response.data.errors.msg.replace('_', ' '));
        });
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>
              {'Enter your phone number below for verification'}
            </Text>
          </View>
          <View style={styles.sectionMiddle}>
            <View style={styles.labelContainer}>
              <Text style={styles.textInputLabel}>{'Phone'}</Text>
              <View style={styles.row}>
                <View style={styles.countryPicker}>
                  <CountryPicker
                    countryCode={this.state.cca2}
                    withFlag
                    withCallingCode
                    withCallingCodeButton
                    withFlagButton
                    withAlphaFilter
                    onSelect={(value) =>
                      this.setState({
                        country: value,
                        cca2: value.cca2,
                      })
                    }
                    containerButtonStyle={styles.countryPickerComponent}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter Your Phone Number"
                    value={this.state.phone}
                    onChangeText={(value) => this.setState({phone: value})}
                    keyboardType={'numeric'}
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('Signin')}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.next(navigate)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countryPicker: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 100,
    marginRight: 10,
  },
  inputContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 10,
    width: 200,
  },
  labelContainer: {
    alignItems: 'flex-start',
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
    // backgroundColor:'red'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTop: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 70,
    marginBottom: 50,
  },
  sectionMiddle: {
    flex: 3,
    width: '100%',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    alignItems: 'center',
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
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    color: 'grey',
    fontSize: 20,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  textInputLabel: {
    color: 'grey',
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    padding: 0,
    textAlign: 'left',
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
