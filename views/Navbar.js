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
  View
} from 'react-native';
import Index from './index/Index'
import Jiu from './jiu/Jiu'
import My from './my/My'
import Choice from './choice/Choice'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Iconfont'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: '今日特卖'
    }
    this.items = [
      [ '今日特卖', 'jinritemai', <Index {...this.props} /> ],
      [ '九块九', 'jiukuaijiu', <Jiu {...this.props} /> ],
      [ '精选', 'jingxuan', <Choice /> ],
      [ '个人中心', 'yonghuzhongxin', <My /> ]
    ]
    // this.Icons = [&#xe634,&#xe634,&#xe634,&#xe634]
  }
  render() {
    return (
        <TabNavigator
          hidesTabTouch={true}
          >
          {
            this.items.map((item, i) => {
              return (
                <TabNavigator.Item
                      key={i}
                      title={item[0]}
                      titleStyle={{fontSize: 13}}
                      renderIcon={() => <Icon name={item[1]} size={22} color="#666" />}
                      renderSelectedIcon={() => <Icon name={item[1]} size={22} color="red" />}
                      selected={this.state.currentTab === item[0]}
                      selectedTitleStyle={{color: "red",fontSize: 13}}
                      onPress={() => this.setState({ currentTab: item[0] })}
                      style={{height: 100,backgroundColor: 'red'}}
                      >
                        {item[2]}
                  </TabNavigator.Item>
              )
            })
          }
        </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({

});
