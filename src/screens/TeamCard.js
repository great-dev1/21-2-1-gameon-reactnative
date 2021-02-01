/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import {colors} from '../common/colors';
import {images} from '../common/images';
export const {width, height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
function DateView(props) {
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={[styles.circle_date]}>
          <Text style={styles.text_date}>6pm</Text>
        </View>
        <Text
          style={{
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          {'-'}
        </Text>
        <View style={[styles.circle_date]}>
          <Text style={styles.text_date}>8pm</Text>
        </View>
        {/* <View style={[styles.circle_date, { backgroundColor: props.value[2] ? colors.green : colors.red}]}>
            <Text style={styles.text_date}>EVE</Text>
          </View> */}
      </View>
    </View>
  );
}
export default class TeamCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlipCard
          friction={15}
          flipHorizontal={true}
          flipVertical={false}
          flip={false}
          clickable={true}
          onFlipEnd={(isFlipEnd) => {
            console.log('isFlipEnd', isFlipEnd);
          }}
          useNativeDriver={false}>
          {/* Face Side */}
          <View style={styles.main}>
            {this.props.team.friends.length !== 0 && (
              <Image source={images.group} style={styles.groupImg} />
            )}

            <View style={{flex: 1, padding: 15}}>
              <Image
                source={{uri: this.props.team.imageUrl}}
                style={styles.frontimg}
              />
              <View style={{flex: 1, marginHorizontal: 20, marginVertical: 15}}>
                <Text style={[styles.title]}>{this.props.team.name}</Text>
                <Text style={[styles.text2, {marginVertical: 6}]}>
                  Trains at {this.props.team.location.address}
                </Text>
              </View>
              <View style={styles.bar}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => console.log('Mon Clicked')}>
                    <Text style={styles.text_date}>MON</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => console.log('Fri Clicked')}>
                    <Text style={styles.text_date}>FRI</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{uri: this.props.team.sport.thumbnail}}
                  style={styles.racket}
                />
              </View>
            </View>
          </View>
          {/* Back Side */}
          <View style={styles.main}>
            {this.props.team.friends.length !== 0 && (
              <Image source={images.group} style={styles.groupImg} />
            )}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingTop: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: this.props.team.imageUrl}}
                  style={styles.img}
                />
                <Text style={styles.text1}>{this.props.team.name}</Text>
              </View>
              <Text style={styles.text2}>
                {
                  this.props.team.description
                  // 'Bristol Advanced Tennis Squad is for people looking to play tennis at a good standard whilst still being able to have a laugh’'
                }
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                flex: 1,
                backgroundColor: colors.darkOrange,
                paddingHorizontal: 15,
                paddingTop: 10,
              }}>
              <Text style={styles.text6}>{'Training Times'}</Text>
              <DateView data={'Monday'} value={[0, 1, 0]} />
              <DateView data={'Friday'} value={[0, 1, 0]} />
            </View>
            <View style={{flex: 1, padding: 15}}>
              <Text style={styles.text6}>{'Mutual Friends'}</Text>
              <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
                {this.props.team.friends.map((friend, index) => (
                  <View style={styles.m_avatar} key={'friend' + index}>
                    <Image source={{uri: friend.imageUrl}} />
                    <Text style={styles.text7}>
                      {friend.firstName + ' ' + friend.lastName}
                    </Text>
                  </View>
                ))}
              </View>
              {this.props.team.friends.length > 5 && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                  onPress={() => this.props.setToggleTeamPanel(true)}>
                  <AntDesign name="down" size={30} color={'white'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </FlipCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    backgroundColor: colors.orange,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginHorizontal: 30,
    borderRadius: 60,
  },
  img: {
    width: width / 4.5,
    height: 60,
    top: 10,
    left: 10,
    borderRadius: 20,
  },
  frontimg: {
    flex: 1.5,
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 40,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',

    marginHorizontal: 10,
    marginVertical: 20,
  },
  text3: {
    color: colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: 'ProximaNova-Bold',
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
    marginHorizontal: 10,
    borderRadius: 10,
  },
  text1: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    left: 20,
    top: 20,
  },
  text2: {
    flex: 1,
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 15,
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40,
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
  text6: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  text7: {
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
  },
  m_avatar: {
    flex: 0.2,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_date: {
    flex: 1,
    width: 100,
    height: 40,
    // backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  circle_date: {
    // backgroundColor: colors.green,
    width: 35,
    height: 35,
    // borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 1,
  },
  text_date: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular',
  },
});
