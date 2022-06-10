import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, Button, Image, ActivityIndicator } from 'react-native'
import { isLogged, login } from '../../NET/local_serv_request'
import {removeChar} from '../tools'

const hashPwd = (str) => {
    return str.split('').reduce((prevHash, currHash) => (((prevHash << 5) - prevHash) + currHash.charCodeAt(0)) |0, 0)
}

class SignIn extends React.Component {

    state = {
        err: false,
        error: [],
        isLoading: false
    }

    _checkLogged = async () => {
        let res = await isLogged()
        console.log('isLogged:', res);
        if (res === true) {
            this._goTo("Home")
            return true
        }
        return false
    }

    errorStyle() {
        return (this.state.err === true) ?
        {backgroundColor: 'red'} :
        {}
    }

    _goTo = (goTo) => {
        this.props.navigation.navigate(goTo)
    }

    constructor(props){
        super(props)
        if (isLogged() === true)
            this._goTo("Home")
        this.hashed_password = ''
        this.email_addr = ''
    }

    _changeText = (field, e) => {
        if (field == "e-mail") 
            this.email_addr = e
        if (field == "password")
            this.hashed_password = hashPwd(e).toString()
        this.setState({
            error: [],
        })
    }

    _submitButton = async () => {
        if (await this._checkLogged())
            return
        if (this.email_addr == [] || this.hashed_password == []) {
            this.setState({
                error: 'Fields must not be empty !'
            })
            return
        }

        this.setState({
            error: [],
            err: false,
            isLoading: true
        })
        // Clean string from space
        this.email_addr = removeChar(this.email_addr, ' ')

        /////////////////////////////////////////////////////
        ///  REQUEST for login to local server
        /////////////////////////////////////////////////////
        login(this.email_addr, this.hashed_password).then(ret => {
            if (ret.data.success === false) {
                this.setStateroutines({
                    err: false,
                    isLoading: false,
                    error: ret.data.error
                })
                return
            }
            this.setState({
                err: false,
                isLoading: false,
                error: []
            })
            this._goTo("Home")
        }).catch((res) => {
            console.log('LoginRequest receive:', res)
            this.setState({
                err: false,
                isLoading: false,
                error: 'Server error. Contact an administrator.'
            })
        })
}

    loader(value) {
        if (value === true)
            return {width:1000, height:1000, position: 'absolute', backgroundColor: '#ffffffaa'}
        return (
            <View style={[{marginTop: 200, alignSelf: 'center', position: 'absolute'}]}>
                <ActivityIndicator size="large" color="#000000"/>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View style={styles.main} >
                    <View style={styles.imageContainer}>
                        <Text style={[styles.textImage, styles.title]} >AREA 51</Text>
                    </View>
                    <Image style={styles.logo} source={require('../../assets/logo.png')} ></Image>
                    <Text style={{fontSize:11, marginTop: 7, backgroundColor: '#ffa100bb', maxWidth: '80%'}} >{this.state.error}</Text>
                    <View style={styles.m_forms} >
                        <Text style={styles.label} >E-mail </Text>
                        <TextInput style={styles.input_filed} onChangeText={ (e) => {this._changeText("e-mail", e)} }   placeholder='E-mail adress..'/>

                        <Text style={[styles.label]} >Password </Text>
                        <TextInput style={[styles.input_filed, {marginBottom: 30}, this.errorStyle()]} secureTextEntry={true} onChangeText={ (e) => {this._changeText("password", e)} } placeholder='Password..'/>

                        <Button onPress={this._submitButton} title='Sign in' />
                        <View style={styles.button2}>
                            <Button title='create an account' onPress={() => this._goTo("SignUp")} />
                        </View>
                    </View>
                </View>

                <View style={this.loader(this.state.isLoading)} />
                {(this.state.isLoading) ? this.loader() : (<View></View>)}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    textImage: {
        alignSelf: 'center'
    },
    main: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 20
    },
    input_filed: {
        fontSize: 15,
        marginBottom: 20,
        borderWidth: 0.3,
    },
    m_forms: {
        padding: 70,
        backgroundColor: '#bf9c34ff',
        borderRadius: 10,
        maxWidth: '83%'
    },
    button: {
    },
    button2: {
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'serif',
        borderBottomWidth: 2,
        marginTop: '10%',
    },
    logo: {
        width: 128,
        height: 128
    },
    imageContainer: {
        position: 'relative'
    }
})

export default SignIn