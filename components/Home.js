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
    Image,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ToolbarAndroid,
    Animated,
    StatusBar,
    ToastAndroid,
    Dimensions,
    ListView,
    } from 'react-native';

import RequestUtil from '../utils/RequestUtil.js';
const requestUtil = new RequestUtil();
const {width,height,scale} = Dimensions.get('window');
const GiftedListView = require('react-native-gifted-listview');
import NavigationBar from 'react-native-navigationbar';
const ITEM_MARGIN = 3;
const ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2;

export default class Home extends Component {

    static get defaultProps(){
        return {

        }
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.pageIndex = 0;
        this.pushData = null;
        this.isGrid = true;
        this.state = ({
            isError:false,
            isLoading:true,
            welcomeEnd:false,
            animatedLogoValue:new Animated.Value(0),
            animatedTitleValue:new Animated.Value(0),
            animatedSubtitleValue:new Animated.Value(0),
            animatedLayoutValue:new Animated.Value(1),
            isGridLayout:true,
            isClear:false,
        });
      }

    async componentDidMount() {
        let timing = Animated.timing;
        Animated.sequence([
            timing(this.state.animatedLogoValue,{
                toValue:1,
                duration:1500,
            }),
            timing(this.state.animatedTitleValue,{
                toValue:1,
                duration:800,
            }),
            timing(this.state.animatedSubtitleValue,{
                toValue:1,
                duration:800,
            })
        ]).start(
            async() => {
                setTimeout(() => {
                    this.hideWelcomeView();
                },0);
            }

        );

        try {
            this.dateArray = (await requestUtil.getDateArray()).results;
            this.newsGroupData = await requestUtil.getStories(this.dateArray.slice(0,10));
            if(typeof this.newsGroupData === 'undefined'){return}

            console.log(this.newsGroupData);

            this.setState({
                isLoading:false,
            });
            setTimeout(() => {
                this.hideWelcomeView();
            },800);

        } catch (error){
            this.setState({
                isError:true,
                isLoading:false,
            });
            ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
        }

    }


    hideWelcomeView(){
        if(!this.state.isLoading) {
            Animated.timing(this.state.animatedLayoutValue,{
                toValue:0,
                duration:1000,
            }).start(() => {
                this.setState({
                    welcomeEnd:true
                });
            });
        }
    }

    showWelcomeView(){
        if(this.state.welcomeEnd){
            return null;
        }
        return (
            <Animated.View style={[styles.welcomeView,{opacity:this.state.animatedLayoutValue}]}>
                <Animated.View
                    style={{
                      opacity: this.state.animatedLogoValue,
                      marginTop: 220,
                      alignItems: 'center',
                      height:100,

                    }}>
                    {/*<Image source={require('../images/logo.jpg')} style={{width:100,height:100}}/>*/}
                    <Animated.Text
                        style={{
                                    color:'white',
                                    fontSize:30,
                                    fontWeight:'bold',
                                    transform: [{
                                      scale: this.state.animatedTitleValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.5]
                                      })
                                    }]
                        }}>Developer News</Animated.Text>
                </Animated.View>
                <Animated.View
                    style={{
                     opacity:this.state.animatedTitleValue,
                     position:'absolute',
                     right:0,
                     left:0,
                     bottom:50,
                    }}>
                    <Animated.Text
                        style={[styles.welcomeTitle,{
                                    transform: [{
                                      translateX: this.state.animatedTitleValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 20]
                                      })
                                    }]
                        }]}>Supported by: Gank.io</Animated.Text>
                </Animated.View>
                <Animated.View
                    style={{
                      opacity:this.state.animatedSubtitleValue,
                      position:'absolute',
                      bottom:30,
                      left:0,
                      right:0,
                    }}>
                    <Animated.Text
                        style={[styles.welcomeSubtitle,{
                                    transform: [{
                                      translateX: this.state.animatedSubtitleValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 20]
                                      })
                                    }]
                        }]}>
                    Copyright &copy; 2015-2016 Haohao All Rights Reserved.</Animated.Text>
                </Animated.View>
            </Animated.View>
        )
    }

    render() {
        let content = null;
        if(this.state.welcomeEnd) {
            content = (<View style={styles.container}>
                <NavigationBar
                    title='Developer News'
                    backColor='white'
                    backIconHidden={true}
                    barTintColor='#444'
                    titleColor='white'
                    />
                {this.renderNewsList()}
            </View>)
        } else {
            content = (
                <View style={styles.container} renderToHardwareTextureAndroid>
                    {this.showWelcomeView()}
                </View>);
        }
        return content;
    }

    async onActionSelected(position){
        //if(position == 0) {
        //    this.pageIndex = 0;
        //    await this.setState({
        //        isGridLayout:false,
        //    });
        //    await this.onFetch(true,1,this.pushData);
        //    this.onFetch(false,1,this.pushData);
        //} else {
        //    this.pageIndex = 0;
        //    await this.setState({
        //        isGridLayout:true,
        //    });
        //    await this.onFetch(true,1,this.pushData);
        //    this.onFetch(false,1,this.pushData);
        //}
    }

    renderNewsList(){
        let style = this.state.isGridLayout ? styles.listView : styles.listViewColumn;
        return (
            <GiftedListView
                rowView={(rowData) => this.renderRow(rowData)}
                onFetch={this.onFetch.bind(this,false)}
                firstLoader={true} // display a loader for the first fetching
                pagination={true} // enable infinite scrolling using touch to load more
                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                withSections={false} // enable sections
                enableEmptySections={true}
                showsVerticalScrollIndicator={false}
                customStyles={{
                   paginationView: {
                   backgroundColor: 'white',
                   },
                   }}
                refreshableTintColor="blue"
                contentContainerStyle={style}
                refreshableColors={['red','green']}
                />
        );

    }

    async onFetch(isClear,page = 1,callback,options){
        this.pushData = callback;
        if (page == 1) {
            this.pageIndex = 0;
            if(isClear) {
                callback([]);
            } else {
                callback(this.newsGroupData);
            }

        } else {
            try {
              this.pageIndex += 10;
                let dateArg = this.dateArray.slice(this.pageIndex,this.pageIndex + 10);
                let loadMoreData = await requestUtil.getStories(dateArg);
                if(typeof this.newsGroupData === 'undefined'){
                    ToastAndroid.show("没有更多数据可加载了...",ToastAndroid.SHORT);
                } else {
                    callback(loadMoreData);
                }

            } catch (error) {
                ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
            }
        }
    }

    renderRow(rowData){
        let title = rowData.results.休息视频 ? rowData.results.休息视频[0].desc : 'Gank.io GithubHaohao';
        let date = rowData.date ? rowData.date : '1991-10-05';
        let img = rowData.results.福利? {uri:rowData.results.福利[0].url} :require('../images/logo.jpg');
        if(this.state.isGridLayout && this.isGrid){
            return (
                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.navigateToNews(rowData)}} style={styles.listItemView}>
                    <View style={{width:ITEM_WIDTH,height:ITEM_WIDTH + 60}}>
                        <Image style={{width:ITEM_WIDTH,height:ITEM_WIDTH}} source={img}/>
                        <View style={styles.listItemTitleView}>
                            <Text numberOfLines={2} style={styles.listItemTitleText}>{title}</Text>
                            <View style={styles.listItemSubtitleView}>
                                <Text style={{color:'red'}}>{date}</Text>
                                <Text style={{color:'orange'}}>&bull;&bull;&bull;</Text>
                            </View>
                            <Text></Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );

        } else {
            return (
                <TouchableOpacity activeOpacity={0.5} style={{height:width/3+2}}>
                    <View style={styles.listViewColumnItem}>
                        <Image style={{width:width/3,height:width/3,margin:1}} source={{uri:rowData.results.福利[0].url}}/>
                        <View style={styles.listViewColumnItemRightView}>
                            <Text numberOfLines={3} style={{fontSize:16,flex:5,}}>{title}</Text>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{color:'red'}}>{rowData.date}</Text>
                                <Text style={{color:'orange'}}>&bull;&bull;&bull;</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    renderGridItemView(rowData){
        let title = rowData.results.休息视频 ? rowData.results.休息视频[0].desc : 'Gank.io GithubHaohao';
        let date = rowData.date ? rowData.date : '1991-10-05';
        let img = rowData.results.福利? {uri:rowData.results.福利[0].url} :require('../images/logo.jpg');
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={styles.listItemView}>
                <View style={{width:ITEM_WIDTH,height:ITEM_WIDTH + 60}}>
                    <Image style={{width:ITEM_WIDTH,height:ITEM_WIDTH}} source={img}/>
                    <View style={styles.listItemTitleView}>
                        <Text numberOfLines={2} style={styles.titleText}>{title}</Text>
                        <View style={styles.listItemSubtitleView}>
                            <Text style={{color:'red'}}>{date}</Text>
                            <Text style={{color:'orange'}}>&bull;&bull;&bull;</Text>
                        </View>
                        <Text></Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }

    renderListItemView(rowData){
        let title = rowData.results.休息视频 ? rowData.results.休息视频[0].desc : 'Gank.io GithubHaohao';
        return (
            <TouchableOpacity activeOpacity={0.5} style={{height:width/3+2}}>
                <View style={styles.listViewColumnItem}>
                    <Image style={{width:width/3,height:width/3,margin:1}} source={{uri:rowData.results.福利[0].url}}/>
                    <View style={styles.listViewColumnItemRightView}>
                        <Text numberOfLines={2} style={{color:'black',fontSize:16,fontWeight:'bold',flex:4,}}>{title}</Text>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{color:'red'}}>{rowData.date}</Text>
                            <Text style={{color:'orange'}}>&bull;&bull;&bull;</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    navigateToNews(news){
        this.props.navigator.push({
            name:'news',
            news:news,
        });

    }

}
//this.state.*不能在这里面使用，在类Home才能使用。
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black',
    },
    welcomeView:{
        flex:1,
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        top:0,
        backgroundColor:'black',
    },
    welcomeTitle:{
        color:'#aaaaaa',
        fontSize:15,
    },
    welcomeSubtitle:{
        color:'#aaaaaa',
        fontSize:15,
    },
    toolbar: {
        backgroundColor: '#444',
        height: 56,
    },
    headerView:{
        flex:5,
    },
    middleView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#444',
        marginTop:10,
    },
    bottomView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#444',
        marginTop:10,
    },
    headerTitle:{
        position:'absolute',
        bottom:0,
        width:width,
        height:56,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#55333333',
    },
    content:{
        flex:1,
    },

    subtitle:{
        color:'white',
        fontWeight:'bold',
        fontSize:16,
    },
    listView:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:width,
        backgroundColor:'white',
    },
    listViewColumn:{
        width:width,
        backgroundColor:'white',
    },
    listViewColumnItem:{
        height:width / 3 +2,
        flexDirection:'row',
    },
    listViewColumnItemRightView:{
        width:width - 2 - width/3,
        padding:10,
        borderBottomWidth:0.3,
        borderBottomColor:'#cfcfcf',
    },
    listItemView:{
        width:ITEM_WIDTH,
        height:ITEM_WIDTH + 66,
        marginLeft:ITEM_MARGIN,
        marginTop:ITEM_MARGIN,
    },
    listItemTitleView:{
        height:66,
        backgroundColor:'#efefef',
        paddingTop:3,
        paddingBottom:3,
    },
    listItemTitleText:{
        fontSize:16,
        flex:4,
        paddingLeft:5,
        paddingRight:5,
    },
    listItemSubtitleView:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:5,
        paddingRight:5,

    },
});

