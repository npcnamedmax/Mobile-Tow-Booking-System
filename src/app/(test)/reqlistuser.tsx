import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

export default function Index() {
    const requests = [
        { id: 'REQ001', status: 'Active', datetime: '2025-01-10 10:00 AM', trip: 'LDP → Soon Soon Workshop' },
        { id: 'REQ002', status: 'Completed', datetime: '2025-01-11 02:00 PM', trip: 'Puchong → Craig\'s PowerHouse' },
        { id: 'REQ003', status: 'Cancelled', datetime: '2025-01-12 05:00 PM', trip: 'Klang → Penang' },
      ];
      return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{title: 'All Requests'}} />
          {requests.map((request) => (
            <TouchableOpacity
              key={request.id}
              style={styles.requestItem}
              >
              <View style={{ flex: 1 }}>
                <Text style={styles.tripText} numberOfLines={1} ellipsizeMode="tail">{request.trip}</Text>
                <Text style={styles.datetimeText}>{request.datetime}</Text>
              </View>
              <Text style={[styles.requestStatus, 
                request.status === 'Active' ? styles.active : 
                request.status === 'Completed' ? styles.completed : styles.cancelled]}>
                {request.status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: '#f9f9f9',
        },
        containerDetails: {
          flex: 1,
          padding: 16,
          backgroundColor: '#f9f9f9',
          gap: 12,
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
        tripText: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        datetimeText: {
          fontSize: 12,
          color: 'grey',
          marginTop: 4,
        },
        requestStatus: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        active: {
          color: 'blue',
        },
        completed: {
          color: 'green',
        },
        cancelled: {
          color: 'red',
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
        },
        fieldLabel: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        fieldValue: {
          fontSize: 16,
          textAlign: 'right',
        },
      });
