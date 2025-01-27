import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import anns from '@assets/data/anns';
import AnnItem from '@/components/general/AnnItem';
import { Stack, useRouter } from 'expo-router';

export default function Ann() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Announcements",
          headerRight: () => (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/create-announcement')} // Navigate to the create announcement page
            >
              <MaterialIcons name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.screen}>
        <FlatList
          data={anns}
          renderItem={({ item }) => <AnnItem value={item} />}
          keyExtractor={(item) => item.id} // Use `id` for internal tracking
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background for the screen
    padding: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
  iconButton: {
    marginRight: 10,
  },
});
