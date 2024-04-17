import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{fullName}</Text>
            <Text>{description}</Text>
            <Text>{language}</Text>
            <Text>{stargazersCount}</Text>
            <Text>{forksCount}</Text>
            <Text>{reviewCount}</Text>
            <Text>{ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem