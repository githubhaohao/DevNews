/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    Dimensions,
    } from 'react-native';
const {width,height,scale} = Dimensions.get('window');
const GiftedListView = require('react-native-gifted-listview');
import NavigationBar from 'react-native-navigationbar';
import StorageUtil from '../utils/StorageUtil.js'
import GlobalStyle from './GlobalStyle.js';
import CommonItem from './CommonItem.js';
const storageUtil = new StorageUtil();

export default class Favorite extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            hasFavorite:true,
        };
      }

    render() {
        let content = this.state.hasFavorite ?
            (
                <GiftedListView
                    rowView={(rowData) => this.renderItem(rowData)}
                    withSections={false} // enable sections
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1, backgroundColor: 'white'}}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={false} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    onFetch={this.onFetch.bind(this)}
                    refreshableColors={['#00a2ed','green']}
                    />
            ) :
            (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'gray'}}>------暂无收藏------</Text>
                </View>
            );
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='我的收藏'
                    backHidden={false}
                    backColor='white'
                    backIcon={true}
                    barTintColor='#00a2ed'
                    titleColor='white'
                    backFunc={
                        () => {this.props.navigator.pop()}
                    }
                    />
                {content}
            </View>
        )
    }

    renderRow(rowData){
        return (
            <TouchableNativeFeedback style={{height:56}} onPress={() =>{this.navigateToNewsDetail(rowData)}} background={TouchableNativeFeedback.Ripple(GlobalStyle.themeColor,false)}>
                <View style={styles.listItemView}>
                    <Image source={{uri:'star_red'}} style={{width:18,height:18,tintColor:GlobalStyle.themeColor}}/>
                    <Text style={{fontSize:16,marginLeft:10,color:'#444',marginRight:10}} numberOfLines={2}>{rowData.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );

    }

    renderItem(rowData){

        return <CommonItem title={rowData.title} leftIcon='star_red' onClick={() => {this.navigateToNewsDetail(rowData)}}/>

    }

    onFetch(page = 1,callBack,options){
        if (page == 1) {
            storageUtil.getAllItemsFromStorage()
              .then((data) => {
                    if (data) {
                        console.log('[Favorite]',data);
                        callBack(data);
                    } else {
                        this.setState({
                            hasFavorite:false,
                        });
                    }
                })
        }
    }

    navigateToNewsDetail(rowData){
        this.props.navigator.push({
            name:'detail',
            url:rowData.url,
            title:rowData.title,
            id:rowData.id,
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItemView:{
        height:56,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderColor:GlobalStyle.themeColor,
    },

});

