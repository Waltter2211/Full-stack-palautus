import { useMutation } from "@apollo/client"
import { SIGNIN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGNIN);

    const signIn = async ({ username, password }) => {
        const signed = await mutate({variables: {credentials: {username, password}}});
        authStorage.setAccessToken(signed);
        apolloClient.resetStore();
        return signed;
    }
  return [signIn, result]
}

export default useSignIn