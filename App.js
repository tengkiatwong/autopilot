import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';

import MapScreen from './MapScreen.js';
import AugmentedScreen from './AugmentedScreen.js';
import WinScreen from './WinScreen.js';

import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    categories:null
  };

  componentDidMount() {
    return fetch('http://f1915ff1.ngrok.io/categories')
      .then((response) => response.json())
      .then((responseJson) => {
        Reactotron.log(responseJson)
        this.setState({
          categories: responseJson
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (<View style={styles.container}>
        <View>
          <Text style={styles.headerText}>What are you looking for today?</Text>
        </View>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Dining</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("MapScreen",{categories: this.state.categories})}>
          <Text style={styles.cardText}>SportsWear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Groceries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Watches</Text>
        </TouchableOpacity>

      </View>);
  }
}

const AutoPilot = StackNavigator({
  Home: { screen: HomeScreen },
  MapScreen: { screen: MapScreen},
  AugmentedScreen: {screen: AugmentedScreen}
});

export default class App extends React.Component {
  render() {
    return <AutoPilot />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  headerText: {
    marginTop:40
    //fontSize: 30
    //color: blue
  },
  card: {
    height:40,
    flex: 1,
    width: 360,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
