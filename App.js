import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import {Routers} from './src/routers';
import initStore from './src/store';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: initStore(),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Provider store={this.state.store}>
          <Routers />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
