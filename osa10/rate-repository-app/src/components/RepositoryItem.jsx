import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

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

const numberFormat = (value) => {
  if (value > 1000) {
    return Math.floor(value / 100) / 10.0 + 'k'
  } else {
    return value
  }
}

const RepositoryItem = ({ ownerAvatarUrl, fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  let { id } = useParams()

  console.log(id)
  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, 
    {variables: {repositoryId: id}})
  
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.imageDiv}>
          <Image style={styles.imageStyle} source={{uri: ownerAvatarUrl || data?.repository.ownerAvatarUrl}}></Image>
        </View>
        <View style={styles.descriptionDiv}>
          <Text style={styles.fullNameText}>{fullName || data?.repository.fullName}</Text>
          <Text style={styles.descriptionText}>{description || data?.repository.description}</Text>
          <Text style={styles.languageText}>{language || data?.repository.language}</Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingDiv}>
          <Text style={styles.fullNameText}>{numberFormat(stargazersCount) || numberFormat(data?.repository.stargazersCount)}</Text>
          <Text style={styles.descriptionText}>Stars</Text>
        </View>
        <View style={styles.ratingDiv}>
          <Text style={styles.fullNameText}>{numberFormat(forksCount) || numberFormat(data?.repository.forksCount)}</Text>
          <Text style={styles.descriptionText}>Forks</Text>
        </View>
        <View style={styles.ratingDiv}>
          <Text style={styles.fullNameText}>{numberFormat(reviewCount) || numberFormat(data?.repository.reviewCount)}</Text>
          <Text style={styles.descriptionText}>Reviews</Text>
        </View>
        <View style={styles.ratingDiv}>
          <Text style={styles.fullNameText}>{numberFormat(ratingAverage) || numberFormat(data?.repository.ratingAverage)}</Text>
          <Text style={styles.descriptionText}>Rating</Text>
        </View>
        
      </View>
      {id !== undefined
         ? <View style={{width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: '10px'}}><Pressable onPress={() => Linking.openURL(data?.repository.url)}><Text style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}}>Open in GitHub</Text></Pressable></View>
         : <View></View>}
    </View>
  )
}

export default RepositoryItem