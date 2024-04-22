import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { GET_REPOSITORIES, SEARCH_REPOSITORIES } from '../graphql/queries';
import { View } from 'react-native';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [sortVar, setSortVar] = useState();
    const [searchValue, setSearchValue] = useState();

    const getRepositoriesData = useQuery(GET_REPOSITORIES, {
        variables: {...sortVar}
    })

    const getRepositoriesSearchData = useQuery(SEARCH_REPOSITORIES, {
        variables: {searchKeyword: searchValue}
    })

    const sortByOrder = (values) => {
        setSortVar({...values})
    }

    const searchByText = (values) => {
        setSearchValue(values)
        setRepositories(getRepositoriesSearchData.data?.repositories)
    }

    useEffect(() => {
        setRepositories(getRepositoriesData.data?.repositories)
    }, [getRepositoriesData.data]);

    if (getRepositoriesData.loading) return <View>loading</View>

  return { repositories, sortByOrder, sortVar, searchByText };
}

export default useRepositories;