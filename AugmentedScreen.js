import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import {Camera} from 'expo'

import { StackNavigator } from 'react-navigation';
import './ReactotronConfig';
import Reactotron from 'reactotron-react-native'

import RNShakeEventIOS from 'react-native-shake-event-ios';

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
    //Reactotron.log(this.props.navigation.state.params.selectedItem)
    //this.setState({selectedItem: this.props.navigation.state.params.selectedItem})
    RNShakeEventIOS.addEventListener('shake', () => {
      Reactotron.log("SHAKKKKEEEEEEE");
    })
  }

  componentWillUnmount() {
    RNShakeEventIOS.removeEventListener('shake');
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
