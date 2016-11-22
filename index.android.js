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
    Navigator,
    BackAndroid,
    ToastAndroid,
    StatusBar,
    } from 'react-native';
import Home from './components/Home.js';
import News from './components/News.js';
import NewsDetail from './components/NewsDetail.js';
var navigator,lastBackPress;
export default class DevNews extends Component {
    render() {
        let initialRoute = {name:'home'};
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='transparent'
                    translucent/>
                <Navigator
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                    renderScene={(route, navigationOperations, onComponentRef) => this.routeMapper(route, navigationOperations, onComponentRef)}
                    >
                </Navigator>
            </View>
        );
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.backListener.bind(this));
    }

    backListener(){
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        } else if (lastBackPress && lastBackPress + 2000 > Date.now()) {
            return false;
        } else {
            lastBackPress = Date.now();
            ToastAndroid.show('在按一次退出DevNews',ToastAndroid.SHORT);
            return true;
        }
    }

    componentWillUnMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.backListener.bind(this));
    }

    routeMapper(route, navigationOperations, onComponentRef){
        navigator = navigationOperations;
        if(route.name == 'home'){
            return (
                <Home navigator={navigationOperations}/>
            )
        } else if (route.name == 'news') {
            return (
                <News
                    navigator={navigationOperations}
                    news={route.news}/>
            )
        } else if (route.name == 'detail') {
            return (
                <NewsDetail
                    navigator={navigationOperations}
                    url={route.url}
                    title={route.title}
                    />
            );

        }
        //} else if (route.name == 'favorite') {
        //    return (
        //        <FavoriteStoryView navigator={navigationOperations}/>
        //    )
        //}
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


AppRegistry.registerComponent('DevNews', () => DevNews);
