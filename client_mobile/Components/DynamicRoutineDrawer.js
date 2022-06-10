import React from 'react';
import {getKeys} from './object_manager'
import { View, StyleSheet, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export const LabeledLine = ({label, placeholder, func}) => {
    return (
        <View style={styles.to_right}>
            <Text style={styles.text_input_lable} >{label}</Text>
            <TextInput onChangeText={(e) => {func(label, e)}} style={styles.input_filed} placeholder={placeholder}></TextInput>
        </View>
    )
} 

export const DynamicRoutineDrawer = (props) => {
    let arr = props.data

    if (arr == null)
        return <></>

    let visible = getKeys(arr).map(item => {
        return <LabeledLine label={item} placeholder={arr[item] } func={props.obj} />
    })

    // console.log(visible);

    return (
        <View>
            {visible}
        </View>
    )
}

const styles = StyleSheet.create({
    to_right: {
        flexDirection: 'row',
    },
    text_input_lable: {
        minWidth: '30%'
    },
    input_filed: {
        fontSize: 15,
        marginBottom: 20,
        borderWidth: 0.3,
        minWidth: '50%'
    },
})


export default DynamicRoutineDrawer