import React from 'react';
import { Container, Button, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { Image } from 'react-native'
import { StackNavigator } from 'react-navigation';

const cards = [
  {
    text: 'Card One',
    name: 'One',
  },
  {
    text: 'Card One',
    name: 'One',
  },
];





export default class HookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state= {categories: null}
  }
  componentDidMount() {
    return fetch('http://f1915ff1.ngrok.io/categories')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('TESTT DATA' , responseJson)
        this.setState({
          categories  : responseJson.categories
        }, function() {
          // Reactotron.tron(responseJson)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.categories) return null
    const categories = this.state.categories;
    console.log("CATG", categories);
    return (
      <Container style={{marginHorizontal: 10}}>
        <View style={{marginTop: 60}}>
        <DeckSwiper
          dataSource={categories.slice(categories.length-4,categories.length)}
          renderItem= {(item,idx) => {
            switch (item.categoryName) {
              case 'Bill Pay':
                categoryImage = require('./img/bank.png');
                break;
              case 'Pets':
                categoryImage = require('./img/pets.png');
                break;
              case 'Travel':
                categoryImage = require('./img/travelling.png');
                break;
              case 'Restaurants':
                categoryImage = require('./img/dining.png');
                break;
            }
            return (
              <Card style={{ elevation: 3, paddingVertical: 10, padding: 20, alignItems: 'center' }} key={idx}>
                <CardItem cardBody style={{ alignItems: 'center'}}>
                    <Body>
                      <Text style={{ fontSize: 35, margin: 10 }}>{item.categoryName}</Text>
                      <Image style = {{ width: 300, height: 250 }} source={categoryImage} />
                      <Text note style={{ margin: 20, fontSize: 20 }}>Fish hook to catch amazing deals for {item.categoryName}.</Text>
                    </Body>
                </CardItem>
                <Button large style={{ marginLeft: 70, marginBottom: 20, backgroundColor: '#f44336'}}
                  onPress = {() => this.props.navigation.navigate('MapScreen',{categories: this.state.categories})}
                >
                <Text>Start Fishing!</Text>
              </Button>
              </Card>
            );
          }
          }
        />
        </View>
      </Container>
    );
  }
}
