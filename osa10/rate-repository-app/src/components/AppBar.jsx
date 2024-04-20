import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { GET_AUTHENTICATED } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext, useEffect, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

const AppBar = () => {
  const [loggedIn, setLoggedIn] = useState('null');
  const authStorage = useContext(AuthStorageContext)
  const { data, loading, error } = useQuery(GET_AUTHENTICATED);
  

  useEffect(() => {
    authStorage.getAccessToken().then(res => {
      setLoggedIn(res.data.authenticate.accessToken)
    })
  }, [])

  const handleSignOut = () => {
    authStorage.removeAccessToken()
    window.location.reload()
  }

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/'>
                <Text style={styles.text}>Repositories</Text>
            </Link>
            
            {loggedIn === 'null'
             ? <Link to='/signin'><Text style={styles.text}>Sign in</Text></Link>
              : <Text style={styles.text} onPress={handleSignOut}>Sign Out</Text>}
        </ScrollView>
    </View>
  )
  
};

export default AppBar;