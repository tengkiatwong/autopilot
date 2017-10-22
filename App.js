import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (<View style={styles.container}>
        <View>
          <Text style={styles.headerText}>What are you looking for today?</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Sportswear</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Dining</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Groceries</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Watches</Text>
        </View>

      </View>);
  }
}

const AutoPilot = StackNavigator({
  Home: { screen: HomeScreen }
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
    borderColor: '#d6d7da'
  }
});
