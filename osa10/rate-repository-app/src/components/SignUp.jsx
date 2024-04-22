import { useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      rowGap: 10,
      paddingTop: 10,
      paddingBottom: 10
    },
    inputField: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 3,
      padding: 5
    },
    buttonStyle: {
      display: 'flex',
      alignItems: 'center',
      width: '80%',
      backgroundColor: Platform.select({
        android: 'green',
        ios: 'blue',
        default: 'red'
      }),
      borderRadius: 3,
      padding: 10
    },
    textValid: {
      borderColor: 'grey'
    },
    textInvalid: {
      borderColor: 'red'
    }
})

const SignUp = () => {
    const navigate = useNavigate()
    const [mutate, result] = useMutation(CREATE_USER);

    const onSubmit = async (values) => {
        try {
            const userInfo = {
                username: values.username,
                password: values.password
            }
            await mutate({variables: {user: userInfo}})
            navigate('/signin')
        } catch (error) {
            console.log(error)
        }
    }

    const validationSchema = yup.object({
        username: yup
        .string()
        .min(5, 'minimun length is 5')
        .max(30, 'maximum length is 30')
        .required('username is required'),
        password: yup
        .string()
        .min(5, 'minimun length is 5')
        .max(50, 'maximum length is 50')
        .required('password is required'),
        passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required('password confirm is required')
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema,
        onSubmit: initialValues => onSubmit(initialValues),
    })
  return (
    <View style={styles.container}>
        <TextInput style={styles.inputField} type='text' id='username' name='username' placeholder='username' onChange={formik.handleChange('username')} value={formik.values.username} />
        {formik.touched.username && formik.errors.username && (
          <Text style={{color: 'red'}}>{formik.errors.username}</Text>
        )}
        <TextInput style={styles.inputField} type='text' id='password' name='password' placeholder='password' onChangeText={formik.handleChange('password')} value={formik.values.password} />
        {formik.touched.password && formik.errors.password && (
          <Text style={{color: 'red'}}>{formik.errors.password}</Text>
        )}
        <TextInput style={styles.inputField} type='text' id='passwordConfirmation' name='passwordConfirmation' placeholder='confirm password' onChangeText={formik.handleChange('passwordConfirmation')} value={formik.values.passwordConfirmation} />
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
          <Text style={{color: 'red'}}>{formik.errors.passwordConfirmation}</Text>
        )}
        <Pressable style={styles.buttonStyle} onPress={formik.handleSubmit}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Sign up</Text>
        </Pressable>
    </View>
  )
}

export default SignUp