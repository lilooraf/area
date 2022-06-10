import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import ButtonLabel from './Components/ButtonLabel';
import Home from './Components/pages/Home';
import Navigation from './Components/pages/Navigation'

export default function App() {
    return (
        <Navigation />
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
