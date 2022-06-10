import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SwitchLine from '../SwitcherLine'
import {logOut as logout} from '../../NET/local_serv_request'
import { StackActions, NavigationActions } from 'react-navigation';

const services = [
    {name: 'Discord',   state: true,  toDo: () => console.log('DiscordAction')  },
    {name: 'Google',    state: false, toDo: () => console.log('GoogleAction')   },
    {name: 'Microsoft', state: false, toDo: () => console.log('MicrosoftAction')},
    {name: 'Youtube',   state: true,  toDo: () => console.log('YoutubeAction')  },
    {name: 'Yahoo',     state: false, toDo: () => console.log('yahooAction')    },
]

class Profile extends React.Component {

    state = {
        error: []
    }

    constructor(props) {
        super(props)
    }

    _goTo = (goTo) => {
        this.props.navigation.navigate(goTo)
    }

    logOut = async () => {
        logout().then(res => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
              });
              this.props.navigation.dispatch(resetAction);
        })
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <Image style={styles.img} source={require('../../assets/profile.png')} />
                {services.map((item) => <SwitchLine key={item.name} label={item.name} state={item.state} toDo={item.toDO} /> )}
                <TouchableOpacity style={styles.logout_container} onPress={this.logOut} >
                    <Text style={styles.logout}>Log out</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'blue',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    img: {
        alignSelf:'center',
        width: 128,
        height: 128,
    },
    logout: {
        fontSize: 25,
        borderRadius: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
        paddingRight: 30,
        paddingLeft: 30,
        marginTop: 20
        // width: '50%'
    },
    logout_container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Profile