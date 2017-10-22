import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Modal,TouchableHighlight, Alert } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';
import { MapView , Location, Permisions } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      item: {
        title: "Ruth's Chris Steak House",
        code: "PlZ73aMeL3",
        description: "Thank you for shopping with us regularly, 30% off your purchase of $100 or more today",
      }
    }
  }

  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          
        </View>
        <View style={styles.fishCollection}>

        </View>
      </View>);
  }
}


const styles = StyleSheet.create({
  card: {

  },
  fishCollection: {

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
  }
});
