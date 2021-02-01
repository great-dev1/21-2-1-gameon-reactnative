import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';

function DateView(props) {
  return (
    <View style={styles.item}>
      <View style={styles.btn}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.circle,
            {backgroundColor: props.value[0] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text4}>AM</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: props.value[1] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text4}>PM</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: props.value[2] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text4}>EVE</Text>
        </View>
      </View>
    </View>
  );
}

export default class TimeEdit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LongHeader title={'TimeEdit'} color={'purple'} />
        <View style={styles.main}>
          <Text style={styles.text}>
            {'Tap the relevant time and day to update availability'}
          </Text>

          <View style={{marginRight: 12, alignSelf: 'flex-end'}}>
            <Text style={styles.text2}>
              {'06:00-12:00    12.00-18.00    18.00-23.00'}
            </Text>
          </View>

          <DateView data={'Monday'} value={[0, 0, 0]} />
          <DateView data={'Tuesday'} value={[0, 0, 0]} />
          <DateView data={'Wednesday'} value={[0, 1, 0]} />
          <DateView data={'Thursday'} value={[0, 1, 0]} />
          <DateView data={'Friday'} value={[0, 0, 0]} />
          <DateView data={'Saturday'} value={[0, 1, 1]} />
          <DateView data={'Sunday'} value={[0, 0, 0]} />

          <View style={styles.largeBtn}>
            <Text style={{color: 'white', fontFamily: 'ProximaNova-Regular'}}>
              Save
            </Text>
          </View>
        </View>
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
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
  },
  text: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '700',
  },
  text2: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 15,
    fontWeight: '600',
    marginTop: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  text4: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  racket: {
    width: 40,
    height: 40,
  },
  circle: {
    backgroundColor: colors.green,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 1,
  },
  largeBtn: {
    height: 50,
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#e67e22',
    borderRadius: 12,
    width: '98%',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
