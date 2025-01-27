import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index() {
  const requests = [
    { id: 'REQ001', name: 'Ali', status: 'Active', datetime: '2025-01-10 10:00 AM', trip: 'Tow Great Company' },
    { id: 'REQ002', name: 'Abu', status: 'Active', datetime: '2025-01-11 02:00 PM', trip: 'Car Break Down Company' },
    { id: 'REQ003', name: 'Muthu', status: 'Active', datetime: '2025-01-12 05:00 PM', trip: 'Earn Tow Money Company' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'All Requests' }} />
      {requests.map((request) => (
        <TouchableOpacity key={request.id} style={styles.requestItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
              {request.name}
            </Text>
            <Text style={styles.tripText} numberOfLines={1} ellipsizeMode="tail">
              {request.trip}
            </Text>
            <Text style={styles.datetimeText}>{request.datetime}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tripText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  datetimeText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 4,
  },
});
