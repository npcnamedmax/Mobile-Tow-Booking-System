import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import anns from '@assets/data/anns';
import AnnItem from '@/components/ann/AnnItem';

export default function Ann() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={anns}
        renderItem={({ item }) => <AnnItem value={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
});
