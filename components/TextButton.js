import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

export default function TextButton({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.basic, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    basic: {
        width: 85,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
        color: white,
        borderRadius: 5,
        borderWidth: 1,
    }
})