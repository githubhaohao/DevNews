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
    ToolbarAndroid,
    StatusBar,
    } from 'react-native';
import NavigationBar from 'react-native-navigationbar';

export default class NewsDetail extends Component {
    render() {
        console.log(this.props.url);
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.title}
                    backHidden={false}
                    backColor='white'
                    backIcon={true}
                    barTintColor='#444'
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
            </View>
        );
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

});

