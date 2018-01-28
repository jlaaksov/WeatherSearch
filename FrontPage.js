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
      searchLocation: 'Oulu',
      currentCity: 'Oulu',
      weatherType: "Clear",
      temperature: -5,
      isLoading: false,
      message: '',
    };
  }

  render() {
    console.log('FrontPage.render');
    const loadingIcon = this.state.isLoading ? <ActivityIndicator size='large' /> : null;

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
          onPress={this._onSearchButtonPressed}
          title='Search'
          color='#656465'
          />
      </View>
      <Text style={styles.errorMessage}>{this.state.message}</Text>
      <View style={styles.loadingIconContainer}>
      {loadingIcon}
      </View>
      <View style={styles.weatherContainer}>
        <Text style={styles.temperatureText}>{this.state.temperature}</Text>
      </View>
      </View>
    );
  }

  _onSearchLocationChanged = (event) => {
    //console.log('new location event');
    this.setState({ searchLocation: event.nativeEvent.text});
    //console.log('Previous location: ' +this.state.searchLocation+ ', New location: ' +event.nativeEvent.text);
  };

  //TODO: Stop using hardcoded values
  _onSearchButtonPressed = () => {
    const search = 'http://api.openweathermap.org/data/2.5/weather?q=' +this.state.searchLocation +'&units=metric&APPID=f6166b4126c356a085cd8d2a357fa423';
    console.log('search url: ' +search);
    this._performSearch(search);
  };

  _performSearch = (search) => {
    console.log('_performSearch called');
    this.setState({isLoading: true});

    fetch(search)
      .then(response => response.json())
      .then((response) =>  {
        this.setState({isLoading: false, message: ' '});
        //console.log('Response: ' + response.weather.description );
        if(response.cod == 200) {
          console.log('Found weather for ' +response.name );
          this.setState({currentCity: response.name});
          this.setState({temperature: response.main.temp});
          this.setState({weatherType: response.weather.main});
        }else {
          this.setState({message: 'Location not found, try again.'});
          console.log('Location not found');
          this.setState({currentCity: '-'});
          this.setState({temperature: 0});
          this.setState({weatherType: '-'});
        }
      });
  };

}



const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#656565',
    marginTop: 50,
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
  loadingIconContainer: {
    marginTop: 100
  },
  errorMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40
  },
  weatherContainer: {
    flex: 1
  },
  temperatureText: {
    fontSize: 40,
    textAlign: 'center'
  }
});
