import React, {Component} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {setClientToken} from '../../services/api';
export default class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log('start');
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('userToken', userToken);
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (userToken) {
        setClientToken(userToken);
      }
      this.props.navigation.navigate(userToken ? 'Home' : 'Auth');
    } catch (e) {
      // saving error
    }
  };
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
