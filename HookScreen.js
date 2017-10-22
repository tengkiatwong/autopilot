import React from 'react';
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { StyleSheet, TouchableOpacity, Image,Modal,TouchableHighlight, Alert } from 'react-native';

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

                <CardItem cardBody>
                  <Left>
                    <Body>
                      <Text>Dining</Text>
                      <Image style={{ height: 300, flex: 1 }} source={'./img/hook1.png'} />
                      <Text note>Fish hook to catch amazing dining deals</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Left>
                    <Body>
                      <Text>Sportswear</Text>
                      <Image style={{ height: 300, flex: 1 }} source={'./img/hook2.png'} />
                      <Text note>Fish hook to catch amazing dining deals</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Left>
                    <Body>
                      <Text>Formal Apparel</Text>
                      <Image style={{ height: 300, flex: 1 }} source={'./img/hook3'} />
                      <Text note>Fish hook to catch amazing dining deals</Text>
                    </Body>
                  </Left>
                </CardItem>

              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}
