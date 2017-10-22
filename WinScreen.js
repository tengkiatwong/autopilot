import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Modal,TouchableHighlight, Alert } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';
import { MapView , Location, Permisions } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>sidjsidjisjdsid</Text>
      </View>);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
  }
});
