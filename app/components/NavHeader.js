import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function NavHeader( { title, shown } ) {
  return (
    <View style={styles.container}>
        {shown && <Text style={styles.header}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  header: {
    paddingLeft: 15,
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: '700',
  }
});

export default NavHeader;