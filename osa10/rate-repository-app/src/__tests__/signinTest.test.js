import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Platform } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import useSignIn from '../hooks/useSignIn';
import { useFormik } from 'formik';

const SignIn = ({ onSubmit }) => {

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

  /* const authStorage = useAuthStorage()

  const [signin] = useSignIn(); */

  

  /* const validationSchema = yup.object().shape({
    username: yup
    .string('username cant be number')
    .required('username is required'),
    password: yup
    .string('password cant be number')
    .required('password is required')
  }) */

  const formik = useFormik({
    initialValues: {
      username: 'asdtest',
      password: 'asdtest'
    },
    onSubmit: (initialValues) => onSubmit(initialValues),
  });

  return (
    <View>
        <TextInput type='text' id='username' name='username' placeholder='Username' onChange={formik.handleChange('username')} value={formik.values.username} />
        {formik.touched.username && formik.errors.username && (
          <Text>{formik.errors.username}</Text>
        )}
        <TextInput secureTextEntry={true} type='password' id='password' name='password' placeholder='Password' onChangeText={formik.handleChange('password')} value={formik.values.password} />
        {formik.touched.password && formik.errors.password && (
          <Text>{formik.errors.password}</Text>
        )}
        <Pressable onPress={formik.handleSubmit}>
          <Text>Sign in</Text>
        </Pressable>
    </View>
  )
};

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();

      render(<SignIn onSubmit={onSubmit} />)

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'asdtest')
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'asdtest')
        fireEvent.press(screen.getByText('Sign in'))
      });
      
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
          password: 'asdtest',
          username: 'asdtest',
        });
    });
  });
});