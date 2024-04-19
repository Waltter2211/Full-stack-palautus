import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    /* const [loading, setLoading] = useState(false); */

    const { data, loading, error } = useQuery(GET_REPOSITORIES)

    /* const fetchRepositories = async () => {
        setLoading(true);

        const response = await fetch('http://88.195.213.99:5000/api/repositories');
        const json = await response.json();

        setLoading(false);
        setRepositories(json);
    } */

    const fetchRepositoriesGql = () => {
        setRepositories(data?.repositories);
    }

    useEffect(() => {
        /* fetchRepositories(); */
        fetchRepositoriesGql();
        
    }, [loading]);

  return { repositories, loading, refetch: fetchRepositoriesGql };
}

export default useRepositories;