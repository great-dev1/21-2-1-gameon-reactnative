/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Input, CheckBox, Icon, Button} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import APIKit, {setClientToken} from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const termsURL = 'http://armago.uk/terms';
const privacyURL = 'http://armago.uk/privacy';
export default class SetDetail extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      checked1: false,
      checked2: false,
      checked3: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {user} = this.props.navigation.state.params;
    if (user) {
      this.setState({email: user.email});
    }
  }

  next(navigate, phoneNumber) {
    if (this.state.email === '') {
      Alert.alert('Please type your email address');
    } else if (!this.state.checked1 || !this.state.checked3) {
      Alert.alert('Please agree consent');
    } else {
      //register with email and phone number
      const payload = {
        phone: phoneNumber,
        email: this.state.email,
        provider: 'local',
      };
      APIKit.register(payload)
        .then(async ({data}) => {
          console.log(data);
          const token = data.token;
          //set token to call other api
          setClientToken(token);
          await AsyncStorage.removeItem('usedBefore');

          const user = data.user;
          const profile = {
            firstName: '',
            lastName: '',
            location: {
              lat: 0,
              lng: 0,
              address: '',
            },
            gender: 'male',
            imageUrl: null,
            fullfilled: false,
          };
          await APIKit.profile(profile);
          const availability = {
            sun: [1, 1, 1],
            mon: [1, 1, 1],
            tue: [1, 1, 1],
            wed: [1, 1, 1],
            thu: [1, 1, 1],
            fri: [1, 1, 1],
            sat: [1, 1, 1],
          };
          await APIKit.setavaliablity({availability});
          const setting = {
            location: [{lat: 0, lng: 0, address: ''}],
            distance: [0, 5],
            gender: [{sport: '', value: ''}],
            age: [18, 30],
            seen: false,
            notifications: {
              matches: false,
              messages: false,
              training: false,
              socials: false,
              vibrations: false,
              sounds: false,
            },
          };
          let props = {};
          if (this.props.navigation.state.params.user) {
            props = {
              user: this.props.navigation.state.params.user,
            };
          }
          APIKit.setSetting(setting).then((resp) => {
            const fullfilled = user.fullfilled;
            !fullfilled ? navigate('SetPersonalInfo', props) : navigate('Home');
          });
        })
        .catch((error) => {
          console.log(error && error.response);
        });
    }
  }

  goToLink = (link) => {
    Linking.openURL(link);
  };

  render() {
    const {navigate} = this.props.navigation;
    const phoneNumber = this.props.navigation.state.params.phone;

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>{'Enter your details'}</Text>
          </View>
          <View style={styles.sectionMiddle}>
            <Input
              label="Email"
              placeholder="Enter Your Email"
              style={styles.input}
              value={this.state.email}
              onChangeText={(value) => this.setState({email: value})}
            />

            <Text style={styles.label}>{'Marketing Consent'}</Text>
          </View>
          <View style={styles.sectionMiddleBottom}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <CheckBox
                left
                checkedIcon={<Image source={images.checked} />}
                uncheckedIcon={<Image source={images.unchecked} />}
                style={styles.checkbox}
                checked={this.state.checked1}
                onPress={() => this.setState({checked1: !this.state.checked1})}
              />
              <Text style={styles.sublabel}>
                <Text>{'By ticking this box you agree to the '}</Text>
                <Text
                  style={{color: colors.biglightBlue}}
                  onPress={() => this.goToLink(termsURL)}>
                  {'terms and conditions'}
                </Text>
                <Text>{' of GameOn and to the '}</Text>
                <Text
                  style={{color: colors.biglightBlue}}
                  onPress={() => this.goToLink(privacyURL)}>
                  {'privacy policy'}
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <CheckBox
                left
                checkedIcon={<Image source={images.checked} />}
                uncheckedIcon={<Image source={images.unchecked} />}
                checked={this.state.checked2}
                style={styles.checkbox}
                onPress={() => this.setState({checked2: !this.state.checked2})}
              />
              <Text style={styles.sublabel}>
                {
                  'By ticking this box you agree you would like to receive marketing communications by email'
                }
              </Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <CheckBox
                left
                checkedIcon={<Image source={images.checked} />}
                uncheckedIcon={<Image source={images.unchecked} />}
                checked={this.state.checked3}
                style={styles.checkbox}
                onPress={() => this.setState({checked3: !this.state.checked3})}
              />
              <TouchableOpacity
                onPress={() => navigate('Eula', {backUrl: 'SetDetail'})}>
                <Text style={styles.sublabel}>
                  {'I agree to the '}
                  <Text style={{color: colors.biglightBlue}}>EULA</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('SetSmsCode')}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.next(navigate, phoneNumber)}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

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
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    //   flex : 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  sectionMiddleBottom: {
    width: '100%',
  },
  sectionBottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    flex: 1,
    width: 250,
    //   height:50,
    resizeMode: 'contain',
  },
  tlabel: {
    flex: 1,
    color: 'grey',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  label: {
    width: '100%',
    marginLeft: 25,
    textAlign: 'left',
    fontSize: RFValue(13, 580),
    color: '#86939e',
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  checkbox: {
    width: responsiveScreenWidth(10),
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
  sublabel: {
    width: responsiveScreenWidth(65),
    top: 15,
    left: -25,
    textAlign: 'left',
    paddingLeft: 20,
    fontSize: RFValue(13, 580),
    color: '#86939e',
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
