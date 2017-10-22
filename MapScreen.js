import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';
import { MapView , Location, Permisions } from 'expo';

import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'


export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      latitude: 0,
      longitude: 0,
      shops: [
        {
          title:"Carlo's bake shop",
          latlng:{latitude:36.1230297,longitude:-115.1723804},
          description: "Freshest bakery in town"
        },
        {
          title:"Johnny Rockets",
          latlng:{latitude:36.1219637,longitude:-115.1683893},
          description: "Western Cuisine in a great setting"
        }
      ]
    }
  }
  static navigationOptions = {
    header: null
  };

  getCurrPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        Reactotron.log(position)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.getCurrPosition();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
           style={{flex: 1}}
           showsUserLocation={true}
           initialRegion={{
             latitude: 36.1212,
             longitude: -115.1697,
             latitudeDelta: 0.01,
             longitudeDelta: 0.01,
           }}

           animateToCoordinates={{coordinates:{latitude: this.state.latitude,longitude: this.state.latitude}}}
         >
         {this.state.shops.map(shop=> (
            <MapView.Marker
              coordinate={shop.latlng}
              title={shop.title}
              description={shop.description}
            />
          ))}
         </MapView>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center'
  },
});
