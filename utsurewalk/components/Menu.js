'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Image
} from 'react-native'

import Text from './form/Text'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from './../resources/styles/colors'

let SideMenuWidth = 300
class Menu extends Component {

    render() {
        return (
            <View style={[styles.sideMenu, this.props.style || {}]}>

                  <View style={{ paddingHorizontal: 30 }}>
                        { this._renderHeader() }
                      <TouchableOpacity style={[ styles.menu, { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5} ]}>
                            <Icon name='home' color={colors.txtWhite} size={24} />
                            <Text style={styles.menuText} type='h5White'>Home</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.menu }>
                            <Icon name='user-o' color={colors.txtWhite} size={24} />
                            <Text style={styles.menuText} type='h5White'>Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.menu }>
                            <Icon name='cog' color={colors.txtWhite} size={24} />
                            <Text style={styles.menuText} type='h5White'>Settings</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.menu }>
                            <Icon name='comment-o' color={colors.txtWhite} size={24} />
                            <Text style={styles.menuText} type='h5White'>Home</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.menu }>
                            <Icon name='bell-o' color={colors.txtWhite} size={24} />
                            <Text style={styles.menuText} type='h5White'>Notification</Text>
                      </TouchableOpacity>
                  </View>
            </View>
        )
    }

    _renderHeader() {
        return (
            <View style={ styles.header }>
                <View style={ styles.userInfosHolder }>
                    <View style={ styles.userInfos }>
                        <Text type='h1White' style={ styles.username }>Username</Text>
                        <Text type='h5White'>View and edit profile</Text>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: SideMenuWidth,
        backgroundColor: 'transparent'
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuText: {
        marginLeft: 20
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userInfos: {
        height: 50,
        justifyContent: 'center'
    },
    username: {
        fontWeight: '700'
    }
})

module.exports = Menu