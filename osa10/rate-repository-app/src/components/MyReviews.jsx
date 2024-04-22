import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_AUTHENTICATED } from '../graphql/queries'
import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      display: 'flex',
    },
    infoContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    imageDiv: {
      width: '20%',
      padding: 10
    },
    imageStyle: {
      width: '100%',
      height: 50,
      borderRadius: 5
    },
    descriptionDiv: {
      width: '80%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      rowGap: 10
    },
    fullNameText: {
      color: 'black',
      fontSize: 24,
      fontWeight: '700',
    },
    descriptionText: {
      color: 'grey',
      fontSize: 20,
    },
    languageText: {
      backgroundColor: '#0366d6',
      color: 'white',
      borderRadius: 3,
      padding: 3
    },
    ratingContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    ratingDiv: {
      display: 'flex',
      alignItems: 'center',
    }
});

const MyReviews = () => {
    const { data, loading, error } = useQuery(GET_AUTHENTICATED);
    const [reviews, setReviews] = useState();

    useEffect(() => {
        setReviews(data.me.reviews.edges)
    })

    if (loading) return <View>loading</View>

  return (
    <>
        {reviews?.map(({ node }) => {
            return (
                <View style={{display: 'flex', flexDirection: 'row', padding: '10px', columnGap: '10px'}} key={node.id}>
                    <View style={{width: '50px', height: '50px', border: '2px solid blue', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: 'blue'}}>{node.rating}</Text>
                    </View>
                    <View style={{width: '95%', display: 'flex', flexWrap: 'wrap'}}>
                        <Text style={{fontWeight: 'bold'}}>{node.repository.fullName}</Text>
                        <Text style={{color: 'grey'}}>{node.createdAt.split('T')[0].replaceAll('-', '.')}</Text>
                        <Text>{node.text}</Text>
                    </View>
                </View>
            )
        })}
    </>
  )
}

export default MyReviews