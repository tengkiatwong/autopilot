import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';
import { Body, Title, Left, Right, Segment } from 'native-base';

import MapScreen from './MapScreen.js'
import HookScreen from './HookScreen.js'
import Header from './components/Header.js'
import AugmentedScreen from './AugmentedScreen.js';
import WinScreen from './WinScreen.js';

import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'

class HomeScreen extends React.Component {
  constuctor(props) {
    this.state = { isReady: false }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
     Roboto: require("native-base/Fonts/Roboto.ttf"),
     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
   });

   this.setState({ isReady: true });
  }

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
    if (this.state && this.state.isReady === true ) {
      return (
        <View>
          <Header headerText="FishPon for Synchrony" bottomText="Choose your prefered deals and start fishing now!"/>
          <HookScreen/>
        </View>
      );
    }
    else {
      return null;
    }
  }
}

const AutoPilot = StackNavigator({
  HookScreen: {screen: HookScreen},
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
    width: '100%',
    height: 20
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
