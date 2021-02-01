/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import {get} from 'lodash';
import {images} from '../../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export const {width, height} = Dimensions.get('window');
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import {LoginManager, AccessToken} from 'react-native-fbsdk';

import APIKit, {setClientToken} from '../../services/api';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure();
  }
  handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {navigate} = this.props.navigation;

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      APIKit.social_login({
        provider: 'google',
        identifier: userInfo.user.id,
      })
        .then((resp) => {
          if (!resp || resp.errors) {
            navigate('SetDetailOAuth', {
              provider: 'google',
              email: userInfo.user.email,
              idToken: userInfo.idToken,
              googleId: userInfo.user.id,
            });
          } else {
            setClientToken(resp.token);
          }
        })
        .catch((err) => {
          const error = get(err.response, 'data.errors.msg', '');
          if (error === 'NOT_PHONE_NUMBER') {
            navigate('SetPhone', {
              provider: 'google',
              googleAuth: {
                id: userInfo.user.id,
                token: userInfo.idToken,
              },
              user: {
                email: userInfo.user.email,
                firstname: userInfo.user.givenName,
                lastname: userInfo.user.familyName,
                photo: userInfo.user.photo,
              },
            });
          } else {
            console.log(err.response, '[ERROR]');
            Alert.alert(err.response.data.errors.msg.replace('_', ' '));
          }
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('signin cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('signin play service not available');
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('unknown error');
        console.log(error);
      }
    }
  };
  handleApplSignIn = async () => {
    const {navigate} = this.props.navigation;

    try {
      if (appleAuth.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [
            AppleAuthRequestScope.EMAIL,
            AppleAuthRequestScope.FULL_NAME,
          ],
        });
        if (appleAuthRequestResponse.email === null) {
          Alert.alert('Please share your email address');
          return;
        }
        APIKit.social_login({
          provider: 'apple',
          identifier: appleAuthRequestResponse.user,
        })
          .then((resp) => {
            if (!resp || resp.errors) {
              navigate('SetDetailOAuth', {
                provider: 'apple',
                email: appleAuthRequestResponse.email,
                idToken: appleAuthRequestResponse.identityToken,
                appleId: appleAuthRequestResponse.user,
              });
            } else {
              setClientToken(resp.token);
            }
          })
          .catch((err) => {
            const error = get(err.response, 'data.errors.msg', '');
            if (error === 'NOT_PHONE_NUMBER') {
              navigate('SetPhone', {
                provider: 'apple',
                appleAuth: {
                  id: appleAuthRequestResponse.user,
                  token: appleAuthRequestResponse.identityToken,
                },
                user: {
                  email: appleAuthRequestResponse.email,
                  firstname: appleAuthRequestResponse.fullName.givenName,
                  lastname: appleAuthRequestResponse.fullName.familyName,
                  photo: null,
                },
              });
            } else {
              console.log(err.response.data.errors.msg, '[ERROR]');
              Alert.alert(err.response.data.errors.msg.replace('_', ' '));
            }
          });
      } else {
        Alert.alert(
          'Apple Authentication is not supported on this device. Currently Apple Authentication works on iOS devices running iOS 13 or later',
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleFacebookSignIn = async () => {
    const {navigate} = this.props.navigation;
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        // console.log(result);
        if (result.isCancelled) {
          // console.log("Login cancelled");
        } else {
          // console.log(
          //   "Login success with permissions: " +
          //     result.grantedPermissions.toString()
          // );
          AccessToken.getCurrentAccessToken().then((data) => {
            const {accessToken} = data;
            fetch(
              'https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture.type(large)&access_token=' +
                accessToken,
            )
              .then((response) => response.json())
              .then((json) => {
                // Some user object has been set up somewhere, build that user here

                APIKit.social_login({
                  provider: 'facebook',
                  identifier: json.id,
                })
                  .then((resp) => {
                    if (!resp || resp.errors) {
                      navigate('SetDetailOAuth', {
                        provider: 'facebook',
                        email: json.email,
                        idToken: accessToken,
                        facebookId: json.id,
                      });
                    } else {
                      setClientToken(resp.token);
                    }
                  })
                  .catch((err) => {
                    const error = get(err.response, 'data.errors.msg', '');
                    if (error === 'NOT_PHONE_NUMBER') {
                      navigate('SetPhone', {
                        provider: 'facebook',
                        googleAuth: {
                          id: json.id,
                          token: accessToken,
                        },
                        user: {
                          email: json.email,
                          firstname: json.name.split(' ')[0],
                          lastname: json.name.split(' ')[1],
                          photo: json.picture.data.url,
                        },
                      });
                    } else {
                      console.log(err.response, '[ERROR]');
                      Alert.alert(
                        err.response.data.errors.msg.replace('_', ' '),
                      );
                    }
                  });
              })
              .catch((e) => {
                // reject('ERROR GETTING DATA FROM FACEBOOK');
                console.log(e);
              });
          });
        }
      },
      function (error) {
        // console.log("Login fail with error: " + error);
      },
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Image source={images.logo} style={styles.logo} />

            <TouchableOpacity
              onPress={this.handleFacebookSignIn}
              style={[styles.btn, {backgroundColor: '#3d589a'}]}>
              <AntDesign
                name="facebook-square"
                size={24}
                color="white"
                style={{marginHorizontal: 12}}
              />
              <Text style={{color: 'white'}}>Sign up with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.handleGoogleSignIn}
              style={styles.btn}>
              <AntDesign
                name="google"
                size={24}
                color="white"
                style={{marginHorizontal: 12}}
              />
              <Text style={{color: 'white', marginLeft: 12}}>
                Sign up with Google
              </Text>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={[
                  styles.btn,
                  {backgroundColor: '#f0f0f0', borderWidth: 0.3},
                ]}
                onPress={this.handleApplSignIn}>
                <FontAwesome
                  name="apple"
                  size={24}
                  color="black"
                  style={{marginHorizontal: 12}}
                />
                <Text style={{color: 'black', marginLeft: 24}}>
                  Sign in with Apple
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.text1}>{'- Or -'}</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => navigate('SetPhone')}>
              <View
                style={[
                  styles.btn,
                  {backgroundColor: '#f0f0f0', borderWidth: 0.3},
                ]}>
                <FontAwesome
                  name="phone"
                  size={24}
                  color="black"
                  style={{marginHorizontal: 12}}
                />
                <Text style={{color: 'black', marginLeft: 24}}>
                  Phone Number
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Image source={images.bottombar} style={styles.oval} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
  },
  text1: {
    color: 'grey',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  oval: {
    width,
    height: 300,
    position: 'absolute',
    bottom: -150,
  },
  logo: {
    width: 300,
    height: 70,
    marginBottom: 40,
    marginTop: -100,
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
    width: 220,
    height: 40,
    backgroundColor: colors.red,
    marginTop: 12,
  },
});
