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
import {colors} from '../common/colors';
import {images} from '../common/images';
import AppStatusBar from '../components/AppStatusBar';
import {RFValue} from 'react-native-responsive-fontsize';
import ImagePicker from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import APIKit from '../services/api';
import * as Actions from '../store/actions';

import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';

export default (props) => {
  const profile = useSelector((state) => state.main.data.profile);
  const dispatch = useDispatch();
  const onChangeProfilePicture = () => {
    let options = {
      noData: false,
    };
    const fileUpload = async (photo) => {
      APIKit.uploadImage({
        image: 'data:image/jpeg;base64,' + photo.data,
        name: photo.fileName,
      })
        .then((resp) => {
          dispatch(
            Actions.setProfile({...profile, imageUrl: resp.data.imageUrl}),
          );
          APIKit.profile({...profile, imageUrl: resp.data.imageUrl})
            .then((pro) => {
              console.log(pro.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.error('err', error);
        });
    };
    ImagePicker.showImagePicker(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        if (res.uri) {
          if (res.width > 500 || res.height > 500) {
            let newWidth = 500,
              newHeight = 500;
            if (res.width > res.height) {
              newHeight = (res.height / res.width) * 500;
            }
            ImageResizer.createResizedImage(
              res.uri,
              newWidth,
              newHeight,
              'PNG',
              3,
            )
              .then((resizedImageUri) => {
                // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
                console.log(resizedImageUri);
                ImgToBase64.getBase64String(resizedImageUri.uri)
                  .then((base64String) => {
                    fileUpload({
                      fileName: resizedImageUri.name,
                      uri: resizedImageUri.uri,
                      type: 'PNG',
                      data: base64String,
                    });
                  })
                  .catch((err) => {
                    console.log('loading image error:', err);
                  });
              })
              .catch((err) => {
                console.log('Image Compress Error:', err);
              });
          } else {
            fileUpload(res);
          }
        }
      }
    });
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
            title={'Profile'}
            color={'white'}
            left={'green'}
            route={'Settings'}
            navigate={navigate}
            dark
            removeRightIcon
          />
          <View style={styles.main}>
            <View style={styles.top}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => onChangeProfilePicture()}>
                <Image
                  source={{uri: profile.imageUrl}}
                  style={styles.profile_avatar}
                />
                <Image
                  source={images.AvatarMask}
                  style={styles.profile_avatar}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: RFValue(18),
                    fontFamily: 'ProximaNova-Bold',
                    fontWeight: '700',
                    position: 'absolute',
                    left: 40,
                    bottom: '10%',
                  }}>
                  Profile Picture
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.middle}>
              <View style={styles.middle_left}>
                <TouchableOpacity onPress={() => navigate('SportsEdit')}>
                  <Image
                    source={images.ProfileSports}
                    style={{...styles.profile_img, height: 170}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.middle_right}>
                <TouchableOpacity onPress={() => navigate('BioEdit')}>
                  <Image
                    source={images.ProfileBio}
                    style={{...styles.profile_img, height: 170}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.middle}>
              <View style={styles.middle_left}>
                <TouchableOpacity onPress={() => navigate('AvailabilityEdit')}>
                  <Image
                    source={images.ProfileAvaila}
                    style={{...styles.profile_img, height: 170}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.middle_right}>
                <TouchableOpacity onPress={() => navigate('TeamsView')}>
                  <Image
                    source={images.ProfileTeams}
                    style={{...styles.profile_img, height: 170}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => navigate('AbilityEdit')}>
                <Image
                  source={images.ProfileAbili}
                  style={{...styles.profile_img, height: 80, marginBottom: 10}}
                />
              </TouchableOpacity>
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
    backgroundColor: colors.darkBlue,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    // height: 350,
    // backgroundColor: 'red'
  },
  top_left: {
    flex: 1,
    padding: 15,
    backgroundColor: 'red',
  },
  top_right: {
    flex: 1,
    flexDirection: 'column',
  },
  top_right_top: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
  },
  top_right_down: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  middle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor:'red'
  },
  middle_left: {
    flex: 1,
    // padding:10,
    resizeMode: 'cover',
    padding: 10,
    // backgroundColor:'yellow'
  },
  middle_right: {
    flex: 1,
    padding: 10,
  },
  bottom: {
    // flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    // backgroundColor:'red'
  },
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
  profile_avatar: {
    flex: 1,
    width: '90%',
    // height:'100%',
    height: '88%',
    borderRadius: 40,
    resizeMode: 'cover',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    // top:0,bottom:0,
    // top:'10%',
    // left:15
  },
  profile_img: {
    width: '100%',
    // height: 300,
    // borderRadius:50,
    resizeMode: 'contain',
    // flex: 1
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
  },
});
