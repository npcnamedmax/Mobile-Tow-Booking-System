import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from 'react-native-paper';

export default function ManageUserAccount() {
  // Mock data for users
  const users = [
    { id: 'U001', name: 'Ali', email: 'ali@example.com', role: 'User' },
    { id: 'U002', name: 'Abu', email: 'abu@example.com', role: 'User' },
    { id: 'U003', name: 'Muthu', email: 'muthu@example.com', role: 'Driver' },
  ];

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDetails}>ID: {item.id}</Text>
        <Text style={styles.userDetails}>Email: {item.email}</Text>
        <Text style={styles.userDetails}>Role: {item.role}</Text>
      </View>
      <Button mode="contained" style={styles.actionButton} onPress={() => console.log(`Edit user ${item.id}`)}>
        Edit
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Manage User Accounts' }} />

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Search by ID or Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter user ID or name"
          onChangeText={(text) => console.log('Search:', text)}
        />
        <Button mode="contained" style={styles.searchButton} onPress={() => console.log('Search button pressed')}>
          Search
        </Button>
      </View>

      {/* User List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No users found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
  },
  listContainer: {
    paddingBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  actionButton: {
    backgroundColor: '#007BFF',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});
