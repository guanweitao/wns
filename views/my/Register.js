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
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
let {width, height} = Dimensions.get('window')

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '你好',
      password: ''
    }
  }
  _login () {
    console.log(123)
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.form}>
            {/* <Text style={styles.formTitle}>用户登录</Text> */}
            <View style={styles.formLogo}>
              <Image
                source={require('../images/h_9.png')}
                style={styles.logo}
                ></Image>
            </View>
            <View style={styles.formItem}>
              <Text style={styles.formViewTitle}>用户名</Text>
              <TextInput placeholder="请输入账号"
                onChangeText={(name) => this.setState({name})}
                style={styles.formInput}
                value={this.state.name}></TextInput>
            </View>
            <View style={styles.formItem}>
              <Text style={styles.formViewTitle}>密码</Text>
              <TextInput placeholder="请输入密码"
                style={styles.formInput}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}></TextInput>
            </View>
            <View style={[styles.formItem,{position: 'relative',height: 20}]}>
              <TouchableOpacity style={[styles.go,styles.forgetPwd]}><Text style={styles.fontSize12}>忘记密码</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.go,styles.goRegister]}><Text style={styles.fontSize12}>前往注册</Text></TouchableOpacity>
            </View>
            <View style={styles.formItem}>
              <TouchableOpacity style={styles.submitBtn}><Text style={styles.submitText}>登录</Text></TouchableOpacity>
            </View>
          </View>
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
    width: width,
    padding: 50,
    borderRadius: 4,
  },
  formLogo: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formItem: {
    marginBottom: 5,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 18,
  },
  formViewTitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 4,
    marginBottom: 10,
    borderColor: '#e2e2e2',
  },
  submitBtn: {
    borderColor: '#38b2ec',
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
    backgroundColor: "#38b2ec",
  },
  submitText: {
    color: '#fff',
  },
  go: {
    position: 'absolute',
    top: 0,
  },
  goRegister: {
    right: 0,
  },
  fontSize12: {
    fontSize: 12,
    color: 'rgba(0,0,0,.5)',
  }
});
