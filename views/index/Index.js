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
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
let {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Iconfont'
import Swiper from 'react-native-swiper'
import axios from 'axios'
import My from '../my/My'
const isIOS = Platform.OS == "ios"

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      topList: [],
      scrollY: new Animated.Value(0)
    }
  }
  componentDidMount() {
    axios.get('http://api.dataoke.com/index.php?r=Port/index&type=total&appkey=ac78ea7fb4&v=2&page=1')
    .then((res) => {
      this.setState({topList: res.data.result})
    })
  }
  _renderTypes(obj){
    const w = width/4, h = w*.6 + 20
    const imgLocalUrl = '../images/h_9.png'
    let renderSwipeView = (types, n) => {
      return (
        <View style={styles.typesView}>
          {
            types.map((item, i) => {
              let render = (
                <View style={[{width: w, height: h}, styles.typesItem]}>
                  <Image source={require('../images/h_9.png')} style={{width: w*.5, height: w*.5}}></Image>
                  <Text style={{fontSize: 12, color:"#666"}}>{item}</Text>
                </View>
              )
              return (
                isIOS?(
                  <TouchableHighlight style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableHighlight>
                ):(
                  <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                )
              )
            })
          }
        </View>
      )
    }
    return (
      <Swiper
        height={h*2.4}
        autoplay={true}
        paginationStyle={{ bottom: 10 }}
        dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
        activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}>
        {renderSwipeView(['男装','甜品饮品','商店超市','预定早餐','果蔬生鲜','新店特惠','准时达','高铁订餐'], 0)}
        {renderSwipeView(['土豪推荐','鲜花蛋糕','汉堡炸鸡','日韩料理','麻辣烫','披萨意面','川湘菜','包子粥店'], 8)}
      </Swiper>
    )
  }

  render() {
    return (
      <View style={styles.index}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <Icon name='fenlei' size={30} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="请搜索你想要的商品"
          />
          <TouchableOpacity style={{backgroundColor: 'red'}}>
                <Icon name="denglu" size={30} color="#666" />
              </TouchableOpacity>
        </View>
        <View style={{height: (width/4*.6+20)*2}}>
          {this._renderTypes('index')}
        </View>
        <ScrollView
        >
          <View style={{flex:1, flexDirection: 'row',width: width, flexWrap: 'wrap'}}>
            { this.state.topList.map((item, i) => {
              return (
                <View
                  style={styles.goodsItem}
                  key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      alert(item.GoodsID)
                      // this.props.navigator.push({
                      //     component: My,
                      //     args: {}})
                        }
                    >
                    <Text style={styles.quan}>券{item.Quan_price}</Text>
                    <Image source={{uri :item.Pic}} style={{maxWidth:width/2, height: 200}}></Image>
                    <Text style={styles.goodsTitle}>{item.D_title}</Text>
                    <View style={styles.aboutQuan}>
                      <Text style={styles.name}>券后<Text style={styles.quanhou}>￥{item.Price}</Text></Text>
                      <Text style={styles.name}>销量<Text style={styles.quanhou}>{item.Sales_num}</Text></Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }) }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    // width: width,
    // flexDirection: 'row',
    flex: 1,
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
  },
  typesView: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  goodsItem: {
    width: (width-20)/2,
    borderRadius: 3,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    position: 'relative',
  },
  goodsTitle: {
    fontSize: 12,
    color: '#777777',
    height: 13,
    overflow: 'hidden',
  },
  aboutQuan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  quanhou: {
    color: '#ff4b5f',
    fontSize: 14,
    marginRight: 5,
  },
  name: {
    color: '#a3a3a3',
    fontSize: 12,
  },
  quan: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: '#e53563',
    right: 0,
    padding: 1,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: 2,
  }
  // item: {
  //   // flex: 1,
  //   // justifyContent: "center",
  //   // alignItems: "center",
  //   width: width/2,
  // }
});
