import { View, TextInput, StyleSheet, Pressable, Text, Platform } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

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

const ReviewForm = () => {
  const navigate = useNavigate()
  
  const [mutate, result] = useMutation(ADD_REVIEW);
  const onSubmit = async (values) => {
    const newValues = {...values, rating: Number(values.rating)}
    const { ownerName, repositoryName, rating, text } = newValues;
    try {
      const data = await mutate({variables:{review:{ownerName, repositoryName, rating, text}}})
      navigate(`/${data.data.createReview.repositoryId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const validationSchema = yup.object().shape({
    ownerName: yup
    .string()
    .required('repository owner name is required'),
    repositoryName: yup
    .string()
    .required('repository name is required'),
    rating: yup
    .number()
    .min(0)
    .max(100)
    .required('rating is required'),
    text: yup
    .string()
  })

  const formik = useFormik({
    initialValues: {
      repositoryName: '',
      ownerName: '',
      rating: '',
      text: ''
    },
    validationSchema,
    onSubmit: (initialValues) => onSubmit(initialValues),
  });

  return (
    <View style={styles.container}>
        <TextInput style={styles.inputField} type='text' id='ownerName' name='ownerName' placeholder='repository owner name' onChange={formik.handleChange('ownerName')} value={formik.values.ownerName} />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{color: 'red'}}>{formik.errors.ownerName}</Text>
        )}
        <TextInput style={styles.inputField} type='text' id='repositoryName' name='repositoryName' placeholder='repository name' onChangeText={formik.handleChange('repositoryName')} value={formik.values.repositoryName} />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{color: 'red'}}>{formik.errors.repositoryName}</Text>
        )}
        <TextInput style={styles.inputField} type='text' id='rating' name='rating' placeholder='rating' onChangeText={formik.handleChange('rating')} value={formik.values.rating} />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{color: 'red'}}>{formik.errors.rating}</Text>
        )}
        <TextInput style={styles.inputField} type='text' id='text' name='text' placeholder='text' onChangeText={formik.handleChange('text')} value={formik.values.text} />
        {formik.touched.text && formik.errors.text && (
          <Text style={{color: 'red'}}>{formik.errors.text}</Text>
        )}
        <Pressable style={styles.buttonStyle} onPress={formik.handleSubmit}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Sign in</Text>
        </Pressable>
    </View>
  )
}

export default ReviewForm