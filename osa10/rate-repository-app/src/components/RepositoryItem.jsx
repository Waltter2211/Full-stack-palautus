import React from 'react'
import { View, Text } from 'react-native';

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
    return(
        <View>
            <Text>{fullName}</Text>
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