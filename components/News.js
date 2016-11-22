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
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar,
    } from 'react-native';
import NavigationBar from 'react-native-navigationbar';
const COVER_HEIGHT = 400;
export default class News extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            opacity:0,
        };
      }

    render() {
        let newsData = this.props.news;
        let imgSrc = (typeof newsData.results.福利[0].url !== 'undefined') ? {uri:newsData.results.福利[0].url} : require('../images/logo.jpg');
        let header = (
            <NavigationBar
                title={`${newsData.date}期`}
                backHidden={false}
                backColor='white'
                backIcon={true}
                barTintColor='transparent'
                barOpacity= {this.state.opacity}
                barStyle={styles.navigationBar}
                backFunc={() => {
                    this.props.navigator.pop();
                }}/>
        );

        return (
            <View style={styles.container}>
                <ScrollView
                    onScroll={this.onScroll.bind(this)}
                    scrollEventThrottle={5}
                    bounces={false}>
                    <Image style={{height:COVER_HEIGHT}} source={imgSrc}/>
                        {this.getChildViews(newsData)}
                </ScrollView>
                {/*<View style={[styles.backIcon,{opacity:this.state.opacity}]}/>*/}
                <View style={[styles.titleView,{opacity:this.state.opacity}]}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this.props.navigator.pop()}
                        style={styles.backWrapper}
                        >
                        <View style={styles.backIcon}></View>
                    </TouchableOpacity>

                    <Text style={styles.title}>{`${newsData.date}期`}</Text>
                    <View style={[styles.backIcon,{opacity:0}]}></View>
                </View>

            </View>
        );
    }

    onScroll(event){
        const MAX = COVER_HEIGHT - 64;
        let y = event.nativeEvent.contentOffset.y;
        if(y > MAX){
            y = MAX;
        }
        let opacity = y / MAX;
        this.setState({
            opacity:opacity,
        });

    }

    getChildViews(newsData){
        console.log(newsData);
        let views = [];
        for(let i = 0;i<newsData.category.length;i++){
            views.push(<View key={i} style={styles.childView}>
                <Text style={styles.childTitle}>{newsData.category[i]}</Text>
                {this.getItems(newsData,newsData.category[i])}
            </View>)
        }
        return views;

    }

    getItems(newsData,category){
        let child = [];
        let data = newsData.results[category];
        for(let i = 0;i<data.length;i++){
            let item = data[i];
            child.push(
            <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => {
                    this.props.navigator.push({
                        name:'detail',
                        url:item.url,
                        title:item.desc,
                    });
                }}
                style={styles.itemView} key={i}>
                <Text style={styles.itemTitle}><Text style={{fontSize:14,color:'red'}}>&hearts;</Text> {item.desc} ( {item.who} )</Text>
            </TouchableOpacity>);
        }
        return child;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    contentView:{
        flex:1,
    },

    childView:{
        backgroundColor:'white',
        margin:8,
        padding:15,
        borderRadius:3,
        flex:1,
    },
    childTitle:{
        fontSize:18,
        color:'orange',
    },

    itemView:{
        marginTop:10,
    },
    itemTitle:{
        fontSize:14,
        marginLeft:15,
        color:'blue',
    },
    navigationBar:{
        top:0,
        left:0,
        position:'absolute',
        backgroundColor:'transparent',
    },
    tintBackIcon:{
        width:14,
        height:14,
        borderColor:'#444',
        borderLeftWidth:2,
        borderBottomWidth:2,
        transform:[{rotate:'45deg'}],
        backgroundColor:'transparent',

    },

    tintBack:{
        position:'absolute',
        top:33.9,
        left:14.5,
        width:16,
        height:16,
    },
    title:{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
    },

    titleView:{
        top:0,
        right:0,
        position:'absolute',
        left:0,
        top:0,
        height:76,
        paddingTop:20,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#444',
        flexDirection:'row',
    },
    backIcon: {
        width: 14,
        height: 14,
        marginLeft: 12,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        transform: [{rotate: '45deg'}],
        borderColor:'white',
    },
    backWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height:66,
    },

});
