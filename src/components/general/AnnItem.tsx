import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

export default function AnnItem({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{value.title}</Text>
      <Text style={styles.datetime}>
        {dayjs(value.datetime).fromNow()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff', // Clean white background
    borderRadius: 10, // Rounded corners
    borderColor: '#ffffff', // Light gray border
    borderWidth: 1, // Add a border for separation
    marginBottom: 15, // Add space between items
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Add slight elevation for a shadow effect
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark gray for title text
    marginBottom: 5, // Space between title and datetime
  },
  datetime: {
    fontSize: 14,
    color: '#666', // Light gray for datetime text
  },
});
