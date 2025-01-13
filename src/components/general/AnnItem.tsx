import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

export default function AnnItem({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{value.title}</Text>
      <Text style={styles.datetime}>
        {dayjs(value.datetime).format('MMMM D, YYYY h:mm A')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  datetime: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
