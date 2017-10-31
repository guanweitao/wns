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
  Dimensions,
  TouchableOpacity
} from 'react-native';
let {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Iconfont'

export default class Index extends Component {
  _onPressButton() {
    fetch('http://api.dataoke.com/index.php?r=Port/index&type=total&appkey=ac78ea7fb4&v=2&page=1')
    .then((res) => {
      console.log(res.data.result);
    })
   }
  render() {
    return (
      <View style={styles.index}>
        <Icon name='fenlei' size={30} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="请搜索你想要的商品"
        />
        <TouchableOpacity onPress={this._onPressButton} >
              <Icon name="denglu" size={30} color="#666" />
            </TouchableOpacity>
        {/* <Icon.Button name='denglu' size={30} color="#666" onPress={alert(123)} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    height: 30,
    borderColor: '#eee',
    borderWidth:1,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingLeft: 10,
    width: width-70,
    fontSize: 14,
  }
});
