import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getLinkInfo } from '../../NET/local_serv_request'

class EditRoutine extends React.Component {

    state = {
        id: '',
        data: {}
    }

    componentDidMount = () => {
        const { id } = this.props.navigation.state.params
        getLinkInfo(id).then((res) => {
            this.setState({
                id: id,
                data: res.data
            })
        })
    }

    render() {

        let data = this.state.data

        return(
            <View>
                <Text>Routine name: {data.link_name}</Text>
                <Text>Routine id: {data.uuid}</Text>

                <View style={styles.sectionContainer}>
                    <View style={styles.line}/>
                    <View style={styles.Section}>
                        <Text style={styles.sectionText} > Action: </Text>
                    </View>
                    <View style={styles.line}/>
                </View>
                <Text>Action service: {data.trigger_app}</Text>
                <Text>Action trigger: {data.trigger_action}</Text>

                <View style={styles.sectionContainer}>
                    <View style={styles.line}/>
                    <View style={styles.Section}>
                        <Text style={styles.sectionText} > Reaction: </Text>
                    </View>
                    <View style={styles.line}/>
                </View>
                <Text>Reaction service: {data.react_app}</Text>
                <Text>Reaction trigger: {data.react_action}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    Section: {
        width: '33%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionText: {
        fontSize: 20,
    },
    sectionContainer: {
        flexDirection: 'row',
    },
    line: {
        width: '33%',
        borderBottomWidth: 5
    }
})

export default EditRoutine