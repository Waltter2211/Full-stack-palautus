import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_AUTHENTICATED } from '../graphql/queries'
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const MyReviews = () => {
    const navigate = useNavigate()
    const authenticatedData = useQuery(GET_AUTHENTICATED);
    const [mutate, result] = useMutation(DELETE_REVIEW);
    const [reviews, setReviews] = useState();

    useEffect(() => {
        setReviews(authenticatedData.data.me.reviews.edges)
    })

    const buttonAlert = async (id) => {
        /* Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {text: 'Cancel', onPress: () => console.log('cancel pressed')},
            {text: 'Ok', onPress: () => console.log('ok pressed')}
        ]) */
        try {
            await mutate({variables:{deleteReviewId: id}})
            authenticatedData.refetch()
        } catch (error) {
            console.log(error)
        }
    }
    

    const Item = ({ props }) => {
        return (
            <View style={{display: 'flex', flexDirection: 'row', padding: '10px', columnGap: '10px'}} key={props.node.id}>
                <View style={{width: '50px', height: '50px', border: '2px solid blue', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: 'blue'}}>{props.node.rating}</Text>
                </View>
                <View style={{width: '95%', display: 'flex', flexWrap: 'wrap'}}>
                    <Text style={{fontWeight: 'bold'}}>{props.node.repository.fullName}</Text>
                    <Text style={{color: 'grey'}}>{props.node.createdAt.split('T')[0].replaceAll('-', '.')}</Text>
                    <Text>{props.node.text}</Text>
                    <View style={{width:'100%', display:'flex', flexDirection:'row', columnGap:'10px'}}>
                        <Pressable style={{backgroundColor:'blue', padding:'10px', borderRadius:'5px'}}>
                            <Text style={{color:'white', fontWeight:'bold'}} onPress={() => navigate(`/${props.node.repositoryId}`)}>View repository</Text>
                        </Pressable>
                        <Pressable style={{backgroundColor:'red', padding:'10px', borderRadius:'5px'}}>
                            <Text style={{color:'white', fontWeight:'bold'}} onPress={() => buttonAlert(props.node.id)}>Delete review</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
        
    }

    if (authenticatedData.loading) return <View>loading</View>

  return (
    <>
        <FlatList 
            data={reviews}
            renderItem={({item}) => <Item props={{...item}} />}
        />
    </>
  )
}

export default MyReviews