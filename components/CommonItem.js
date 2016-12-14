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
    TouchableHighlight,
    } from 'react-native';
import GlobalStyle from './GlobalStyle.js';

export default class CommonItem extends Component {

    static get defaultProps(){
        return {
            title:null,
            leftIcon:null,
            rightIcon:'ic_tiaozhuan',
            subtitle:null,
            onClick:null,
            tintColor:GlobalStyle.themeColor
        }
    }

    // ¹¹Ôì
      constructor(props) {
        super(props);
        // ³õÊ¼×´Ì¬
        this.state = {};
      }


    render() {
        return (
            <TouchableHighlight underlayColor='#cfcfcf' activeOpacity={0.8} onPress={() => {this.itemClick()}}>
                <View style={styles.container}>
                    <View style={styles.leftView}>
                        <Image source={{uri:this.props.leftIcon}} style={{width:18,height:18,tintColor:this.props.tintColor}}/>
                        <Text style={{fontSize:16,marginLeft:10,width:GlobalStyle.windowWidth / 3 *2}} numberOfLines={2}>{this.props.title}</Text>
                    </View>
                    {this.renderRightView()}
                </View>
            </TouchableHighlight>
        );
    }

    renderRightView(){
        let rightText = this.props.subtitle != null ? <Text>{this.props.subtitle}</Text> : null;
        let rightIcon = this.props.rightIcon != null ? <Image source={{uri:this.props.rightIcon}} style={{width:20,height:20,marginLeft:10,tintColor:this.props.tintColor}}/> : null;
        return(
            <View style={styles.rightView} >
                {rightText}
                {rightIcon}
            </View>
        );
    }

    itemClick(){
        if (this.props.onClick != null) {
            this.props.onClick();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height:55,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'#efefef',
        borderBottomWidth:0.5,
        backgroundColor:'white'
    },
    leftView:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:12,
    },

    rightView:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:12,
    },
});

