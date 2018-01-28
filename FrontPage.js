'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';

export default class FrontPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchLocation: 'oulu'
    };
  }

  render() {
    console.log('FrontPage.render');
    return (
      <View style={styles.container}>
      <Text style={styles.welcomeText}>Show me the weather in...</Text>
      <View style={styles.flowRight}>
        <TextInput
          style={styles.searchBar}
          value={this.state.searchLocation}
          placeholder='Enter location'
          onChange={this._onSearchLocationChanged}/>
        <Button
          onPress={() => {}}
          title='Search'
          color='#656465'
          />
      </View>
      </View>
    );
  }

  _onSearchLocationChanged = (event) => {
    console.log('new location event');
    this.setState({ searchLocation: event.nativeEvent.text});
    console.log('Previous location: ' +this.state.searchLocation+ ', New location: ' +event.nativeEvent.text);
  };
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#656565',
    marginTop: 100,
    marginBottom: 15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchBar: {
    height: 40,
    padding: 5,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#656565',
    borderRadius: 8,
    color: '#656565'
  },
});
