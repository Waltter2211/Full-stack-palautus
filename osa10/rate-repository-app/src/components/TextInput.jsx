import React from 'react'
import { View } from 'react-native'
import { TextInput as NativeTextInput, StyleSheet } from 'react-native'

function TextInput(props, isError) {

    /* const onChangeText = (value) => {
        if (props.onChangeText) {
            props.onChangeText(value)
        }
    } */

    const styles = StyleSheet.create({
        inputField: {
            width: '80%',
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 3,
            padding: 5
        }
    })

  return (
    <View>
        <NativeTextInput style={[styles.inputField, {borderBlockColor: props.isError ? 'red' : 'grey'}]} {...props} /* onChangeText={onChangeText} */ />
    </View>
  )
}

export default TextInput