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
    WebView,
    Image,
    ToolbarAndroid,
    TouchableOpacity,
    StatusBar,
    ToastAndroid,
    } from 'react-native';
import NavigationBar from 'react-native-navigationbar';
import StorageUtil from '../utils/StorageUtil.js'
const storageUtil = new StorageUtil();

export default class NewsDetail extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            fabBgColor:'red',
            fabIcon:'star_white',
            isFavorite:false,
        };
        this.fabStyle = {tintColor:'red'};
      }

    render() {
        console.log(this.props.url);
        let style = this.state.isFavorite ? this.fabStyle : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.title}
                    backHidden={false}
                    backColor='white'
                    backIcon={true}
                    barTintColor='#00a2ed'
                    titleColor='white'
                    backFunc={
                        () => {this.props.navigator.pop()}
                    }
                    />
                <WebView
                    style={styles.container}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    source={{uri:this.props.url}}
                    />
                <TouchableOpacity style={styles.fabTouchableView} activeOpacity={0.6} onPress={() => {this.onFavorite()}}>
                    <View style={[styles.fabView,{backgroundColor:this.state.fabBgColor}]}>
                        <Image style={[styles.fabImage,style]} source={{uri:this.state.fabIcon}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        console.log('[Id]',this.props.id);
        storageUtil.getItemFromStorage(this.props.id)
          .then((data) => {
                if (data) {
                    this.setState({
                        fabBgColor:'white',
                        fabIcon:'star_red',
                        isFavorite:true,
                    });
                }
            })
    }

    onFavorite(){
        if (this.state.isFavorite) {
            storageUtil.removeItemFromStorage(this.props.id)
              .then((error) => {
                    if (!error) {
                        ToastAndroid.show('取消收藏',ToastAndroid.SHORT);
                        this.setState({
                            fabBgColor:'red',
                            fabIcon:'star_white',
                            isFavorite:false,
                        });
                    }
                });
        } else {
            let item = {'title':this.props.title,'url':this.props.url,'id':this.props.id};
            storageUtil.saveItemToStorage(this.props.id,item)
              .then((error) => {
                    if (!error) {
                        ToastAndroid.show('收藏成功',ToastAndroid.SHORT);
                        this.setState({
                            fabBgColor:'white',
                            fabIcon:'star_red',
                            isFavorite:true,
                        });
                    }
                });
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#444',
        height: 76,
    },
    fabTouchableView:{
        position:'absolute',
        bottom:24,
        right:24,
        width:54,
        height:54,
    },
    fabView:{
        flex:1,
        backgroundColor:'#00a2ed',
        borderRadius:27,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'red',
        borderWidth:0.5,
    },
    fabImage:{
        width:32,
        height:32,
    },

});

