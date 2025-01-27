import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

export default function Index() {
  const request = [
    { id: 'REQ001', status: 'Active', datetime: '2025-01-10 10:00 AM', trip: 'LDP → Soon Soon Workshop' },
    { id: 'REQ002', status: 'Completed', datetime: '2025-01-11 02:00 PM', trip: 'Puchong → Craig\'s PowerHouse' },
    { id: 'REQ003', status: 'Cancelled', datetime: '2025-01-12 05:00 PM', trip: 'Klang → Penang' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Request Detail' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mapContainer}>
          <Image source={{ uri: 'https://fakeimg.pl/600x300?text=Customer+Car+Imgs' }} style={styles.mapImage} />
        </View>

        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Request ID:</Text>
          <Text style={styles.fieldValue}>{request[0].id}</Text>
        </View>
        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Datetime:</Text>
          <Text style={styles.fieldValue}>{request[0].datetime}</Text>
        </View>

        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Customer Policy Number:</Text>
          <Text style={styles.fieldValue}>PN123456789</Text>
        </View>
        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Customer Name:</Text>
          <Text style={styles.fieldValue}>Jack</Text>
        </View>
        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Customer Car Plate Number:</Text>
          <Text style={styles.fieldValue}>AAA1</Text>
        </View>
        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Car Color:</Text>
          <Text style={styles.fieldValue}>Blue</Text>
        </View>
        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Trip:</Text>
          <Text style={styles.fieldValue}>{request[0].trip}</Text>
        </View>
        <View style={styles.detailFieldContainer}>
          <Text style={styles.fieldLabel}>Distance:</Text>
          <Text style={styles.fieldValue}>25 km</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.btn} onPress={() => console.log('Contact driver pressed')}>
          Accept Request
        </Button>
      </View>
      </ScrollView>

      {/* Fixed Button Panel */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Add space for the fixed button panel
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  detailFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  fieldValue: {
    fontSize: 16,
    textAlign: 'right',
  },
  buttonContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'space-between',
   
    
    gap: 20,
  },
  btn: {
    backgroundColor: '#007BFF',
    flex: 1,
    padding: 4,
  },
  cabtn: {
    backgroundColor: 'red',
    flex: 1,
    padding: 4,
  },
});
