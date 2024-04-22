import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [sortVar, setSortVar] = useState();

    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        variables: {...sortVar}
    })

    const sortByOrder = (values) => {
        setSortVar({...values})
    }

    useEffect(() => {
        setRepositories(data?.repositories);
    }, [data]);

    if (loading) return <div>loading</div>

  return { repositories, loading, refetch: sortByOrder, sortVar };
}

export default useRepositories;