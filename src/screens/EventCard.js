/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import FlipCard from 'react-native-flip-card';
import {colors} from '../common/colors';
import {images} from '../common/images';
export const {width, height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
// function DateView(props) {
//   return (
//     <View style={styles.item}>
//       <View style={styles.btn_date}>
//         <Text style={styles.text3}>{props.data}</Text>
//       </View>
//       <View style={{flexDirection: 'row'}}>
//         <View
//           style={[
//             styles.circle_date,
//             {backgroundColor: props.value[0] ? colors.green : colors.red},
//           ]}>
//           <Text style={styles.text_date}>AM</Text>
//         </View>
//         <View
//           style={[
//             styles.circle_date,
//             {backgroundColor: props.value[1] ? colors.green : colors.red},
//           ]}>
//           <Text style={styles.text_date}>PM</Text>
//         </View>
//         <View
//           style={[
//             styles.circle_date,
//             {backgroundColor: props.value[2] ? colors.green : colors.red},
//           ]}>
//           <Text style={styles.text_date}>EVE</Text>
//         </View>
//       </View>
//     </View>
//   );
// }
const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    var start = null;
    if (
      this.props.event.$__.scope.availability[0] &&
      this.props.event.$__.scope.availability[0].start
    ) {
      start = new Date();
      start.setTime(this.props.event.$__.scope.availability[0].start);
    }
    this.state = {
      day: start ? weekdays[start.getDay()] : null,
      startTime: start
        ? ((start.getHours() + 11) % 12) +
          1 +
          ' ' +
          (start.getHours() >= 12 ? 'pm' : 'am')
        : null,
    };
  }
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
            {/* <Image source={images.group} style={styles.groupImg} /> */}
            <View style={{flex: 1, padding: 15}}>
              <Image
                source={{uri: this.props.event.$__.scope.imageUrl}}
                style={styles.img}
              />
              <View style={{flex: 1, marginHorizontal: 20, marginVertical: 15}}>
                <Text style={[styles.title]}>
                  {this.props.event.$__.scope.name}
                </Text>
                <Text style={[styles.text2]}>
                  {this.props.event.$__.scope.subName}
                </Text>
                <Text style={[styles.text2]}>
                  {this.props.event.$__.scope.location.address}
                </Text>
                <Text style={styles.text4}>
                  {'Swipe to join - Exclusive to app users'}
                </Text>
              </View>
              <View style={styles.bar}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <View
                    style={styles.circle}
                    onPress={() => console.log('Mon Clicked')}>
                    <Text style={styles.text3}>{this.state.day}</Text>
                  </View>
                  <Text style={[styles.text2]}>{this.state.startTime}</Text>
                </View>
                {this.props.event.sport && (
                  <Image
                    source={{uri: this.props.event.sport.thumbnail}}
                    style={styles.racket}
                  />
                )}
              </View>
            </View>
          </View>
          {/* Back Side */}
          <View style={styles.main}>
            <Image source={images.group} style={styles.groupImg} />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image source={images.grape} style={styles.img_back} />
                <Text style={styles.text1}>Advanced Trials</Text>
              </View>
              <Text style={styles.text2}>
                {
                  "If you are looking to play with the Advanced team or Advanced squad you will need to swipe right to select the times you are available to come for a trial'"
                }
              </Text>
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
  },
  main: {
    flex: 1,
    backgroundColor: colors.biglightBlue,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginHorizontal: 30,
    borderRadius: 60,
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
    // height: 200,
    marginVertical: 10,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  img_back: {
    width: 80,
    height: 60,
    top: 10,
    left: 20,
    borderRadius: 20,
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  title: {
    color: colors.white,
    fontSize: RFValue(18, 580),
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
  text1: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '700',
    left: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    top: 10,
  },
  text3: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
  },
  text4: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    top: 10,
    marginTop: 10,
  },
  text_time: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    alignSelf: 'center',
  },
});
