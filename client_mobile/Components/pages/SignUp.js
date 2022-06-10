import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, Button, Image, ActivityIndicator,ScrollView } from 'react-native'
import { create_user, isLogged } from '../../NET/local_serv_request'
import { removeChar } from '../tools'

export const hashPwd = (str) => {
    return str.split('').reduce((prevHash, currHash) => (((prevHash << 5) - prevHash) + currHash.charCodeAt(0)) |0, 0)
}

class SignUp extends React.Component {

    state = {
        err: false,
        error: [],
        isLoading: false
    }

    _goTo = (goTo) => {
        this.props.navigation.navigate(goTo)
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

    constructor(props){
        super(props)
        this.hashed_password = ''
        this.email_addr = ''
        this.hashed_password2 = ''
        this._checkLogged()
    }

    _changeText = (field, e) => {
        if (field == "e-mail") {
            this.email_addr = e
            this.setState({
                error: [],
                err: false,
            })
        }
        if (field == "password2") {
            this.hashed_password2 = hashPwd(e).toString()
            this.setState({
                error: [],
                err: false,
            })
        }
        if (field == "password") {
            this.setState({
                error: [],
                err: false,
            })
            this.hashed_password = hashPwd(e).toString()
        }
    }

    _submitButton = async () => {
        if (await this._checkLogged())
            return
        // console.log("Submit with:", this.email_addr, "and", this.hashed_password, "and", this.username)
        this.setState({
            error: [],
            err: false,
            isLoading: true
        })

        if (this.hashed_password.length < 6 || this.hashed_password2.length < 6 ){
            this.setState({
                err: true,
                error: "Password must have at least 6 characters !",
                isLoading: false
            })
            return
        }

        if (this.hashed_password !== this.hashed_password2) {
            this.setState({
                err: true,
                error: "Password must be the same !",
                isLoading: false
            })
            return
        }
        // Clean string from space
        this.email_addr = removeChar(this.email_addr, ' ')

        /////////////////////////////////////////////////////
        ///  REQUEST for Create user to local server
        /////////////////////////////////////////////////////
        create_user(this.email_addr, this.hashed_password).then(ret => {
            if (ret.data.success === false) {
                this.setState({
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
        }).catch(res => {
            console.log('RegisterRequest receive:', res)
            this.setState({
                err: false,
                isLoading: false,
                error: 'Server error. Contact an administrator.'
            })
        })

    }

    errorStyle() {
        return (this.state.err === true) ?
        {backgroundColor: '#ff0000'} :
        {}
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
            <ScrollView>
                <View style={styles.main}>
                    <View style={styles.imageContainer}>
                        <Text style={[styles.textImage, styles.title]} >AREA 51</Text>
                    </View>
                    <Image style={styles.logo} source={require('../../assets/logo.png')} ></Image>
                    <Text style={{fontSize:11, marginTop: 7, backgroundColor: '#ffa100bb', maxWidth: '70%'}} >{this.state.error}</Text>
                    <View style={styles.m_forms} >
                        <Text style={styles.label} >E-mail </Text>
                        <TextInput style={styles.input_filed} onChangeText={ (e) => {this._changeText("e-mail", e)} }   placeholder='E-mail adress..'/>

                        <Text style={styles.label} >Password </Text>
                        <TextInput secureTextEntry={true} style={[styles.input_filed, this.errorStyle()]} onChangeText={ (e) => {this._changeText("password2", e)} } placeholder='Password..'/>

                        <Text style={styles.label} >Password</Text>
                        <TextInput secureTextEntry={true} style={[styles.input_filed, {marginBottom: 30}, this.errorStyle()]} onChangeText={ (e) => {this._changeText("password", e)} } placeholder='Password..'/>

                        <Button style={styles.button} onPress={this._submitButton} title='Create an account' />
                        <View style={{marginTop: 20}}>
                            <Button title='Sign in' onPress={() => this._goTo("SignIn")} />
                        </View>
                    </View>
                </View>

                <View style={this.loader(this.state.isLoading)} />
                {(this.state.isLoading) ? this.loader() : (<View></View>)}

            </ScrollView>
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
        marginTop: 40,
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

export default SignUp