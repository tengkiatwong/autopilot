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
    this.state= {categories: ''}
  }
  componentDidMount() {
    return fetch('http://f1915ff1.ngrok.io/categories')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('TESTT DATA' , responseJson)
        this.setState({
          categories  : responseJson
        }, function() {
          // Reactotron.tron(responseJson)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container style={{marginHorizontal: 10}}>
        <View >
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem cardBody>
                  <Left>
                    <Body>
                      <Text>Dining</Text>
                      <Image style={{ height: 300, alignItems:'center' }} source={require('./img/hook1.png')} />
                      <Text note>Fish hook to catch amazing dining deals</Text>
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
