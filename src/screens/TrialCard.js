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
export default class TrialCard extends Component {
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
                source={{uri: this.props.trial.imageUrl}}
                style={styles.frontimg}
              />
              <View style={{flex: 1, marginHorizontal: 20, marginVertical: 15}}>
                <Text style={[styles.title]}>{this.props.trial.name}</Text>
                <Text style={[styles.text2, {marginVertical: 6}]}>
                  Swipe right to Sign Up
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
                    onPress={() => this.setState({simpleModal: true})}>
                    <Text style={styles.text_date}>MON</Text>
                  </TouchableOpacity>
                </View>
                {this.props.trial.sport && (
                  <Image
                    source={{uri: this.props.trial.sport.thumbnail}}
                    style={styles.racket}
                  />
                )}
              </View>
            </View>
          </View>

          {/* Back Side */}
          <View style={styles.main}>
            {/* <Image source={images.group} style={styles.groupImg} /> */}
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.trial_back} style={styles.img} />
                <Text style={styles.text1}>{this.props.trial.name}</Text>
              </View>
              <View style={{flex: 1, marginLeft: 6}}>
                <Text style={styles.text}>{this.props.trial.description}</Text>
              </View>
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
  img: {
    width: 80,
    height: 60,
    top: 10,
    left: 20,
    borderRadius: 20,
  },
  frontimg: {
    flex: 1.5,
    width: '100%',
    // height: 200,
    marginVertical: 10,
    borderRadius: 40,
    resizeMode: 'cover',
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
    fontSize: 13,
    fontFamily: 'ProximaNova-Regular',
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
  text_date: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
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
});
