import { View, TextInput, StyleSheet, Pressable, Text, Platform } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';

const SignIn = () => {

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

  const [signin] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signin({ username, password })
      const authStorage = new AuthStorage('auth')
      authStorage.setAccessToken(data)
      authStorage.getAccessToken()
      authStorage.removeAccessToken()
      /* console.log(data) */
    } catch (error) {
      console.log(error)
    }
  }

  const validationSchema = yup.object().shape({
    username: yup
    .string('username cant be number')
    .required('username is required'),
    password: yup
    .string('password cant be number')
    .required('password is required')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (initialValues) => onSubmit(initialValues),
  });

  return (
    <View style={styles.container}>
        <TextInput style={styles.inputField} type='text' id='username' name='username' placeholder='Username' onChange={formik.handleChange('username')} value={formik.values.username} />
        {formik.touched.username && formik.errors.username && (
          <Text style={{color: 'red'}}>{formik.errors.username}</Text>
        )}
        <TextInput style={styles.inputField} secureTextEntry={true} type='password' id='password' name='password' placeholder='Password' onChangeText={formik.handleChange('password')} value={formik.values.password} />
        {formik.touched.password && formik.errors.password && (
          <Text style={{color: 'red'}}>{formik.errors.password}</Text>
        )}
        <Pressable style={styles.buttonStyle} onPress={formik.handleSubmit}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Sign in</Text>
        </Pressable>
    </View>
  )
};

export default SignIn;