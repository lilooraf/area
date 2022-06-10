import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const ButtonLabel = (props) => {

    let size = (props.size == undefined) ? styles.label.fontSize : props.size

    let render = (props.default == undefined) ? 
    (
        <TouchableOpacity onPress={props.onPress} style={props.styleTO} >
            <Text style={[props.styleTxt, {fontSize: size}]}> {props.text} </Text>
        </TouchableOpacity>
    ) : 
    (
        <TouchableOpacity onPress={props.onPress} style={styles.ButtonS} >
            <Text style={[styles.label, {fontSize: size}]}> {props.text} </Text>
        </TouchableOpacity>
    )

    return (
        <>
        {render}
        </>
    )
}

const styles = StyleSheet.create({
    label :{
        fontSize: 25
    },
    ButtonS: {
        alignItems: 'center'        
    }
})

export default ButtonLabel