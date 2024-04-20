import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const navigate = useNavigate()

  const { repositories } = useRepositories();

  const repositoryNodes = repositories
  ? repositories.edges?.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`${item.id}`)}>
          <RepositoryItem fullName={item.fullName} description={item.description} language={item.language} stargazersCount={item.stargazersCount} forksCount={item.forksCount} reviewCount={item.reviewCount} ratingAverage={item.ratingAverage} ownerAvatarUrl={item.ownerAvatarUrl} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;