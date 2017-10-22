import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Modal,TouchableHighlight, Alert,Button } from 'react-native';
import { location } from 'expo';
import { StackNavigator } from 'react-navigation';
import { MapView , Location, Permisions } from 'expo';
import { Container, Header, Content, Card, CardItem, Left, Body, Right, Icon, Title } from 'native-base';

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

  goHome() {
    this.props.navigation.navigate('HookScreen')
  }

  render() {
    const item = this.state.item
    return (
      <Container>

        <Content>
          <Card style={{flex: 2, padding: 5, margin: 20, marginTop: 60, marginLeft: 20, marginRight: 20}}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={{ fontSize: 30, color: '#f44336', marginBottom: 10,fontWeight:'bold'}}>Congratulations!</Text>
                  <Text note>Youve got a new coupon!</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source= {require('./img/meat.jpg')} style={{height: 200, width: 290, flex: 1}}/>
                <Text style={{marginTop: 10, border: 1, borderRadius: 4, marginBottom: 5}}>
                  Your personal coupon code
                </Text>
                <View style={{alignItems:'center',flex:1,backgroundColor: '#f7f7f7',fontWeight:'bold'}}>
                  <Text style={{fontSize: 20, marginTop: 10}}>{item.code}</Text>
                </View>
                <Text style={{marginTop: 10}}>
                  A new coupon at {item.title}!
                </Text>
                <Text style={{fontSize: 18, color: '#f44336', marginTop: 10}}>
                  {item.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left/>
            </CardItem>
          </Card>
          <Button
            onPress={()=>this.goHome()}
            title="Back to Home"
            color="#000000"
          />
        </Content>
      </Container>
    );
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
