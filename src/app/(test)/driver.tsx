import React from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import EditableField from "@/components/EditableField";
import { Stack } from "expo-router";

const DriverProfileScreen = () => {
  // Mock driver data
  const driverData = {
    name: "Jack",
    icNumber: "001201-01-1234",
    phoneNumber: "999",
    email: "driverJack@example.com",
    password: "********",
    towDetails: {
      plateNumber: "WA1234",
      companyName: "Best Tow Services",
    },
  };

  const handleEdit = (field) => {
    console.log(`Edit ${field} clicked`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Driver Profile" }} />
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Driver Profile</Text>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <EditableField label="Name" value={driverData.name} onEdit={() => handleEdit("Name")} />
        <EditableField label="IC Number" value={driverData.icNumber} onEdit={() => handleEdit("IC Number")} />
        <EditableField label="Phone Number" value={driverData.phoneNumber} onEdit={() => handleEdit("Phone Number")} />
        <EditableField label="Email" value={driverData.email} onEdit={() => handleEdit("Email")} />
        <EditableField label="Password" value={driverData.password} onEdit={() => handleEdit("Password")} />

        <Text style={styles.sectionHeader}>Tow Truck Details</Text>
        <EditableField
          label="Tow Truck Plate Number"
          value={driverData.towDetails.plateNumber}
          onEdit={() => handleEdit("Tow Truck Plate Number")}
        />
        <EditableField
          label="Tow Company Name"
          value={driverData.towDetails.companyName}
          onEdit={() => handleEdit("Tow Company Name")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContentContainer: {
    padding: 20, // Ensure padding for spacing
    paddingBottom: 50, // Space for any blocking elements
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#444",
  },
});

export default DriverProfileScreen;
