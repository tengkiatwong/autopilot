import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Modal,TouchableHighlight, Alert } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';
import { MapView , Location, Permisions } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'


export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      categories: null,
      fishes: null,
      isReady: false,
      shops: {},
      latitude: 0,
      longitude: 0,
      modalVisible: false,
      message: "Move closer to the pond...",
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

  componentDidMount() {
    return fetch('http://f1915ff1.ngrok.io/fishes')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('TESTT DATA MAP' , responseJson);
        this.setState({
          shops: responseJson
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setModalVisible(visible) {
    // this.setState({modalVisible: visible});
    Alert.alert(
  'You are right by a pond!',
  'Are you ready?',
  [
    {text: 'Lets go!', onPress: () => (this.props.navigation.navigate('AugmentedScreen'),{selectedItem: {
      title: "Ruth's Chris Steak House",
      code: "PlZ73aMeL3",
      description: "Thank you for shopping with us regularly, 30% off your purchase of $100 or more today",
    }})},

  ],
  { cancelable: false }
)
    navigator.geolocation.clearWatch();
    this.setState({
      latitude: 36.1230297,
      longitude: -115.1723804,
      error: null,
    });
    this.setState({message:"You're here!"})
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

  async componentWillMount() {
    Expo.Font.loadAsync({
     Roboto: require("native-base/Fonts/Roboto.ttf"),
     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
   });

   this.setState({ isReady: true });
   this.setState({categories: this.props.navigation.state.params.categories})

   fetch('http://f1915ff1.ngrok.io/fishes')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         fishes: responseJson
       }, function() {

       });
       var myshops = [];
       var dataSet = responseJson.fishes
       for(var fishIndex in dataSet) {
         if(dataSet[fishIndex].category === "restaurant")
          myshops.push(dataSet[fishIndex])
       }
       Reactotron.log(myshops)
       this.setState({shops:myshops})
     })
     .catch((error) => {
       console.error(error);
     });


  }

  componentDidMount() {
    this.getCurrPosition();
  }


  render() {
    const shops = this.state.shops;
    if (this.state.isReady === true ) {
      return (
        <Container>
          <Header>
            <Body>
              <Title>{this.state.message}</Title>
            </Body>
          </Header>
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
                  key={shop.title}
                  image={require('./img/smallpondnew.png')}
                >
                </MapView.Marker>
              ))}
             </MapView>
          </View>
          <View style={{backgroundColor:"black", padding: 10}}>
            <Text style={styles.fishText}>Fishes in your area</Text>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.fishIcon} source={require('./img/newfish.png')} />
              <Image style={styles.fishIcon} source={require('./img/3.png')} />
              <Image style={styles.fishIcon2} source={require('./img/5.png')} />
              <Image style={styles.fishIcon1} source={require('./img/4.png')} />
              <TouchableOpacity style={styles.goButton} onPress={() => this.setModalVisible(true)}><Text>Go To</Text></TouchableOpacity>
            </View>
          </View>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
        </Container>
      )
    }
    else {
        return null;
    }
  }
}

const styles = StyleSheet.create({
  goButton: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fishIcon: {
    height:40,
    width:60,
    marginRight: 10
  },
  fishIcon1: {
    height:30,
    width:60,
    marginRight: 10
  },
  fishIcon2: {
    height:30,
    width:60,
    marginRight: 10
  },
  fishText: {
    paddingLeft: 10,
    fontSize: 18,
    paddingTop:5,
    paddingBottom: 10,
    color: 'white'
  }
});
