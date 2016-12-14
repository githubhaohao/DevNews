import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Share,
    } from 'react-native';
import GlobalStyle from './GlobalStyle.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CommonItem from './CommonItem.js';
const PARALLAX_HEADER_HEIGHT = GlobalStyle.windowWidth * 4 / 3;
const STICKY_HEADER_HEIGHT = 76;
const GIT_HUB_URL = 'https://github.com/githubhaohao';

class StoryPage extends Component {
    constructor(props) {
        super(props);
        this.story = this.props.news;
        this.state =  {
        };
    }

    getParallaxRenderConfig() {
        let config = {};
        let title = this.story.results.休息视频 ?  this.story.results.休息视频[0].desc : 'Gank.io GithubHaohao';
        let imgSrc = (typeof this.story.results.福利[0].url !== 'undefined') ? {uri:this.story.results.福利[0].url} : require('../images/logo.jpg');
        config.renderBackground = () => (
            <View key='background'>
                <Image source={imgSrc} style={{width:GlobalStyle.windowWidth,height:PARALLAX_HEADER_HEIGHT}}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: GlobalStyle.windowWidth,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );

        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Text style={ styles.sectionSpeakerText }>
                    {`${this.story.date}期`}
                </Text>
                <Text style={ styles.sectionTitleText }>
                    {title}
                </Text>
            </View>
        );

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{`${this.story.date}期`}</Text>
            </View>
        );

        config.renderFixedHeader = () => (
            <View key='fixed-header' style={styles.fixedSection}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.props.navigator.pop()}
                    style={styles.backWrapper}
                    >
                    <View style={styles.backIcon}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{alignItems:'center',justifyContent:'center'}}
                    onPress={() => {this.shareMessage(title)}}
                    >
                    <Image source={require('../images/ic_share.png')} style={{width:24,height:24,marginRight:8,tintColor:'white'}}/>
                </TouchableOpacity>
            </View>
        );
        return config;
    }

    render() {
        let renderConfig = this.getParallaxRenderConfig();
        return (
            <ParallaxScrollView
                contentBackgroundColor='#efefef'
                backgroundColor={GlobalStyle.themeColor}
                headerBackgroundColor="#333"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}
                {...renderConfig}
                >
                {this.getChildViews(this.story)}
            </ParallaxScrollView>
        );
    }

    shareMessage(title) {
        Share.share({
            title:'Developer News',
            message:title,
        }).then(result => {})
            .catch((error) => {this.toast.show(error.toString())});
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
            //console.log('[item]',item);item._id
            child.push(
                <TouchableOpacity
                    activeOpacity={0.3}
                    onPress={() => {
                    this.props.navigator.push({
                        name:'detail',
                        url:item.url,
                        title:item.desc,
                        id:item._id,
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
        color:GlobalStyle.themeColor,
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: GlobalStyle.windowWidth,
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5,
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        paddingTop: 20,
        alignItems: 'center',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
    },

    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    backIcon: {
        width: 14,
        height: 14,
        marginLeft: 12,
        borderLeftWidth: 2.5,
        borderBottomWidth: 2.5,
        transform: [{rotate: '45deg'}],
        borderColor:'white',
    },
    backWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height:66,
    },
});

export default StoryPage;