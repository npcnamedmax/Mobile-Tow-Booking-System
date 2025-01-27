import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

export default function Index() {
  const request = {
    id: 'REQ001',
    status: 'Active',
    datetime: '2025-01-10 10:00 AM',
    trip: 'LDP → Soon Soon Workshop',
    distance: '25 km',
    user: {
      name: 'Jack',
      policyNumber: 'PN123456789',
    },
    car: {
      plateNumber: 'AAA1',
      color: 'Blue',
      imageUrl: 'https://fakeimg.pl/150x100?text=Car+Images',
    },
    driver: {
      name: 'Bob',
      plateNumber: 'BBB2',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Request Detail' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Map Container */}
        <View style={styles.mapContainer}>
          <Image source={{ uri: 'https://fakeimg.pl/600x300?text=Location+map' }} style={styles.mapImage} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Request Details</Text>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Request ID:</Text>
            <Text style={styles.fieldValue}>{request.id}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Status:</Text>
            <Text style={styles.fieldValue}>Active</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Datetime:</Text>
            <Text style={styles.fieldValue}>{request.datetime}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Trip:</Text>
            <Text style={styles.fieldValue}>{request.trip}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Distance:</Text>
            <Text style={styles.fieldValue}>{request.distance}</Text>
          </View>
        </View>

        {/* User Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>User Details</Text>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Name:</Text>
            <Text style={styles.fieldValue}>{request.user.name}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Phone number:</Text>
            <Text style={styles.fieldValue}>999</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Policy Number:</Text>
            <Text style={styles.fieldValue}>{request.user.policyNumber}</Text>
          </View>
        </View>

        {/* Car Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Car Details</Text>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Vin Number:</Text>
            <Text style={styles.fieldValue}>123lmasde123</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Make and Model:</Text>
            <Text style={styles.fieldValue}>Proton Saga</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Car Year:</Text>
            <Text style={styles.fieldValue}>2020</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Car Color:</Text>
            <Text style={styles.fieldValue}>Blue</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Plate Number:</Text>
            <Text style={styles.fieldValue}>{request.car.plateNumber}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Color:</Text>
            <Text style={styles.fieldValue}>{request.car.color}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Car Image:</Text>
            <Image source={{ uri: request.car.imageUrl }} style={styles.carImage} />
          </View>
        </View>

        {/* Driver Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Driver Details</Text>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Name:</Text>
            <Text style={styles.fieldValue}>{request.driver.name}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Truck Plate Number:</Text>
            <Text style={styles.fieldValue}>{request.driver.plateNumber}</Text>
          </View>
          <View style={styles.detailFieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number:</Text>
            <Text style={styles.fieldValue}>010-112-0002</Text>
          </View>
        </View>

        {/* Trip Details Section */}
        

        
      </ScrollView>
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
    paddingBottom: 100,
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
  sectionContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 16,
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  fieldValue: {
    fontSize: 16,
    textAlign: 'right',
  },
  carImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  buttonContainer: {
    padding: 16,
    gap: 20,
  },
  btn: {
    backgroundColor: '#007BFF',
    flex: 1,
    padding: 4,
  },
});
