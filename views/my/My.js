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
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight
} from 'react-native';
let {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Iconfont'
import axios from 'axios'
import api from '../../api/api'

export default class My extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      password: '',
      repassword: '',
      showNameErr: false,
      showPasswordErr: false,
      showRegisterView: false,
    }
  }
  _login () {
    if (!this.state.name || !this.state.password) {
      Alert.alert('账号或者密码不能为空')
      return
    }
    const form = {
      name: this.state.name,
      password: this.state.password
    }
    api.axiosPost('/login', form)
    .then((res) => {
      if (res.data.status_code != 200) {
        Alert.alert(res.data.data)
        return
      }
      api.userInfo = res.data.data
      api.token = res.data.token
      this.setState({showModalVisible: true})
    })
  }
  setModalVisible(visible) {
    this.setState({showLoginModalVisible: visible});
  }
  _register () {
    if (!this.state.name || !this.state.password) {
      Alert.alert('账号或者密码不能为空')
      return
    }
    if (this.state.password != this.state.repassword) {
      Alert.alert('两次密码不一致')
      return
    }
    axios.post('/register', {name: this.state.name, password: this.state.password})
    .then((res) => {
      if (res.data.status_code == 200) {
        this.setState({showRegisterView: false})
      } else {
        Alert.alert(res.data.data)
      }
    })
  }
  _exit () {
    api.token = ''
    api.userInfo = ''
  }
  render() {
    return (
        <View style={api.token ? null : styles.container}>

          {/* 个人中心 */}
          {
            api.token ?
            <View style={[styles.userCenter]}>
              <View style={styles.userCenterItem}>
                  <View style={{flexDirection: 'row',borderBottomWidth:1,borderBottomColor:"#000",height:height/3}}>
                    <View style={{width: width/2,justifyContent:'center',alignItems:'center'}}>
                      <Image
                        source={require('../images/h_9.png')}
                        style={styles.logo}
                        ></Image>
                    </View>
                    <View style={[{width: width/2},{justifyContent: 'center'}]}>
                      <Text style={styles.userCenterName}>用户名{api.userInfo ? `:`+api.userInfo.name : null}</Text>
                      <Text style={styles.userCenterName}>余额{api.userInfo ? `:`+api.userInfo.money : null}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row',flexWrap: 'wrap',height: height/3}}>
                    {
                      [
                        ['签到', 'qiandao'],
                        ['提现', 'tixian'],
                        ['账户明细', 'zhanghumingxi'],
                        ['找回订单', 'dingdan']
                      ].map((item, i) => {
                        return (
                          <TouchableOpacity
                            key={i}>
                            <View
                              style={[styles.secondItem,{borderRightWidth:i%2==0 ? 1 : 0,borderColor:"#e9e9e9",borderBottomWidth:i == 0 || i == 1 ? 1 : 0}]}>

                              <Icon name={item[1]} size={22} color="#666" />
                              <Text>{item[0]}</Text>
                            </View>
                          </TouchableOpacity>

                        )
                      })
                    }
                  </View>
                  <View style={{height: height/3,justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={this._exit.bind(this)}
                      style={[styles.submitBtn,{width: width-20}]}>
                      <Text style={styles.submitText}>安全退出</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>

          : <View style={styles.form}>
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
                  style={[styles.formInput, {borderColor:this.state.showNameErr ? 'red' : '#e2e2e2' }]}
                  value={this.state.name}
                  onFocus={() => this.setState({showNameErr: false})}
                  ></TextInput>
                  {/* {
                    this.state.showNameErr ? <Text style={styles.errorMsg}>{'账号不正确'}</Text> : null
                  } */}
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formViewTitle}>密码</Text>
                <TextInput placeholder="请输入密码"
                  style={[styles.formInput, {borderColor:this.state.showPasswordErr ? 'red' : '#e2e2e2' }]}
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  onFocus={() => this.setState({showPasswordErr: false})}
                  ></TextInput>
                  {/* {
                    this.state.showPasswordErr ? <Text style={styles.errorMsg}>{'密码不正确'}</Text> : null
                  } */}
              </View>
              {
                this.state.showRegisterView ? <View style={styles.formItem}>
                  <Text style={styles.formViewTitle}>确认密码</Text>
                  <TextInput placeholder="请确认密码"
                    style={[styles.formInput, {borderColor:this.state.showPasswordErr ? 'red' : '#e2e2e2' }]}
                    secureTextEntry={true}
                    onChangeText={(repassword) => this.setState({repassword})}
                    value={this.state.repassword}
                    onFocus={() => this.setState({showPasswordErr: false})}
                    ></TextInput>
                    {
                      this.state.showPasswordErr ? <Text style={styles.errorMsg}>{'密码不正确'}</Text> : null
                    }
                </View> : null
              }
            <View style={[styles.formItem,{position: 'relative',height: 20}]}>
              <TouchableOpacity style={[styles.go,styles.forgetPwd]}><Text style={styles.fontSize12}>忘记密码</Text></TouchableOpacity>
              <TouchableOpacity
                style={[styles.go,styles.goRegister]}
                onPress={() => this.setState({showRegisterView: !this.state.showRegisterView})}
                ><Text style={styles.fontSize12}>{ this.state.showRegisterView ? `前往登录` : `前往注册` }</Text></TouchableOpacity>
            </View>
            <View style={styles.formItem}>
              {
                this.state.showRegisterView ? <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={this._register.bind(this)}>
                  <Text style={styles.submitText}>注册</Text>
                </TouchableOpacity> : <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={this._login.bind(this)}>
                  <Text style={styles.submitText}>登录</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        }
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
    fontSize: 14,
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
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
  },
  userCenter: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCenterItem: {
    width: width,
    // flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCenterName: {
    height: 50,
    lineHeight: 50,
  },
  secondItem: {
    width: width/2,
    height: height/6,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
