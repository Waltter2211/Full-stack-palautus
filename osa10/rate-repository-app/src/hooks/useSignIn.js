import { useMutation } from "@apollo/client"
import { SIGNIN } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGNIN);

    const signIn = async ({ username, password }) => {
        const signed = await mutate({variables: {credentials: {username, password}}});
        
        return signed;
    }
  return [signIn, result]
}

export default useSignIn