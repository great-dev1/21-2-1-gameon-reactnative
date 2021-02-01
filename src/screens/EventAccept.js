import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {colors} from '../common/colors';
import {LongHeader} from '../components/longHeader';
import AppStatusBar from '../components/AppStatusBar';
// const supportedURL = 'https://google.com';
export default class EventAccept extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      checked1: false,
      checked2: true,
    };
    console.log(props.navigation.state.params);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <LongHeader
            title={'Event Signin'}
            bcolor={colors.gray}
            dark={true}
            left={colors.lightBlue}
            route={'Home'}
            navigate={navigate}
            leftText={'Back'}
          />
          <WebView source={{uri: this.props.navigation.state.params}} />
        </SafeAreaView>
      </>
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
});
