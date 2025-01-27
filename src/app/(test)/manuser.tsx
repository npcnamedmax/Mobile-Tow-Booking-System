import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Stack } from "expo-router";
import Button from "@/components/general/Button";

const EditableField = ({ label, value, onEdit }) => (
  <View style={styles.editableFieldContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
    <IconButton
      icon="pencil"
      size={20}
      onPress={onEdit}
      style={styles.iconButton}
    />
  </View>
);

const UserProfileScreen = () => {
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
        policyNumber: "abcde12345",
      },
    ],
  });

  const handleEdit = (field, carIndex = null) => {
    console.log(
      `Edit ${field}${carIndex !== null ? ` (Car ${carIndex + 1})` : ""} clicked`
    );
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
          policyNumber: "",
        },
      ],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Modify User Details" }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>User Profile</Text>

        <Text style={styles.sectionHeader}>Personal Information</Text>
        <EditableField
          label="Name"
          value={userData.name}
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

        <Text style={styles.sectionHeader}>Car Details</Text>
        {userData.cars.map((car, index) => (
          <View key={index} style={styles.carContainer}>
            <Text style={styles.carHeader}>Car {index + 1}</Text>
            <EditableField
              label="VIN Number"
              value={car.vinNumber}
              onEdit={() => handleEdit("VIN Number", index)}
            />
            <EditableField
              label="Make & Model"
              value={car.makeModel}
              onEdit={() => handleEdit("Make & Model", index)}
            />
            <EditableField
              label="Year"
              value={car.year}
              onEdit={() => handleEdit("Year", index)}
            />
            <EditableField
              label="Plate Number"
              value={car.plateNumber}
              onEdit={() => handleEdit("Plate Number", index)}
            />
            <EditableField
              label="Color"
              value={car.color}
              onEdit={() => handleEdit("Color", index)}
            />
            <EditableField
              label="Policy Number"
              value={car.policyNumber}
              onEdit={() => handleEdit("Policy Number", index)}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addCarButton} onPress={addCar}>
          <Text style={styles.addCarButtonText}>+ Add Car</Text>
        </TouchableOpacity>

        <Button pressableStyle={{ backgroundColor: "#007BFF" }} textStyle={{ color: "white" }}>
          Save Changes
        </Button>
        <Button pressableStyle={{ backgroundColor: "red" }} textStyle={{ color: "white" }}>
          Delete User
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
  editableFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  fieldValue: {
    fontSize: 16,
    color: "#000",
  },
  iconButton: {
    margin: 0,
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
