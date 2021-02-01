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
import {RFValue} from 'react-native-responsive-fontsize';
export const {width, height} = Dimensions.get('window');

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export default class TrainingCard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.training.availability[0].start);
    let start = null;
    let end = null;
    if (
      this.props.training.availability[0] &&
      this.props.training.availability[0].start
    ) {
      start = new Date();
      start.setTime(this.props.training.availability[0].start);
      end = new Date();
      end.setTime(this.props.training.availability[0].end);
    }
    this.state = {
      day: start ? weekdays[start.getDay()] : null,
      startTime: start
        ? ((start.getHours() + 11) % 12) +
          1 +
          ' ' +
          (start.getHours() >= 12 ? 'pm' : 'am')
        : null,
      endTime: end
        ? ((end.getHours() + 11) % 12) +
          1 +
          ' ' +
          (end.getHours() >= 12 ? 'pm' : 'am')
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
                source={{uri: this.props.training.imageUrl}}
                style={styles.frontimg}
              />
              <View style={{flex: 1, marginHorizontal: 20, marginVertical: 15}}>
                <Text style={[styles.title]}>{this.props.training.name}</Text>
                <Text style={[styles.text2]}>Bristol Tennis Club</Text>
                <Text style={[styles.text2]}>
                  {this.props.training.location.address}
                </Text>
                <Text style={[styles.text3]}>Swipe to join</Text>
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
                    <Text style={styles.text_date}>{this.state.day}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.text2]}>
                    {this.state.startTime} - {this.state.endTime}
                  </Text>
                  {/* <TouchableOpacity style={styles.circle} onPress={() => console.log('Fri Clicked')}>
                        <Text style={styles.text3}>Fri</Text>
                      </TouchableOpacity> */}
                </View>
                {this.props.training.sport && (
                  <Image
                    source={{uri: this.props.training.sport.thumbnail}}
                    style={styles.racket}
                  />
                )}
              </View>
            </View>
          </View>
          {/* Back Side */}
          <View style={styles.main}>
            {/* <Image source={images.group} style={styles.groupImg} /> */}
            {/* <View style={{ flex: 1,flexDirection: 'column', padding: 10}}>
                    <View style={{flex: 1, flexDirection : 'row'}}>
                      <Image source={images.trial_back} style={styles.img} />
                      <Text style={styles.text1}>Bristol Advanced Squad</Text>
                    </View>
                    <Text style={styles.text2}>{"Bristol Advanced Tennis Squad is for people looking to play tennis at a good standard whilst still being able to have a laugh’"}</Text>
                  </View>

                  <View style={{width:'100%',flex: 1, backgroundColor : colors.darkOrange , padding: 15}}>
                    <Text style={styles.text6}>{"Matching"}</Text>
                    <DateView data={'Monday'} value={[0, 1, 0]}/>
                    <DateView data={'Wednesday'} value={[0, 1, 0]}/>
                  </View>
                  <View style={{flex: 1,  padding: 15}}>
                    <Text style={styles.text6}>{"Mutual Friends"}</Text>
                    <View style={{flex: 1, flexDirection : 'row', padding: 15}}>
                      <View style={styles.m_avatar}>
                        <Image source={images.user10} />
                        <Text style={styles.text7}>Jess Jones</Text>
                      </View>
                      <View style={styles.m_avatar}>
                        <Image source={images.user11}/>
                        <Text style={styles.text7}>Jack Norrow</Text>
                      </View>
                    </View>
                </View> */}
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
    backgroundColor: colors.lightpurple,
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
    // height: 200,
    marginVertical: 10,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',
    marginHorizontal: 10,
    marginVertical: 20,
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
  text1: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    left: 30,
    top: 10,
  },
  text2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    top: 10,
  },
  text3: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    top: 10,
    marginTop: 20,
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
    padding: 10,
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
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
  },
});
