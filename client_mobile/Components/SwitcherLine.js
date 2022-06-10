import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

const SwitcherLine = (props) => {

    const {label, state, toDo, touchable, touchableFunc, touchableLongFunc, onPress} = props

    let line =  (touchable === false || touchable == undefined) ?
    (
        <View style={styles.mainContainer} >
            <Text style={styles.text}>{label}</Text>
            <Switch
                trackColor={{ false: "#666", true: "#666" }}
                thumbColor={state ? "#53d353" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toDo}
                value={state}/>
        </View>
    ) : 
    (
        <TouchableOpacity onLongPress={touchableLongFunc} style={styles.mainContainer} onPress={touchableFunc} >
            <Text style={styles.text}>{label}</Text>
            <Switch
                trackColor={{ false: "#666", true: "#666" }}
                thumbColor={state ? "#53d353" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toDo}
                onPress={onPress}
                value={state}/>
        </TouchableOpacity>
    )



    return (line)
}

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    text: {
        fontSize: 20,
        width: '85%',
    }
})

export default SwitcherLine