import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import Header from '../components/header';
// import Footer from '../components/footer';

export default class OutOfCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.text}>{'There are no cards left to swipe'}</Text>
          <Text style={styles.text}>{'-'}</Text>
          <Text style={styles.text}>
            {'Try changing your preferences or range in settings'}
          </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  text: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
  },
});
