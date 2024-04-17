import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  text: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Text style={styles.text}>Repositories</Text>
  </View>;
};

export default AppBar;