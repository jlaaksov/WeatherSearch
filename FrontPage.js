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
      searchLocation: '',
      currentCity: '-',
      weatherType: '',
      temperature: '',
      description: '',
      wind: '',
      isLoading: false,
      message: '',
    };
  }

  render() {
    console.log('FrontPage.render');
    const loadingIcon = this.state.isLoading ? <ActivityIndicator size='large' /> : null;

    return (
      <View style={styles.container}>
      <Image source={require('./Resources/logo.png')} style={styles.image}/>
      <Text style={styles.welcomeText}>Show me the weather in</Text>
      <View style={styles.flowRight}>
        <TextInput
          style={styles.searchBar}
          value={this.state.searchLocation}
          placeholderTextColor='#FAFAFA'
          placeholder='Enter location'
          onChange={this._onSearchLocationChanged}/>
        <Button
          onPress={this._onSearchButtonPressed}
          title='Search'
          color='#FAFAFA'
          />
      </View>
      <Text style={styles.errorMessage}>{this.state.message}</Text>
      <View style={styles.loadingIconContainer}>
      {loadingIcon}
      </View>
      <View style={styles.weatherContainer}>
        <Text style={styles.nowText}>Weather now in</Text>
        <Text style={styles.locationText}>{this.state.currentCity}</Text>
        <Text style={styles.temperatureText}>{this.state.temperature}</Text>
        <Text style={styles.description}>Condition: {this.state.description}</Text>
        <Text style={styles.wind}>Wind speed: {this.state.wind} m/s</Text>
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
        if(response.cod == 200) {
          console.log('Found weather for ' +response.name );
          this.setState({currentCity: response.name});
          this.setState({temperature: response.main.temp});
          this.setState({weatherType: response.weather.main});
          this.setState({description: response.weather[0].main});
          console.log(response.weather[0].description);
          this.setState({wind: response.wind.speed});
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
  image: {
    marginTop: 20,
    width: 199,
    height: 122
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15
  },
  container: {
    flex: 0.35,
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#20A7DB'
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
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#FAFAFA',
    borderRadius: 8,
    color: '#FAFAFA'
  },
  loadingIconContainer: {
    marginTop: 10
  },
  errorMessage: {
    fontSize: 18,
    textAlign: 'center',
  },
  weatherContainer: {
    flex: 1,
    marginTop: 30
  },
  nowText: {
    fontSize: 24,
    textAlign: 'center'
  },
  locationText: {
    fontSize: 48,
    textAlign: 'center'
  },
  temperatureText: {
    fontSize: 96,
    textAlign: 'center'
  },
  description: {
    fontSize: 24,
    textAlign: 'center'
  },
  wind: {
    fontSize: 24,
    textAlign: 'center'
  },
});
