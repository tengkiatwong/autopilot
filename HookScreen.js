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
    console.log("CATG", categories)
    return (
      <Container style={{marginHorizontal: 10}}>
        <View >
        <DeckSwiper
          dataSource={categories.slice(categories.length-4,categories.length)}
          renderItem= {(item,idx) =>
            <Card style={{ elevation: 3, paddingVertical: 10 }} key={idx}>
              <CardItem cardBody>
                <Left>
                  <Body>
                    <Text>{item.categoryName}</Text>
                    <Image style={{ height: 300, alignItems:'center' }} source={require('./img/hook1.png')} />
                    <Text note>Fish hook to catch amazing deals for {item.categoryName}.</Text>
                  </Body>
                </Left>
              </CardItem>
              <Button large
                onPress = {() => this.props.navigation.navigate('MapScreen',{categories: this.state.categories})}
              >
              <Text>Start Fishing!</Text>
            </Button>
            </Card>
          }
        />
        </View>
      </Container>
    );
  }
}
