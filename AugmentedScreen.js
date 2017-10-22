import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import {Camera} from 'expo'

import { StackNavigator } from 'react-navigation';
import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'

import RNShakeEvent from 'react-native-shake-event';
import TimerMixin from 'react-timer-mixin';

export default class AugmentedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.rotation = 'forward';
    this.state={
      hasCameraPermission: null,
      selectedItem: null,
      type: Camera.Constants.Type.back,
    }
  }

  componentWillMount() {
    let obj = this;
    setTimeout(
      () => { this.props.navigation.navigate('WinScreen')},
      10000
    );

    RNShakeEvent.addEventListener('shake', () => {
      console.log("SHAKKKKEEEEEEE");
      this.props.navigation.navigator('WinScreen');
    })
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  changeToWin() {
    Reactotron.log("NABIIAGTEEDD");
    this.props.navigation.navigate('WinScreen');
  }

  render() {
    return (
      <Expo.GLView
        ref={(ref) => this._glView = ref
        }
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }


  getRotation (y) {
    if (y >= 0.40 && this.rotation == 'forward')
      this.rotation = 'backward'
    else if (y <= -0.20 && this.rotation == 'backward') {
      this.rotation = 'forward'
    }
  }

  // This is called by the Expo.GLView once it's initialized
  _onGLContextCreate = async (gl) => {
    const arSession = await this._glView.startARSessionAsync();
    // Based on https://threejs.org/docs/#manual/introduction/Creating-a-scene
    // In this case we instead use a texture for the material (because textures
    // are cool!). All differences from the normal THREE.js example are
    // indicated with a NOTE: comment.

    const scene = new THREE.Scene();

    // NOTE: How to create an `Expo.GLView`-compatible THREE renderer
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new THREE.PlaneBufferGeometry(30, 15, 2, 1);

    const material = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('./img/5.png')),
        transparent: true
      }),
      transparent: true
    });

   /* const material = new THREE.MeshBasicMaterial({
      // NOTE: How to create an Expo-compatible THREE texture
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('./assets/fish-texture.png')),
        transparent: true
      }),
    });*/

    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.40,
      3000
    );

    const fish = new THREE.Mesh(geometry, material);
    scene.add(fish);
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    fish.position.z = -100.0
    //camera.position.z = 55;

    const render = () => {
      requestAnimationFrame(render);
      this.getRotation(fish.rotation.y)
      if (this.rotation == 'forward')
        fish.rotation.y += 0.02;
      else {
        fish.rotation.y -= 0.02;
      }
      renderer.render(scene, camera);

      // NOTE: At the end of each frame, notify Expo.GLView with the below
      gl.endFrameEXP();
    }
    render();
  }
}
