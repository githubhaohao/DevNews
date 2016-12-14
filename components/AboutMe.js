import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Share,
    Platform,
    } from 'react-native';
import GlobalStyle from './GlobalStyle.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CommonItem from './CommonItem.js';
const PARALLAX_HEADER_HEIGHT = GlobalStyle.windowWidth;
const STICKY_HEADER_HEIGHT = 76;
const GIT_HUB_URL = 'https://github.com/githubhaohao';
import Toast from 'react-native-easy-toast';

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.toast = null;
        this.state =  {
        };
    }

    getParallaxRenderConfig() {
        let config = {};
        config.renderBackground = () => (
            <View key='background'>
                <Image source={require('../images/logo.jpg')} style={{width:PARALLAX_HEADER_HEIGHT,height:PARALLAX_HEADER_HEIGHT}}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: PARALLAX_HEADER_HEIGHT,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );

        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Text style={ styles.sectionSpeakerText }>
                    Developer News
                </Text>
                <Text style={ styles.sectionTitleText }>
                    A react native news app for developer.
                </Text>
            </View>
        );

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>Developer News</Text>
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
                    onPress={() => this.shareMessage()}
                    >
                    <Image source={require('../images/ic_share.png')} style={{width:24,height:24,marginRight:8,tintColor:'white'}}/>
                </TouchableOpacity>
            </View>
        );
        return config;
    }

    shareMessage() {
        Share.share({
            title:'Developer News',
            message:'A react native news app for developer.',
        }).then(result => {this.onShareResult(result)})
        .catch((error) => {this.toast.show(error.toString())});
    }

    onShareResult(result){
        if (result.action === Share.sharedAction) {
            //this.toast.show('分享成功');
        } else if (result.action === Share.dismissedAction) {
            this.toast.show('取消分享');
        }
    }

    render() {
        let renderConfig = this.getParallaxRenderConfig();
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    contentBackgroundColor='#efefef'
                    backgroundColor={GlobalStyle.themeColor}
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                    parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                    backgroundSpeed={10}
                    {...renderConfig}
                    >
                    <CommonItem title='Website' leftIcon='ic_computer' onClick={() => {this.props.navigator.push({
                    name:'detail',
                    url:GIT_HUB_URL,
                    title:'Github haohao',
                    id:'haohao',
                });}}/>
                    <CommonItem title='Author' leftIcon='ic_insert_emoticon'/>
                    <CommonItem title='Feedback' leftIcon='ic_feedback'/>

                </ParallaxScrollView>
                <Toast ref={e =>this.toast = e}/>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: GlobalStyle.windowWidth / 5 * 3,
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

export default AboutMe;