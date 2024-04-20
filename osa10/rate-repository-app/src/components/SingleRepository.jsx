import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-native'
import { GET_REVIEWS, GET_SINGLE_REPOSITORY } from '../graphql/queries'
import { Pressable, View, Text, Linking, FlatList } from 'react-native'
import RepositoryItem from './RepositoryItem'

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem fullName={repository.fullName} description={repository.description} language={repository.language} stargazersCount={repository.stargazersCount} forksCount={repository.forksCount} reviewCount={repository.reviewCount} ratingAverage={repository.ratingAverage} ownerAvatarUrl={repository.ownerAvatarUrl} />
      <View style={{width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: '10px'}}><Pressable onPress={() => Linking.openURL(repository.url)}><Text style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}}>Open in GitHub</Text></Pressable></View>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View key={review.node.id} style={{display: 'flex', flexDirection: 'row', padding: '10px', columnGap: '10px'}}>
      <View style={{width: '50px', height: '50px', border: '2px solid blue', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', color: 'blue'}}>{review.node.rating}</Text>
      </View>
      <View style={{width: '95%', display: 'flex', flexWrap: 'wrap'}}>
        <Text style={{fontWeight: 'bold'}}>{review.node.user.username}</Text>
        <Text style={{color: 'grey'}}>{review.node.createdAt.split('T')[0].replaceAll('-', '.')}</Text>
        <Text>{review.node.text}</Text>
      </View>
    </View>
  )
};

const SingleRepository = () => {
  let { id } = useParams()
  const repositoryData = useQuery(GET_SINGLE_REPOSITORY, 
    {
      fetchPolicy: 'cache-and-network',
      variables: {repositoryId: id}
    })

  const reviewData = useQuery(GET_REVIEWS, 
    {variables: {repositoryId: id}})

  if (repositoryData.loading || reviewData.loading) return <View><Text>loading</Text></View>

  const { repository } = repositoryData.data;

  const reviews = reviewData.data.repository.reviews.edges
  
  return (
    
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  )

  
}

export default SingleRepository