/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image
} from 'react-native';

export default class Choice extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text>精选</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  form: {
    backgroundColor: 'red',
    padding: 50,
    borderRadius: 4,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 4,
    marginBottom: 10,
    borderColor: '#000',
  }
});
