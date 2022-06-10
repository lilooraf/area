import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'
import ButtonLabel from '../ButtonLabel'
import { StackActions, NavigationActions } from 'react-navigation';
import { isLogged, getEmailCurrentUser } from '../../NET/local_serv_request'

class Home extends React.Component {

    state = {
        email: 'user1'
    }

    constructor(props) {
        super(props)
        this._checkLogged()
        getEmailCurrentUser().then(res => {
            res = res.split('@')[0]
            this.setState({
                email: res
            })
        })
    }

    _checkLogged = async () => {
        let res = await isLogged()
        if (res === false)
            this._goTo("SignIn")
    }

    _goTo = (goTo) => {
        this.props.navigation.navigate(goTo)
    }

    render() {
        return(
            <View>
                <View style={styles.imageContainer}>
                    <Text style={[styles.textImage, styles.title]} >AREA 51</Text>
                    <Image style={styles.img} source={require('../../assets/profile.png')} />
                    <Text style={[styles.textImage, {color: 'red'}]}> @{this.state.email}</Text>
                </View>
                <View style={[styles.separator, styles.spacer]} />
                <ButtonLabel styleTO={styles.decal} text='My profile'      onPress={() => this._goTo("Profile")     } />
                <View style={styles.separator} />
                <ButtonLabel styleTO={styles.decal} text='My routines'      onPress={() => this._goTo("Routine")     } />
                <View style={styles.separator} />
                <ButtonLabel styleTO={styles.decal} text='Add new routine' onPress={() => this._goTo("AddRoutine")  } />
                <View style={styles.separator} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        // backgroundColor: 'blue',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 30,
        marginRight: 30,
    },
    textImage: {
        alignSelf: 'center'
    },
    img: {
        alignSelf:'center',
        width: 128,
        height: 128,
    },
    separator: {
        borderTopColor: '#222',
        borderBottomColor: '#222',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        padding: 5,
        paddingLeft: 0,
        borderTopWidth: 1
    },
    spacer: {
        marginTop: 50,
    },
    decal: {
        marginLeft: 10
    },
    title: {
        fontSize: 30,
        fontFamily: 'serif',
        borderBottomWidth: 2,
        // padding: 10,
        // paddingLeft: 50,
        // paddingRight: 50
    }
})

export default Home