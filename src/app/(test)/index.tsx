import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import EditableField from "@/components/EditableField";
import { Stack } from "expo-router";
import Button from "@/components/general/Button";

const UserProfileScreen = () => {
  // Initial user data
  const [userData, setUserData] = useState({
    name: "Someone",
    icNumber: "991212-01-1234",
    phoneNumber: "010-222-0098",
    email: "someone@e.com",
    password: "********",
    
    cars: [
      {
        vinNumber: "1HGCM82633A123456",
        makeModel: "Ferrari 458",
        year: "2010",
        plateNumber: "ABC123",
        color: "Blue",
        policyNumber: "abcde12345", // Added policy number field
      },
    ],
  });

  const handleEdit = (field, carIndex = null) => {
    console.log(`Edit ${field}${carIndex !== null ? ` (Car ${carIndex + 1})` : ""} clicked`);
    // Logic to edit the field (e.g., open a modal to update)
  };

  const addCar = () => {
    setUserData((prevData) => ({
      ...prevData,
      cars: [
        ...prevData.cars,
        {
          vinNumber: "",
          makeModel: "",
          year: "",
          plateNumber: "",
          color: "",
          policyNumber: "", // Added policy number field
        },
      ],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Driver details" }} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Driver Profile</Text>

        <Text style={styles.sectionHeader}>Personal Information</Text>
        <EditableField
          label="Name"
          value={'Charlie'}
          onEdit={() => handleEdit("Name")}
        />
        <EditableField
          label="IC Number"
          value={userData.icNumber}
          onEdit={() => handleEdit("IC Number")}
        />
        <EditableField
          label="Phone Number"
          value={userData.phoneNumber}
          onEdit={() => handleEdit("Phone Number")}
        />

      <Text style={styles.sectionHeader}>Towing company information</Text>
        <EditableField
          label="Company Name"
          value={'Tow Good Money Company'}
          onEdit={() => handleEdit("Name")}
        />
        <EditableField
          label="Plate Number"
          value={'BBB1'}
          onEdit={() => handleEdit("IC Number")}
        />
        
        <Button pressableStyle={{ backgroundColor: "#007BFF" }} textStyle={{ color: "white" }}>
          Approve
        </Button>
        <Button pressableStyle={{ backgroundColor: "red" }} textStyle={{ color: "white" }}>
          Reject
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
    gap: 10,
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
  carContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  carHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007BFF",
  },
  addCarButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
  addCarButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserProfileScreen;
