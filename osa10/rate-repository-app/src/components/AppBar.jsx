import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/'>
                <Text style={styles.text}>Repositories</Text>
            </Link>
            <Link to='/signin'>
                <Text style={styles.text}>Sign in</Text>
            </Link>
        </ScrollView>
    </View>
  )
  
};

export default AppBar;