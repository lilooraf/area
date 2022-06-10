import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAllServices,createUserLink } from '../../NET/local_serv_request'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { getKeys } from '../object_manager'
import DynamicRoutineDrawer from '../DynamicRoutineDrawer'

const Section = () => {
    return (
        <View style={{
            width:'100%',
            borderColor: '#666',
            borderTopWidth: 3,
            marginTop: 10,
            marginBottom: 10
        }} />
    )
}

const find_object_by_name = (obj, name) => {
    for (let i = 0; i != obj.length; i++) {
        if (obj[i].name === name)
            return obj[i]
    }
    return null
}

class AddRoutine extends React.Component {

    state = {
        actual_action: null,
        actual_reaction: null,

        action_keys: null,
        reaction_keys: null,

        visible_action: null,
        visible_reaction: null,

        trigger_action_selected: null,
        trigger_reaction_selected: null,

        action_obj: {},
        reaction_obj: {},

        services: [],
        data: [],
        name: '',
        error_label: '',
        info_label: ''
    }

    componentDidMount = () => {
        this._getServices()
    }
    
    action_change = (key, value) => {
        this.setState({
            action_obj: {
                ...this.state.action_obj,
                [key]: value
            }
        })
    }

    reaction_change = (key, value) => {
        this.setState({
            reaction_obj: {
                ...this.state.reaction_obj,
                [key]: value
            }
        })
    }

    changeText = (e) => {
        this.setState({
            name: e
        })
    }

    _getServices = () => {
        getAllServices().then(res => {
            let arr = []
            if (res.data == undefined) {
                this.setState({
                    error_label: 'An error as occured... try later!',
                })
                return
            }
            res.data.body.map(item => {
                if (item.name == "name" || item.name == null)
                    return
                arr.push({
                    label: item.name,
                    value: item.name
                })
            })
            this.setState({
                services: arr,
                data: res.data.body
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    dump = () => {
        this.setState({
        
            visible_action: null,
            visible_reaction: null,
    
            action_obj: {},
            reaction_obj: {},
        })
    }

    _check_send = () => {
        if (this.state.action_obj == null || this.state.reaction_obj == null || Object.keys(this.state.reaction_obj).length == 0 || Object.keys(this.state.action_obj).length == 0 ) {
            this.setState({
                error_label: 'Missing some informations..',
                info_label: ''
            })
            return false
        }
        return true
    }

    _goTo = (goTo) => {
        this.props.navigation.navigate(goTo)
    }

    post_formatter = () => {
        let an = (this.state.actual_action == null) ? null : this.state.actual_action.name
        let rn = (this.state.actual_reaction == null) ? null : this.state.actual_reaction.name
        return {
            info_action: this.state.action_obj,
            info_react: this.state.reaction_obj,
            trigger_action: this.state.trigger_action_selected,
            react_action: this.state.trigger_reaction_selected,
            trigger_app: an,
            react_app: rn,
            link_name: this.state.name,
            activated: true
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                { (this.state.error_label !== '') ? <View style={styles.error_label} ><Text>{this.state.error_label}</Text></View> : <></> }
                { (this.state.info_label !== '') ? <View style={styles.info_label} ><Text>{this.state.info_label}</Text></View> : <></> }
                <TextInput style={styles.input_filed} onChangeText={this.changeText} placeholder="Give a name to your link" ></TextInput>
                <View style={styles.to_right}>
                    <DropDownPicker
                        items={this.state.services}
                        defaultIndex={0}
                        containerStyle={{height: 40, width: '45%'}}
                        onChangeItem={item => {
                            let s = find_object_by_name(this.state.data, item.value)
                            this.setState({
                                actual_action: s, 
                                action_keys: getKeys(s),
                                visible_action: null,
                                action_obj: {}
                            })
                        }}
                        placeholder='Service action' />
                    <DropDownPicker
                        items={this.state.services}
                        defaultIndex={0}
                        containerStyle={{height: 40, width: '45%'}}
                        onChangeItem={item => {
                            let s = find_object_by_name(this.state.data, item.value)
                            this.setState({
                                actual_reaction: s, 
                                reaction_keys: getKeys(s),
                                visible_reaction: null,
                                reaction_obj: {}
                            })
                        }}
                        placeholder='Service action' />
                </View>
                {/*//////////////////////////////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////////////////////////////////////////////////////*/}
                <View style={styles.to_right} >
                    {(this.state.actual_action == null) ? <DropDownPicker containerStyle={{width: '45%', height: 40}} placeholder=""  items={['']}/> :
                        <DropDownPicker
                            items={this.state.action_keys}
                            defaultIndex={0}
                            onChangeItem={item => {
                                if (this.state.visible_action == this.state.actual_action[item])
                                    return
                                this.setState({
                                    trigger_action_selected: item,
                                    visible_action: this.state.actual_action[item],
                                    action_obj: {}
                                })
                                if (getKeys(this.state.actual_action[item]).length == 0)
                                    this.setState({
                                        action_obj: {
                                            nothing: 'matching' 
                                        }
                                    })
                            }}
                            containerStyle={{height: 40, width: '45%'}}
                            placeholder='Select an action' />
                    }
                    {(this.state.actual_reaction == null) ? <DropDownPicker containerStyle={{width: '45%', height: 40}} placeholder="" items={['']}/> :
                        <DropDownPicker
                            items={this.state.reaction_keys}
                            defaultIndex={0}
                            onChangeItem={item => {
                                if (this.state.visible_reaction == this.state.actual_reaction[item])
                                    return
                                this.setState({
                                    trigger_reaction_selected: item,
                                    visible_reaction: this.state.actual_reaction[item],
                                    reaction_obj: {}
                                })
                                if (getKeys(this.state.actual_reaction[item]).length == 0)
                                    this.setState({
                                        reaction_obj: {
                                            nothing: 'matching' 
                                        }
                                    })
                            }}
                            containerStyle={{height: 40, width: '45%'}}
                            placeholder='Select an reaction' />
                    }
                </View>


                <Section />
                <ScrollView style={{height: '75%'}}>
                    <DynamicRoutineDrawer data={this.state.visible_action}  obj={this.action_change} />
                    <Section />
                    <DynamicRoutineDrawer data={this.state.visible_reaction} obj={this.reaction_change}/>
                    <Button title='click' onPress={() => {
                        console.log(this.post_formatter())
                        if (!this._check_send())
                            return
                        console.log(this.post_formatter())
                        if (createUserLink(this.post_formatter())) {
                            this.dump()
                            this.setState({
                                error_label: '',
                                info_label: 'Routine created !'
                            })
                        }
                        else
                            this.setState({
                                error_label: 'An error as occured.. try leter.',
                                info_label: ''
                            })
                    }} />
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    to_right: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input_filed: {
        fontSize: 15,
        borderWidth: 0.3,
        minWidth: '50%',
        marginTop: 10,
    },
    error_label: {
        backgroundColor: '#dd5555',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 15
    },
    info_label: {
        backgroundColor: '#dd5555',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 15
    },    
})


/*

info_action: {

}
info_react:

*/

export default AddRoutine
