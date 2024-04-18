import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList'
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import WhatIsMyPlatform from './WhatIsMyPlatform';

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    width: '100%',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatIsMyPlatform />
    </View>
  );
};

export default Main;