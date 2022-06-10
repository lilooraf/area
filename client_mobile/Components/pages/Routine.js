import React from 'react'
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getCurrentUserLinks, updateUserLink, deleteLinkByUUID } from '../../NET/local_serv_request'
import SwitchLine from '../SwitcherLine'
import { StackActions, NavigationActions } from 'react-navigation';

/*                                             REMEMBER
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////                            FORGOT PASSWORD                            //////////////////////////
/////////////////                            Remove profile things                      //////////////////////////
/////////////////                            DIFERENCIER LES ACTIONS DES REACTION       //////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
const fake_routine = [
    {id: 221, title: "Auto inscription intranet", isActive: true},
    {id: 232, title: "E-Mail when i get message", isActive: true},
    {id: 277, title: "Destroy email from 'Steph'", isActive: false}
]

const remove_alert = (id, func) => {
    Alert.alert(
        "Remove this routine", // Title
        "Do you really want to remove this routine ?", // Description
        [ // Array of button
            {
                text: 'canel',
                style: "cancel",
                onPress: () => console.log("*Removed*")  // TODO Place here request to remove routine
            },
            { 
                text: "OK",
                onPress: () => {
                    deleteLinkByUUID(id)
                    func()
                },
            },
        ]
    ),
    { 
        cancelable: false 
    }
}

const DisplayTips = () => {

    return (
            <View style={{marginTop: 30}} >
                <Text style={{textDecorationLine : 'underline'}} >Tips: </Text>
                <Text style={{fontStyle: 'italic'}} >Hold a routine to delete it.</Text>
            </View>
    )
}

class Routine extends React.Component {

    state = {
        routines: [],
        isLoading: 'loading',
        i: 0
    }

    getLinks = async () => {
        getCurrentUserLinks().then(res => {
            this.setState({
                routines: res,
                isLoading: 'sucess'
            })
            console.log("Yess")
        }).catch(() => {
            console.log("Yess")
            this.setState({
                routines: res,
                isLoading: 'fail'
            })
        })
        console.log(this.state.isLoading)
    }

    loader = () => {
        return <ActivityIndicator size="large" color="#000000"/>
    }

    constructor(props) {
        super(props)
        this.getLinks()
    }

    _goTo = (goTo) => {
        this.props.navigation.navigate(goTo)
    }

    render = () => {
        let routines

        console.log(this.state.routines.length)
        if (this.state.routines.length == undefined || this.state.routines.length == 0)
            routines = (
                <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 30, }} >
                    <Text style={{fontStyle: 'italic'}} >No routines found.
                    </Text>
                    <TouchableOpacity onPress={() => this._goTo('AddRoutine')}>
                        <Text style={{marginLeft: 5, fontStyle: 'italic', color: 'blue', fontWeight: 'bold', textDecorationLine: 'underline'}}>
                            Add a new one
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        else
            routines = this.state.routines.map((item) =>
                <SwitchLine
                    key={item.uuid}
                    touchable={true}
                    touchableLongFunc={() => {remove_alert(item.uuid, this.getLinks)} }
                    touchableFunc={ () => {
                        this.props.navigation.navigate('EditRoutine', {id:item.uuid})
                    }}
                    toDo={async () => {
                        let new_state = !item.activated
                        await updateUserLink({activated: new_state}, item.uuid)
                        this.getLinks()
                    }}
                    label={item.link_name}
                    state={item.activated}
                    key={item.link_name}
                />
            )
        return(
            <View style={{marginLeft: 10, marginRight: 10}} >
                <Image style={styles.img} source={require('../../assets/profile.png')} />
                {
                    (this.state.isLoading == 'loading') ? this.loader() : 
                    (this.state.isLoading == 'fail') ? <Text style={styles.fail}>Fail.. try to contact administrator</Text> : routines
                }
                <DisplayTips />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        flex:1,
    },
    img: {
        alignSelf:'center',
        width: 128,
        height: 128,
    },
    header: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    fo: {
        backgroundColor: 'blue',
        flex:1
    },
    fail: {
        backgroundColor: 'red',
        width: '80%',
        alignSelf: 'center',
        paddingLeft: 40,
        marginTop: 10
    }
})

export default Routine