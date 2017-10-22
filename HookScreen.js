import React from 'react';
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

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
  render() {
    return (
      <Container style={{marginHorizontal: 10}}> 
        <View >
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                
                    <Body>
                      <Text>TEST</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                 
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>TEST</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}