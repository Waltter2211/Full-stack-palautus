import { FlatList, View, StyleSheet, Pressable, Text, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const navigate = useNavigate()

  const { repositories, sortByOrder, sortVar, searchByText } = useRepositories();

  const repositoryNodes = repositories
  ? repositories.edges?.map(edge => edge.node)
  : [];

  return (
    <>
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
        ListHeaderComponent={
        <>
          <TextInput type='text' id='search' name='search' onChange={(event) => searchByText(event.target.value)} />
          <Picker selectedValue={sortVar} onValueChange={(itemValue, itemIndex) => sortByOrder(JSON.parse(itemValue))}>
            <Picker.Item label='select sorting' value={JSON.stringify({test: 'test'})} />
            <Picker.Item label='latest repositories' value={JSON.stringify({orderBy: 'CREATED_AT', orderDirection: 'DESC'})} />
            <Picker.Item label='highest rated repositories' value={JSON.stringify({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'})} />
            <Picker.Item label='lowest rated repositories' value={JSON.stringify({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'})} />
          </Picker>
        </>
        }
      />
    </>
  );
};

export default RepositoryList;