'use strict';

import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS,} from 'react-native';
import FrontPage from './FrontPage';

export default class App extends React.Component <{}> {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Front Page',
          component: FrontPage,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
